import React, { useEffect } from "react";
import Web3 from "web3";
import { IInputBox__factory } from "@cartesi/rollups/";
import GetBalance from "../GetBalanceWallet/GetBlanceWallet";
import FunctionsAdvanceEnum from "../../../utils/enums/FunctionsAdvanceEnum";
import * as dotenv from "dotenv";
dotenv.config();
const LOCALHOST_DAPP_ADDRESS = process.env.LOCALHOST_DAPP_ADDRESS;
const LOCALHOST_INPUTBOX_ADDRESS = process.env.LOCALHOST_INPUTBOX_ADDRESS;

async function GenerateWithDrawWallet(balance) {
    try {
        const localStorareUser = localStorage.getItem('user_id');
        let web3 = new Web3(window.ethereum)
        balance = balance ? balance?.toString() : '0';
        const inputContract = new web3.eth.Contract(IInputBox__factory.abi, LOCALHOST_INPUTBOX_ADDRESS);
        const ethereumInWei = web3.utils.toWei(balance, 'ether');
        const input = {
            function_id: FunctionsAdvanceEnum.GENERATE_WITHDRAWAL,
            balance: ethereumInWei,
            address: LOCALHOST_DAPP_ADDRESS,
            user_id: localStorareUser
        }
        const inputString = JSON.stringify(input);
        const inputHex = web3.utils.utf8ToHex(inputString);
        try {
            await inputContract.methods.addInput(LOCALHOST_DAPP_ADDRESS, inputHex).send({ from: localStorareUser });
        } catch (error) {
            console.log(error);
        }
        const getBalance = await GetBalance(localStorareUser);
        localStorage.setItem('balance', getBalance?.toString());
        const voucher = localStorage.getItem('voucher') ? parseFloat(localStorage.getItem('voucher')) + parseFloat(balance) : parseFloat(balance);
        localStorage.setItem('voucher', voucher?.toString());
    } catch (error) {
        console.error("Error occurred while sending input:", error);
    }


    return null;
}

export default GenerateWithDrawWallet;

