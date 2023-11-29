import React, { useEffect } from "react";
import GetBalance from "../GetBalanceWallet/GetBlanceWallet";
import {Vouchers} from "../graphql/vouchers";
import connect from "../connections/connect";
import { rollups } from "../connections/rollups";


async function WithDrawWallet(balance, url, index, input, rpc, mnemonic, accountIndex, args) {
    try {
        const localStorareUser = localStorage.getItem('user_id');
        balance = balance ? balance?.toString() : '0';
        const dappAddress = process.env.NEXT_PUBLIC_LOCALHOST_DAPP_ADDRESS;
        const voucher = Vouchers({dappAddress})
        if (!voucher.proof) {
            return;
        }
        const { provider, signer } = connect(rpc, mnemonic, accountIndex);
        const network = await provider.getNetwork();
        const { outputContract } = await rollups(
            network.chainId,
            signer || provider,
            args
        );
        try {
            const tx = await outputContract.executeVoucher(
                voucher.destination,
                voucher.payload,
                voucher.proof
            );
            await tx.wait();
        } catch (e) {
            console.error(`error executing voucher: ${e.message}`);
        }
        const getBalance = await GetBalance(localStorareUser);
        localStorage.setItem('balance', getBalance?.toString());
        const voucherResult = localStorage.getItem('voucher') ? parseFloat(localStorage.getItem('voucher')) + parseFloat(balance) : parseFloat(balance);
        localStorage.setItem('voucher', voucherResult?.toString());
    } catch (error) {
        console.error("Error occurred while sending input:", error);
    }


    return null;
}

export default WithDrawWallet;

