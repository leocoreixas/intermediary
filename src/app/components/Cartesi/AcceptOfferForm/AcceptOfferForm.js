import React, { useEffect } from "react";
import './AcceptOfferForm.css'
import Web3 from "web3";
import inputFacet from '../../../contracts/inputFacet.json'

const LOCALHOST_DAPP_ADDRESS = "0xF8C694fd58360De278d5fF2276B7130Bfdc0192A";

async function AcceptOfferForm(rows, accountIndex) {
    try {
        const localStorareUser = localStorage.getItem('user_id');
        let web3 = new Web3(window.ethereum)
        const inputContract = new web3.eth.Contract(inputFacet.abi, LOCALHOST_DAPP_ADDRESS);

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
            selectedType: rows.selectedType
        };
        const inputString = JSON.stringify(input);
        const inputHex = web3.utils.utf8ToHex(inputString);
        const txReceipt = await inputContract.methods.addInput(inputHex).send({ from: localStorareUser })
        console.log(txReceipt)
    } catch (error) {
        console.error("Error occurred while sending input:", error);
        // You can handle the error here
    }


    return null;
}

export default AcceptOfferForm;
