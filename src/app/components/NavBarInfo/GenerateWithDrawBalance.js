import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";

const GenerateWithdrawDialog = ({
  open,
  handleClose,
  handleWithdrawBalance,
  handleConfirmClose,
  newBalanceInput,
  isAddingBalance,
  onNewBalanceInputChange, 
}) => {
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onNewBalanceInputChange(newValue); 
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableBackdropClick={isAddingBalance}
      disableEscapeKeyDown={isAddingBalance}
    >
      <DialogTitle>Generate Balance to Withdraw </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the amount in Ethereum to discount from your balance:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="balance"
          label="Amount"
          type="number"
          value={newBalanceInput}
          onChange={handleInputChange} 
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: "#840000" }}>
          Cancel
        </Button>
        <Button onClick={handleWithdrawBalance} style={{ color: "#59a14e" }}>
          Generate withdraw
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenerateWithdrawDialog;
