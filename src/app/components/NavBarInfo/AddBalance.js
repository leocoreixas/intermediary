import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";

const AddBalanceDialog = ({
  open,
  handleClose,
  handleAddBalance,
  handleConfirmClose,
  handleAddConfirmed,
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
      <DialogTitle>Add Balance</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the amount in Ethereum to add to your balance:
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
        <Button onClick={handleAddConfirmed} style={{ color: "#59a14e" }}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBalanceDialog;
