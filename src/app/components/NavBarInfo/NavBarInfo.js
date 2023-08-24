import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import './NavbarInfo.css';
import AddBalanceWallet from "../Cartesi/AddBalanceWallet/AddBalanceWallet";
import GetBalance from "../Cartesi/GetBalanceWallet/GetBlanceWallet";
import CircularProgress from "@mui/material/CircularProgress";

const NavBarInfo = ({ money }) => {
    const [balance, setBalance] = useState(() => localStorage.getItem('balance') || 0);
    const [user, setUser] = useState(() => localStorage.getItem('user_id'));
    const [open, setOpen] = useState(false); // State to control the main modal
    const [confirmOpen, setConfirmOpen] = useState(false); // State to control the confirmation modal
    const [isAddingBalance, setIsAddingBalance] = useState(false); // State for controlling the spinner

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmOpen = () => {
        setConfirmOpen(true);
    };

    const handleConfirmClose = () => {
        setConfirmOpen(false);
    };

    const handleAddBalance = async () => {
        const newBalance = parseFloat(newBalanceInput);
        if (!isNaN(newBalance)) {
            handleConfirmOpen();
        } else {
            alert("Please enter a valid number.");
        }
    };

    const handleAddConfirmed = async () => {
        try {
            setIsAddingBalance(true);
            debugger
            await AddBalanceWallet(newBalanceInput);
            setIsAddingBalance(false);
            handleClose();
            handleConfirmClose();
            await getBalanceAndUpdate();
        } catch (error) {
            setIsAddingBalance(false);
            alert("An error occurred while adding balance.");
        }
    };


    const getBalanceAndUpdate = async () => {
        const balance = await GetBalance(user);
        setBalance(balance);
        localStorage.setItem('balance', balance?.toString());
    };

    useEffect(() => {
        getBalanceAndUpdate();
    }, [balance]);

    const [newBalanceInput, setNewBalanceInput] = useState(""); // State for the input value

    return (
        <div className="navbar-info-container">
            <nav className="navbar-info">
                <h1 className="navbar-info-logo">
                    <span className="navbar-logo-text">Balance: {balance} Ethereum</span>
                    <Button
                        variant="contained"
                        onClick={handleOpen}
                        disabled={isAddingBalance} 
                        sx={{
                            backgroundColor: "#fdad00",
                            "&:hover": {
                                backgroundColor: "#ffecb3",
                            },
                        }}
                    >
                        {isAddingBalance ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            "Add Balance"
                        )}
                    </Button>
                </h1>
            </nav>
            <Dialog open={open}
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
                        onChange={(e) => setNewBalanceInput(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} style={{ color: "#840000" }}>
                        Cancel
                    </Button>
                    <Button onClick={handleAddBalance} style={{ color: "#59a14e" }}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={confirmOpen}
                onClose={handleConfirmClose}
                disableBackdropClick={isAddingBalance} // Disable backdrop click while confirming
                disableEscapeKeyDown={isAddingBalance} // Disable escape key while confirming

            >
                <DialogTitle>Confirm</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to add {newBalanceInput} to your balance?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose} style={{ color: "#840000" }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAddConfirmed}
                        style={{ color: "#59a14e" }}
                        disabled={isAddingBalance} 
                    >
                        {isAddingBalance ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            "Confirm"
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

};

export default NavBarInfo;
