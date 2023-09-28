import React, { useEffect } from "react";
import Web3 from "web3";
import { IInputBox__factory } from "@cartesi/rollups/";
import GetBalance from "../GetBalanceWallet/GetBlanceWallet";
import FunctionsAdvanceEnum from "../../../utils/enums/FunctionsAdvanceEnum";
const LOCALHOST_DAPP_ADDRESS = "0x142105FC8dA71191b3a13C738Ba0cF4BC33325e2";
const LOCALHOST_INPUTBOX_ADDRESS = "0x5a723220579C0DCb8C9253E6b4c62e572E379945";

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
            debugger
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

