import React, { useEffect } from "react";
import './ReOfferForm.css'
import Web3 from "web3";
import { IInputBox__factory } from "@cartesi/rollups/";
import * as dotenv from "dotenv";
dotenv.config();
const LOCALHOST_DAPP_ADDRESS = process.env.LOCALHOST_DAPP_ADDRESS;
const LOCALHOST_INPUTBOX_ADDRESS = process.env.LOCALHOST_INPUTBOX_ADDRESS;

async function ReofferForm(rows, accountIndex, new_value) {

    try {
        const localStorareUser = localStorage.getItem('user_id');
        let web3 = new Web3(window.ethereum);
        const inputContract = new web3.eth.Contract(IInputBox__factory.abi, LOCALHOST_INPUTBOX_ADDRESS);
        const input = {
            function_id: 3,
            needToNotice: false,
            name: rows.name,
            description: rows.description,
            image: rows.image,
            user_id: rows.user_id,
            original_offer_id: rows.id,
            proposer_id: localStorareUser,
            offer_value: new_value,
            status: 'reoffered',
            ended: false,
            created_at: new Date(),
            updated_at: null,
            ended_at: null,
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
        try {
            const txReceipt = await inputContract.methods.addInput(LOCALHOST_DAPP_ADDRESS, inputHex).send({ from: localStorareUser });
        } catch (error) {
            console.log(error);
        }
        resetForm();
        setActiveStep(0);
    } catch (error) {
        console.error("Error occurred while sending input:", error);
        // You can handle the error here
    }


    return null;
}

export default ReofferForm;
