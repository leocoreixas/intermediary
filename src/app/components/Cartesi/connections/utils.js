const fs = require("fs");

/**
 * Read address from json file
 * @param path Path of file with address in json file
 * @returns address or undefined if file does not exist
 */
const readAddressFromFile = (path) => {
    return readObjectFromFile(path)?.address;
};

/**
 * Read object from json file
 * @param path Path of file with object in json file
 * @returns object or undefined if file does not exist
 */
const readObjectFromFile = (path) => {
    if (path && fs.existsSync(path)) {
        return JSON.parse(fs.readFileSync(path, "utf8"));
    }
};

/**
 * Read contract from json file
 * @param path Path of file with Contract in json file
 * @returns The Contract or undefined if file does not exist
 */
const readContractFromFile = (path) => {
    return readObjectFromFile(path);
};

const readAllContractsFromDir = (...paths) => {
    const contracts = {};
    for (let i = 0; i < paths.length; i++) {
        let path = paths[i];
        if (path && fs.existsSync(path)) {
            const deployContents = fs.readdirSync(path, { withFileTypes: true });
            deployContents.forEach((deployEntry) => {
                if (deployEntry.isFile()) {
                    const filename = deployEntry.name;
                    if (filename.endsWith(".json") && filename !== "dapp.json") {
                        const contractName = filename.substring(0, filename.lastIndexOf("."));
                        contracts[contractName] = readContractFromFile(`${path}/${filename}`);
                    }
                }
            });
        }
    }
    return contracts;
};

module.exports = { readAddressFromFile, readObjectFromFile, readContractFromFile, readAllContractsFromDir };
