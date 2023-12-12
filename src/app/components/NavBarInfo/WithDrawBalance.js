import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Vouchers } from "../Cartesi/graphql/vouchers";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
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
      style={{ textAlign: "center" }}
      maxWidth="xl"
    >
      <DialogTitle>Vouchers</DialogTitle>
      <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      <DialogContent>
      </DialogContent>
      <DialogActions>
          <Vouchers dappAddress={dappAddress} />
      </DialogActions>
    </Dialog>
  );
};

export default WithdrawDialog;
