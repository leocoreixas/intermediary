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
                    case '0xa9059cbb': {
                        // erc20 transfer; 
                        const decode = decoder.decode(["address", "uint256"], payload);
                        payload = `Erc20 Transfer - Amount: ${ethers.utils.formatEther(decode[1])} - Address: ${decode[0]}`;
                        break;
                    }
                    case '0x42842e0e': {
                        //erc721 safe transfer;
                        const decode = decoder.decode(["address", "address", "uint256"], payload);
                        payload = `Erc721 Transfer - Id: ${decode[2]} - Address: ${decode[1]}`;
                        break;
                    }
                    case '0x522f6815': {
                        //ether transfer; 
                        const decode2 = decoder.decode(["address", "uint256"], payload)
                        payload = `Ether Transfer - Amount: ${ethers.utils.formatEther(decode2[1])} (Native eth) - Address: ${decode2[0]}`;
                        break;
                    }
                    case '0xd0def521': {
                        //erc721 mint;
                        const decode = decoder.decode(["address", "string"], payload);
                        payload = `Mint Erc721 - String: ${decode[1]} - Address: ${decode[0]}`;
                        break;
                    }
                    case '0x755edd17': {
                        //erc721 mintTo;
                        const decode = decoder.decode(["address"], payload);
                        payload = `Mint Erc721 - Address: ${decode[0]}`;
                        break;
                    }
                    case '0x6a627842': {
                        //erc721 mint;
                        const decode = decoder.decode(["address"], payload);
                        payload = `Mint Erc721 - Address: ${decode[0]}`;
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
            payload: `${payload}`,
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
        <div>
            {/* Your existing JSX */}
            <Button onClick={handleOpenModal} style={{ color: "#59a14e" }}>Withdraw</Button>
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Voucher List</DialogTitle>
                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Index</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {vouchers.length === 0 && (
                                <TableRow>
                                <TableCell colSpan={2}>
                                  <Grid container alignItems="center" justifyContent="center">
                                    {loading ? <CircularProgress /> : 'No vouchers found'}
                                  </Grid>
                                </TableCell>
                                <TableCell>
                                  <Grid container alignItems="center" justifyContent="center">
                                    <Button disabled={loading} onClick={() => handleReload()}>
                                    {loading ? 'Loading...' : 'Reload'}
                                    </Button>
                                  </Grid>
                                </TableCell>
                              </TableRow>
                            )}
                            {vouchers.length > 0 && (
                                vouchers.map((voucher) => (
                                    <TableRow key={voucher.id}>
                                        <TableCell>{voucher.id}</TableCell>
                                        <TableCell>{voucher.index}</TableCell>
                                        <TableCell>
                                            <Button style={{ color: "#fdad00" }} disabled={vouchers.length === 0} onClick={() => executeVoucher(vouchers[0])}>Withdraw</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}

                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

