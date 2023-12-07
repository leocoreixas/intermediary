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
import GenerateWithdrawBalanceWallet from "../Cartesi/GenerateWithDrawBalance/GenerateWithDrawBalance";
import WithdrawBalanceWallet from "../Cartesi/WithDrawBalance/WithDrawBalance";
import GetBalance from "../Cartesi/GetBalanceWallet/GetBlanceWallet";
import CircularProgress from "@mui/material/CircularProgress";
import ToggleColorMode from "../DarkMode/DarkMode";
import AddBalanceDialog from "./AddBalance";
import GenerateWithdrawDialog from "./GenerateWithDrawBalance";
import WithdrawDialog from "./WithDrawBalance";
import { faCircleInfo, faPlus, faMoneyBillTransfer, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuItem, Tooltip } from "@mui/material";
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';


const client = new Client({
    url: process.env.NEXT_PUBLIC_URL_QUERY_GRAPHQL,
    exchanges: [cacheExchange, fetchExchange],
});


const NavBarInfo = ({ money }) => {
    const [balance, setBalance] = useState(() => localStorage.getItem('balance') || 0);
    const [voucher, setVoucher] = useState(() => localStorage.getItem('voucher') || 0);
    const [user, setUser] = useState(() => localStorage.getItem('user_id'));
    const [open, setOpen] = useState(false); // State to control the main modal
    const [confirmOpen, setConfirmOpen] = useState(false); // State to control the confirmation modal
    const [isAddingBalance, setIsAddingBalance] = useState(false); // State for controlling the spinner
    const [anchorEl, setAnchorEl] = useState(null);
    const [openGenerateWithDraw, setOpenGenerateWithDraw] = useState(false);
    const [confirmOpenGenerateWithDraw, setConfirmOpenGenerateWithDraw] = useState(false);
    const [openWithDraw, setOpenWithDraw] = useState(false);
    const [confirmOpenWithDraw, setConfirmOpenWithDraw] = useState(false);
    const [openVoucherList, setOpenVoucherList] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenGenerateWithdraw = () => {
        setOpenGenerateWithDraw(true);
    };

    const handleCloseGenerateWithdraw = () => {
        setOpenGenerateWithDraw(false);
    };

    const handleConfirmOpenGenerateWithdraw = () => {
        setConfirmOpenGenerateWithDraw(true);
    };

    const handleConfirmCloseGenerateWithdraw = () => {
        setConfirmOpenGenerateWithDraw(false);
    };

    const handleOpenWithdraw = () => {
        setOpenWithDraw(true);
    };

    const handleCloseWithdraw = () => {
        setOpenWithDraw(false);
    };

    const handleConfirmOpenWithdraw = () => {
        setConfirmOpenWithDraw(true);
    };

    const handleConfirmCloseWithdraw = () => {
        setConfirmOpenWithDraw(false);
    };

    const handleConfirmOpen = () => {
        setConfirmOpen(true);
    };

    const handleAnchorClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAnchorClose = () => {
        setAnchorEl(null);
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

    const handleGenerateWithdrawBalance = async () => {
        try {
            if (isNaN(newBalanceInput)) {
                alert("Please enter a valid number.");
                return;
            }
            setIsAddingBalance(true);
            if (Number(balance) < Number(newBalanceInput)) {
                alert("You don't have balance to generate voucher.");
                setIsAddingBalance(false);
                return;
            }
            await GenerateWithdrawBalanceWallet(newBalanceInput);
            setIsAddingBalance(false);
            handleCloseGenerateWithdraw();
            handleConfirmOpenGenerateWithdraw();
            await getBalanceAndUpdate();
        } catch (error) {
            setIsAddingBalance(false);
            alert("An error occurred while withdrawing balance.");
        }
    };

    const handleWithdrawBalance = async () => {
        try {
            setIsAddingBalance(true);
            //await WithdrawBalanceWallet(newBalanceInput);
            setOpenVoucherList(true);
            setIsAddingBalance(false);
            handleCloseWithdraw();
            handleConfirmOpenWithdraw();
            await getBalanceAndUpdate();
        } catch (error) {
            setIsAddingBalance(false);
            alert("An error occurred while withdrawing balance.");
        }
    };



    const getBalanceAndUpdate = async () => {
        const balance = await GetBalance(user) || 0;
        setBalance(balance);
        localStorage.setItem('balance', balance?.toString());
    };

    useEffect(() => {
        getBalanceAndUpdate();
    }, [balance]);

    useEffect(() => {
        const handleAccountsChanged = (accounts) => {
            if (accounts.length === 0) {
                setUser(null); // Set user to null when disconnected
                localStorage.removeItem('user_id');
                window.location.href = "/";
            }
        };
        window.ethereum.on("accountsChanged", handleAccountsChanged);
        return () => {
            window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        };
    }, []);

    const [newBalanceInput, setNewBalanceInput] = useState("");

    return (
        <Provider value={client}>
            <div className="navbar-info-container">
                <nav className="navbar-info">
                    <h1 className="navbar-info-logo">
                        <span className="navbar-logo-text">Balance: {balance} ETH</span>
                        <span className="navbar-logo-text">For withdraw: {voucher} ETH</span>
                        <Button
                            variant="contained"
                            onClick={handleAnchorClick}
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
                                "Actions"
                            )}
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleAnchorClose}
                        >
                            <MenuItem onClick={() => {
                                handleAnchorClose();
                                handleOpen();
                            }}>
                                <Tooltip title="Add money to the account" arrow>
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        style={{ marginRight: "8px", cursor: "pointer" }}
                                    />
                                </Tooltip>
                                Add Balance
                            </MenuItem>
                            <MenuItem onClick={() => {
                                handleAnchorClose();
                                handleOpenGenerateWithdraw();
                            }}>
                                <Tooltip title="Necessary to make the money available for withdrawal, do this action before the withdraw button below, if needed" arrow>
                                    <FontAwesomeIcon
                                        icon={faCircleInfo}
                                        style={{ marginRight: "8px", cursor: "pointer" }}
                                    />
                                </Tooltip>
                                Generate Balance to Withdraw
                            </MenuItem>
                            <MenuItem onClick={() => {
                                handleAnchorClose();
                                handleOpenWithdraw();
                            }}>
                                <Tooltip title="Withdraw money" arrow>
                                    <FontAwesomeIcon
                                        icon={faMoneyBillTransfer}
                                        style={{ marginRight: "8px", cursor: "pointer" }}
                                    />
                                </Tooltip>
                                Withdraw
                            </MenuItem>
                        </Menu>
                    </h1>
                </nav>
                <AddBalanceDialog
                    open={open}
                    handleClose={handleClose}
                    handleAddBalance={handleAddBalance}
                    handleConfirmClose={handleConfirmClose}
                    handleAddConfirmed={handleAddConfirmed}
                    newBalanceInput={newBalanceInput}
                    isAddingBalance={isAddingBalance}
                    onNewBalanceInputChange={setNewBalanceInput}
                />
                <GenerateWithdrawDialog
                    open={openGenerateWithDraw}
                    handleClose={handleCloseGenerateWithdraw}
                    handleWithdrawBalance={handleGenerateWithdrawBalance}
                    handleConfirmClose={handleConfirmCloseGenerateWithdraw}
                    newBalanceInput={newBalanceInput}
                    isAddingBalance={isAddingBalance}
                    onNewBalanceInputChange={setNewBalanceInput}
                />
                <WithdrawDialog
                    open={openWithDraw}
                    handleClose={handleCloseWithdraw}
                    handleWithdrawBalance={handleWithdrawBalance}
                    handleConfirmClose={handleConfirmCloseWithdraw}
                    newBalanceInput={newBalanceInput}
                    isAddingBalance={isAddingBalance}
                    onNewBalanceInputChange={setNewBalanceInput}
                    openVoucherList={openVoucherList}
                />
            </div>
        </Provider>
    );

};

export default NavBarInfo;
