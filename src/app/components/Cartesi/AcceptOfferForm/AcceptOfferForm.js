import React, { useEffect } from "react";
import './AcceptOfferForm.css'
import Web3 from "web3";
import { IInputBox__factory } from "@cartesi/rollups/";

const LOCALHOST_DAPP_ADDRESS = "0x142105FC8dA71191b3a13C738Ba0cF4BC33325e2";
const LOCALHOST_INPUTBOX_ADDRESS = "0x5a723220579C0DCb8C9253E6b4c62e572E379945";

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