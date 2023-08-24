import React, { useEffect } from "react";
import Web3 from "web3";
import { EtherPortal__factory } from "@cartesi/rollups/";
import GetBalance from "../GetBalanceWallet/GetBlanceWallet";

const LOCALHOST_DAPP_ADDRESS = "0x142105FC8dA71191b3a13C738Ba0cF4BC33325e2";
const LOCALHOST_ETHER_PORTAL_ADDRESS = "0xA89A3216F46F66486C9B794C1e28d3c44D59591e";

async function AddBalanceWallet(balance) {
    try {
        const localStorareUser = localStorage.getItem('user_id');
        let web3 = new Web3(window.ethereum)
        balance = balance ? balance?.toString() : '0';
        const ethersContract = new web3.eth.Contract(EtherPortal__factory.abi, LOCALHOST_ETHER_PORTAL_ADDRESS);
        const oneEthereumInWei = web3.utils.toWei(balance, 'ether');
        await ethersContract.methods.depositEther(LOCALHOST_DAPP_ADDRESS, '0x').send({ from: localStorareUser, value: oneEthereumInWei.toString() });
        const getBalance = localStorage.getItem('balance') ? parseFloat(localStorage.getItem('balance')) + parseFloat(balance) : parseFloat(balance);
        localStorage.setItem('balance', getBalance?.toString());
    } catch (error) {
        console.error("Error occurred while sending input:", error);
    }


    return null;
}

export default AddBalanceWallet;

