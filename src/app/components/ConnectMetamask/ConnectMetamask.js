import React, { useState } from "react";
import Web3 from "web3";
import Image from 'next/image';
import metaImg from '../../assets/full-metamask-logo.png';

const Connect = ({sendData}) => {
    const [connected, setConnected] = useState(false);
    
    const  connectToMetaMask = async () => {
      if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        let balance = await window.ethereum.request({ method: 'eth_getBalance', params: [accounts[0]] })
        let balanceDecimal = parseInt(balance, 16) / 10 ** 18;
        localStorage.setItem('balance', balanceDecimal);


        debugger
        window.ethereum.enable().then(() => {
          setConnected(true);
          if (accounts && accounts.length > 0){
            sendData(accounts[0]);
          }
        }).catch((err) => {
          console.error(err);
        });
      } else {
        console.error('MetaMask not found');
      }
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