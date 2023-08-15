import React, { useEffect } from "react";
import Web3 from "web3";
import { IInputBox__factory } from "@cartesi/rollups/";
import FunctionsEnum from "../../../utils/enums/FunctionsEnum"; 
const LOCALHOST_DAPP_ADDRESS = "0x142105FC8dA71191b3a13C738Ba0cF4BC33325e2";
const LOCALHOST_INPUTBOX_ADDRESS = "0x5a723220579C0DCb8C9253E6b4c62e572E379945";

async function AddBalanceWallet(balance) {
    try {
        const localStorareUser = localStorage.getItem('user_id');
        let web3 = new Web3(window.ethereum)
        const inputContract = new web3.eth.Contract(IInputBox__factory.abi, LOCALHOST_INPUTBOX_ADDRESS);
        const input = {
            function_id: FunctionsEnum.ADD_BALANCE,
            balance: balance
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

export default AddBalanceWallet;



function convertDollarToEthereum(amountInUSD) {
    const exchangeRate = 0.00054
    const amountInEthereum = amountInUSD * exchangeRate;
    return amountInEthereum;
  }