import React, { useState } from "react";
import Web3 from "web3";
import Image from 'next/image';
import metaImg from '../../assets/full-metamask-logo.png';
import GetBalance from "../Cartesi/GetBalanceWallet/GetBlanceWallet";

const Connect = ({ sendData }) => {
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState('0');

  const connectToMetaMask = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      let initialBalance = await getBalance(accounts[0]) || '0';
      setBalance(initialBalance?.toString());
      localStorage.setItem('balance', initialBalance?.toString());
      window.ethereum.enable().then(() => {
        setConnected(true);
        if (accounts && accounts.length > 0) {
          sendData(accounts[0]);
        }
      }).catch((err) => {
        console.error(err);
      });
    } else {
      console.error('MetaMask not found');
    }
  };

  const getBalance = async (account) => {
    const balance = await GetBalance(account);
    return balance;

  };
  return (
    <button className='meta-button' onClick={connectToMetaMask} disabled={connected}>
      <Image
        className='meta-icon'
        src={metaImg}
        alt="Connect to MetaMask"
        width={190}
        height={35}
      />
    </button>
  );
};

export default Connect;