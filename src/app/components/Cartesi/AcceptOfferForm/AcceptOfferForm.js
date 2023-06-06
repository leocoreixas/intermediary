import React, { useEffect } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { InputFacet__factory } from "@cartesi/rollups";
import './AcceptOfferForm.css'


const HARDHAT_DEFAULT_MNEMONIC =
    "test test test test test test test test test test test junk";
const HARDHAT_LOCALHOST_RPC_URL = "http://localhost:8545";
const LOCALHOST_DAPP_ADDRESS = "0xF8C694fd58360De278d5fF2276B7130Bfdc0192A";

async function AcceptOfferForm(rows, accountIndex) {
    try {
        const localStorareUser = localStorage.getItem('user_id');
        const provider = new JsonRpcProvider(HARDHAT_LOCALHOST_RPC_URL);
        const signer = ethers.Wallet.fromMnemonic(
            HARDHAT_DEFAULT_MNEMONIC,
            `m/44'/60'/0'/0/${accountIndex}`
        ).connect(provider);
        const inputContract = InputFacet__factory.connect(
            LOCALHOST_DAPP_ADDRESS,
            signer
        );
        debugger
        const input = {
            function_id: 2,
            id: rows.id,
            needToNotice: true,
            name: rows.name,
            description: rows.description,
            image: rows.image,
            user_id: rows.user_id,
            proposer_id: localStorareUser,
            offer_value: rows.offer_value,
            status: 'accepted',
            ended: true,
            created_at: rows.created_at,
            updated_at: new Date(),
            ended_at: new Date(),
        };
        const inputString = JSON.stringify(input);
        // Encode the input
        const inputBytes = ethers.utils.isBytesLike(inputString)
            ? inputString
            : ethers.utils.toUtf8Bytes(inputString);

        // Send the transaction
        const tx = await inputContract.addInput(inputBytes);
        console.log(`transaction: ${tx.hash}`);
        // You can handle the toast notification here or use a library like react-toastify

        const receipt = await tx.wait(1);

        // Search for the InputAdded event
        const event = receipt.events?.find((e) => e.event === "InputAdded");
    } catch (error) {
        console.error("Error occurred while sending input:", error);
        // You can handle the error here
    }


    return null;
}

export default AcceptOfferForm;
