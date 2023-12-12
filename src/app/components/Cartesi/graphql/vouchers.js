import { BigNumber, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useRollups } from "./useRollups";
import { gql } from "@apollo/client";
import { useVouchersQuery, useVoucherQuery } from "./generated/index";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Grid,
    CircularProgress
} from '@mui/material';
import Typography from '@mui/material/Typography';


export const Vouchers = (propos) => {
    const [voucherToFetch, setVoucherToFetch] = useState([0, 0]);
    const [openModal, setOpenModal] = useState(false);
    const [result, reexecuteQuery] = useVouchersQuery();
    const [loading, setLoading] = useState(false);
    const [voucherResult, reexecuteVoucherQuery] = useVoucherQuery({
        variables: { voucherIndex: voucherToFetch[0], inputIndex: voucherToFetch[1] }
    });
    debugger
    const [voucherToExecute, setVoucherToExecute] = useState();
    const { data, fetching, error } = result;
    const rollups = useRollups(propos.dappAddress);

    const getProof = async (voucher) => {
        setVoucherToFetch([voucher.index, voucher.input.index]);
        reexecuteVoucherQuery({ requestPolicy: 'network-only' });
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleReload = () => {
        setLoading(true);
        debugger
        setTimeout(() => {
            reexecuteQuery({ requestPolicy: 'network-only' });
            setLoading(false);
        }, 2000);

    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const executeVoucher = async (voucher) => {
        if (rollups && !!voucher.proof) {

            const newVoucherToExecute = { ...voucher };
            try {
                const tx = await rollups.dappContract.executeVoucher(voucher.destination, voucher.payload, voucher.proof);
                const receipt = await tx.wait();
                newVoucherToExecute.msg = `voucher executed! (tx="${tx.hash}")`;
                if (receipt.events) {
                    newVoucherToExecute.msg = `${newVoucherToExecute.msg} - resulting events: ${JSON.stringify(receipt.events)}`;
                    newVoucherToExecute.executed = await rollups.dappContract.wasVoucherExecuted(BigNumber.from(voucher.input.index), BigNumber.from(voucher.index));
                }
            } catch (e) {
                newVoucherToExecute.msg = `COULD NOT EXECUTE VOUCHER: ${JSON.stringify(e)}`;
                console.log(`COULD NOT EXECUTE VOUCHER: ${JSON.stringify(e)}`);
            }
            setVoucherToExecute(newVoucherToExecute);
        }
    }
    useEffect(() => {
        const setVoucher = async (voucher) => {
            if (rollups) {
                voucher.executed = await rollups.dappContract.wasVoucherExecuted(BigNumber.from(voucher.input.index), BigNumber.from(voucher.index));
            }
            setVoucherToExecute(voucher);
        }

        if (!voucherResult.fetching && voucherResult.data) {
            setVoucher(voucherResult.data.voucher);
        }
    }, [voucherResult, rollups]);
    debugger
    const vouchers = data?.vouchers?.edges.map((node) => {
        const n = node.node;
        let payload = n?.payload;
        let inputPayload = n?.input.payload;
        if (inputPayload) {
            try {
                inputPayload = ethers.utils.toUtf8String(inputPayload);
            } catch (e) {
                inputPayload = inputPayload + " (hex)";
            }
        } else {
            inputPayload = "(empty)";
        }
        if (payload) {
            const decoder = new ethers.utils.AbiCoder();
            const selector = decoder.decode(["bytes4"], payload)[0];
            payload = ethers.utils.hexDataSlice(payload, 4);
            try {
                switch (selector) {
                    case '0x522f6815': {
                        //ether transfer; 
                        const decode2 = decoder.decode(["address", "uint256"], payload)
                        payload = {amount: ethers.utils.formatEther(decode2[1]), address: decode2[0]};
                        break;
                    }
                    default: {
                        break;
                    }
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            payload = "(empty)";
        }
        return {
            id: `${n?.id}`,
            index: parseInt(n?.index),
            destination: `${n?.destination ?? ""}`,
            amount: `${payload?.amount ?? ""}`,
            address: `${payload?.address ?? ""}`,
            input: n ? { index: n.input.index, payload: inputPayload } : {},
            proof: null,
            executed: null,
        };
    }).sort((b, a) => {
        if (a.input.index === b.input.index) {
            return b.index - a.index;
        } else {
            return b.input.index - a.input.index;
        }
    }) ?? [];

    return (
        <div style={{ width: "fit-content"}}>
          <Typography variant="h6" gutterBottom>
            Voucher to execute
          </Typography>
      
          {voucherToExecute ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Input Index</TableCell>
                  <TableCell>Voucher Index</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Input Payload</TableCell>
                  <TableCell>Msg</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={`${voucherToExecute.input.index}-${voucherToExecute.index}`}>
                  <TableCell>{voucherToExecute.input.index}</TableCell>
                  <TableCell>{voucherToExecute.index}</TableCell>
                  <TableCell>{voucherToExecute.destination}</TableCell>
                  <TableCell>
                    <Button disabled={!voucherToExecute.proof || voucherToExecute.executed} onClick={() => executeVoucher(voucherToExecute)}>
                      {voucherToExecute.proof ? (voucherToExecute.executed ? "Voucher executed" : "Execute voucher") : "No proof yet"}
                    </Button>
                  </TableCell>
                  <TableCell>{voucherToExecute.input.payload}</TableCell>
                  <TableCell>{voucherToExecute.msg}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <Typography>Nothing yet</Typography>
          )}
      
          <Button onClick={() => reexecuteQuery({ requestPolicy: 'network-only' })}>
            Reload
          </Button>
      
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Input Index</TableCell>
                <TableCell>Voucher Index</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Amount (ETH)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vouchers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>no vouchers</TableCell>
                </TableRow>
              ) : (
                vouchers.map((n) => (
                  <TableRow key={`${n.input.index}-${n.index}`}>
                    <TableCell>{n.input.index}</TableCell>
                    <TableCell>{n.index}</TableCell>
                    <TableCell>{n.destination}</TableCell>
                    <TableCell>
                      <Button onClick={() => getProof(n)}>Get Proof</Button>
                    </TableCell>
                    <TableCell>{n.address}</TableCell>
                    <TableCell>{n.amount}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      );
};

