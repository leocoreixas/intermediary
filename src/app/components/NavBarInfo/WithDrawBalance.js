import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Vouchers } from "../Cartesi/graphql/vouchers";

const WithdrawDialog = ({
  open,
  handleClose,
  handleWithdrawBalance,
  handleConfirmClose,
  newBalanceInput,
  isAddingBalance,
  onNewBalanceInputChange, 
  openVoucherList
}) => {
  const dappAddress = process.env.NEXT_PUBLIC_LOCALHOST_DAPP_ADDRESS;

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onNewBalanceInputChange(newValue); 
  };

  return (
    <Dialog
      open={open}
      disableBackdropClick={isAddingBalance}
      onClose={handleClose}
      disableEscapeKeyDown={isAddingBalance}
    >
      <DialogTitle>Withdraw </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to withdraw?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: "#840000" }}>
          Cancel
        </Button>
          <Vouchers dappAddress={dappAddress} />
      </DialogActions>
    </Dialog>
  );
};

export default WithdrawDialog;
