import React, { useEffect } from "react";
import Web3 from "web3";
import { createClient, defaultExchanges } from "@urql/core";
import fetch from "cross-fetch";

async function getVoucher(
    url,
    voucherIndex,
    inputIndex
){
    const client = createClient({ url, exchanges: defaultExchanges, fetch });

    const { data, error } = await client
        .query(VoucherDocument, { voucherIndex, inputIndex })
        .toPromise();

    if (data?.voucher) {
        return data.voucher;
    } else {
        throw new Error(error?.message);
    }
};

export default getVoucher;

