import React, { useEffect } from "react";
import Web3 from "web3";
import { EtherPortal__factory } from "@cartesi/rollups/";
import GetBalance from "../GetBalanceWallet/GetBlanceWallet";
import dotenv from "dotenv";
dotenv.config();

const NEXT_PUBLIC_LOCALHOST_DAPP_ADDRESS = process.env.NEXT_PUBLIC_LOCALHOST_DAPP_ADDRESS;
const NEXT_PUBLIC_LOCALHOST_ETHER_PORTAL_ADDRESS = process.env.NEXT_PUBLIC_LOCALHOST_ETHER_PORTAL_ADDRESS;

async function AddBalanceWallet(balance) {
    try {
        const localStorareUser = localStorage.getItem('user_id');
        let web3 = new Web3(window.ethereum)
        balance = balance ? balance?.toString() : '0';
        const ethersContract = new web3.eth.Contract(EtherPortal__factory.abi, NEXT_PUBLIC_LOCALHOST_ETHER_PORTAL_ADDRESS);
        const oneEthereumInWei = web3.utils.toWei(balance, 'ether');
        await ethersContract.methods.depositEther(NEXT_PUBLIC_LOCALHOST_DAPP_ADDRESS, '0x').send({ from: localStorareUser, value: oneEthereumInWei.toString() });
        const queryBalance = await GetBalance(localStorareUser);
        const getBalance = localStorage.getItem('balance') ? parseFloat(localStorage.getItem('balance')) + parseFloat(queryBalance) : parseFloat(queryBalance);
        localStorage.setItem('balance', getBalance?.toString());
    } catch (error) {
        console.error("Error occurred while sending input:", error);
    }


    return null;
}

export default AddBalanceWallet;

