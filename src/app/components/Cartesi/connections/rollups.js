// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

const fs = require("fs");
const { Provider } = require("@ethersproject/providers");
const { Signer } = require("ethers");
const {
    IInputBox,
    IInputBox__factory,
    ICartesiDApp,
    ICartesiDApp__factory,
    IERC20Portal,
    IERC20Portal__factory,
    IERC721Portal,
    IERC721Portal__factory,
} = require("@cartesi/rollups");
const { networks } = require("./networks");
const { readAddressFromFile, readAllContractsFromDir } = require("./utils");

const builder = (yargs) => {
    return yargs
        .option("dapp", {
            describe: "DApp name",
            type: "string",
            default: "dapp",
        })
        .option("address", {
            describe: "Rollups contract address",
            type: "string",
        })
        .option("addressFile", {
            describe: "File with rollups contract address",
            type: "string",
        })
        .option("deploymentFile", {
            describe: "JSON file with deployment of rollups contracts",
            type: "string",
        });
};

const readDApp = (dapp, chainId) => {
    const network = networks[chainId];
    if (network && dapp) {
        return readAddressFromFile(`../deployments/${network.name}/${dapp}.json`);
    }
};

const readDeployment = (chainId, args) => {
    if (args.deploymentFile) {
        const deployment = require(args.deploymentFile);
        if (!deployment) {
            throw new Error(`rollups deployment '${args.deploymentFile}' not found`);
        }
        return deployment;
    } else {
        const network = networks[chainId];
        if (!network) {
            throw new Error(`unsupported chain ${chainId}`);
        }

        if (network.name === "localhost") {
            const contracts = readAllContractsFromDir(
                "../deployments/localhost",
                "../common-contracts/deployments/localhost"
            );

            const deployment = { chainId: chainId.toString(), name: "localhost", contracts };
            return deployment;
        }

        const deployment = require(`@cartesi/rollups/export/abi/${network.name}.json`);
        if (!deployment) {
            throw new Error(`rollups not deployed to network ${network.name}`);
        }
        return deployment;
    }
};

const rollups = async (chainId, provider, args) => {
    const address =
        args.address ||
        readAddressFromFile(args.addressFile) ||
        readDApp(args.dapp, chainId);

    if (!address) {
        throw new Error("unable to resolve DApp address");
    }

    const deployment = readDeployment(chainId, args);
    const InputBox = deployment.contracts["InputBox"];
    const ERC20Portal = deployment.contracts["ERC20Portal"];
    const ERC721Portal = deployment.contracts["ERC721Portal"];

    // connect to contracts
    const inputContract = IInputBox__factory.connect(InputBox.address, provider);
    const outputContract = ICartesiDApp__factory.connect(address, provider);
    const erc20Portal = IERC20Portal__factory.connect(ERC20Portal.address, provider);
    const erc721Portal = IERC721Portal__factory.connect(ERC721Portal.address, provider);

    return {
        dapp: address,
        inputContract,
        outputContract,
        erc20Portal,
        erc721Portal,
        deployment,
    };
};

module.exports = { builder, rollups };
