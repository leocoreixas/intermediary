import React, { useEffect } from "react";
import './AcceptOfferForm.css'
import Web3 from "web3";
import { IInputBox__factory } from "@cartesi/rollups/";
import * as dotenv from "dotenv";
dotenv.config();
const LOCALHOST_DAPP_ADDRESS = process.env.LOCALHOST_DAPP_ADDRESS;
const LOCALHOST_INPUTBOX_ADDRESS = process.env.LOCALHOST_INPUTBOX_ADDRESS;

async function AcceptOfferForm(rows, accountIndex) {
    try {
        const localStorareUser = localStorage.getItem('user_id');
        let web3 = new Web3(window.ethereum)
        const inputContract = new web3.eth.Contract(IInputBox__factory.abi, LOCALHOST_INPUTBOX_ADDRESS);
        const input = {
            function_id: 2,
            id: rows.id,
            needToNotice: true,
            name: rows.name,
            description: rows.description,
            image: rows.image,
            user_id: rows.user_id,
            original_offer_id: rows.original_offer_id,
            proposer_id: localStorareUser,
            offer_value: rows.offer_value,
            status: 'accepted',
            ended: true,
            created_at: rows.created_at,
            updated_at: new Date(),
            ended_at: new Date(),
            country: rows.country,
            state: rows.state,
            city: rows.city,
            street: rows.street,
            zipcode: rows.zipcode,
            number: rows.number,
            complement: rows.complement,
            selectedType: rows.selectedType,
            productType: rows.productType,
        };
        const inputString = JSON.stringify(input);
        const inputHex = web3.utils.utf8ToHex(inputString);
        const txReceipt = await inputContract.methods.addInput(LOCALHOST_DAPP_ADDRESS, inputHex).send({ from: localStorareUser });
        const convertedAmount = convertDollarToEthereum(Number(rows.offer_value));
        this.state.web3.eth.sendTransaction({to: contractAddress, from: this.state.accounts[0], value: convertedAmount});
    } catch (error) {
        console.error("Error occurred while sending input:", error);
        // You can handle the error here
    }


    return null;
}

export default AcceptOfferForm;



function convertDollarToEthereum(amountInUSD) {
    const exchangeRate = 0.00054
    const amountInEthereum = amountInUSD * exchangeRate;
    return amountInEthereum;
  }