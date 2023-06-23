import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AcceptOfferForm from '../AcceptOfferForm/AcceptOfferForm';
import ReofferForm from '../ReofferForm/ReofferForm';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Grid, DialogTitle, DialogContentText, Tab, Tabs } from '@mui/material';

export default function ActionsCell({ row }) {
    const [open, setOpen] = React.useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmReOfferOpen, setReOfferConfirmOpen] = useState(false);
    const [new_value, setNewValue] = useState(0);
    const [accountIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [valueTab, setValueTab] = useState(0);

    const handleLoadingClose = () => {
        setLoading(false);
    }
    const created_at = row.created_at;
    const description = row.description;
    const ended = row.ended;
    const ended_at = row.ended_at;
    const images = row.image;
    const name = row.name;
    const offer_value = row.offer_value || row.value;
    const proposer_id = row.proposer_id;
    const status = row.status;
    const updated_at = row.updated_at;
    const user_id = row.user_id;
    const country = row.country;
    const city = row.city;
    const street = row.street;
    const zipcode = row.zipcode;
    const state = row.state;
    const complement = row.complement;
    const number = row.number;
    const selectedType = row.selectedType;

    const handleChangeTab = (event, newValue) => {
        setValueTab(newValue);
    };

    const handleConfirmOpen = () => {
        setConfirmOpen(true);
    };

    const handleReOfferConfirmOpen = () => {
        setReOfferConfirmOpen(true);
    };

    const handleReOfferConfirmClose = () => {
        setReOfferConfirmOpen(false);
    };

    const handleConfirmClose = () => {
        setConfirmOpen(false);
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAcceptOffer = async (rows) => {
        setLoading(true);
        debugger
        await AcceptOfferForm(rows, accountIndex)
        handleLoadingClose();
        handleConfirmClose();
        handleClose();
    };

    const handleReoffer = async (rows) => {
        setLoading(true);
        await ReofferForm(rows, accountIndex, new_value)
        handleLoadingClose();
        handleConfirmClose();
        handleReOfferConfirmClose();
        handleClose();
    };

    const isButtonDisabled = () => {
        return false;
    };

    function formatCurrency(value) {
        if (!value || value === '$') {
            value = '0.00';
        }
        const numericValue = value.replace(/[^0-9.]/g, '');
        const numberValue = parseFloat(numericValue);

        const formattedValue = numberValue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        return formattedValue;
    }

    return (
        <div>
            <div className="select-menu-action">
                <Button variant="outlined" onClick={handleClickOpen}>
                    See more
                </Button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={valueTab} onChange={handleChangeTab} aria-label="basic tabs example">
                            <Tab label="User Details" />
                            <Tab label="Address Details" />
                        </Tabs>
                    </Box>
                    <Grid container spacing={2}>
                        {valueTab === 0 && (
                            <Grid item xs={12} md={8} sx={{ marginLeft: '16px', marginTop: '15px' }}>
                                <DialogContentText>
                                    <strong>Product name:</strong> {name}
                                </DialogContentText>
                                <DialogContentText>
                                    <strong>User ID:</strong> {user_id}
                                </DialogContentText>
                                <DialogContentText id="alert-dialog-description">
                                    <strong>Description:</strong> {description}
                                </DialogContentText>
                                <DialogContentText>
                                    <strong>Created At:</strong> {new Date(created_at).toLocaleString()}
                                </DialogContentText>
                                <DialogContentText>
                                    <strong>Ended:</strong> {ended ? "Yes" : "No"}
                                </DialogContentText>
                                <DialogContentText>
                                    <strong>Ended At:</strong> {ended_at ? new Date(ended_at).toLocaleString() : "Not ended yet"}
                                </DialogContentText>
                                {images && images.length > 0 && (
                                    <DialogContentText>
                                        <strong>Images:</strong>
                                        {images.map((image, index) => (
                                            <img key={index} src={image} alt={`Image ${index}`} />
                                        ))}
                                    </DialogContentText>
                                )}
                                <DialogContentText>
                                    <strong>Offer Value:</strong> {offer_value}
                                </DialogContentText>
                                <DialogContentText>
                                    <strong>Proposer ID:</strong> {proposer_id ? proposer_id : "Not proposed yet"}
                                </DialogContentText>
                                <DialogContentText>
                                    <strong>Status:</strong> {status}
                                </DialogContentText>
                                <DialogContentText>
                                    <strong>Type:</strong> {selectedType ? selectedType : "Not selected"}
                                </DialogContentText>
                                <DialogContentText>
                                    <strong>Updated At:</strong> {updated_at ? new Date(updated_at).toLocaleString() : "Not updated yet"}
                                </DialogContentText>
                            </Grid>
                        )}
                        {valueTab === 1 && (
                            <Grid item xs={12} md={8} sx={{ marginLeft: '16px', marginTop: '15px' }}>
                                <DialogContentText>
                                    <strong>Country:</strong> {country}
                                </DialogContentText>
                                <DialogContentText>
                                    <strong>City:</strong> {city}
                                </DialogContentText>
                                <DialogContentText>
                                    <strong>Street:</strong> {street}
                                </DialogContentText>
                                <DialogContentText>
                                    <strong>Zipcode:</strong> {zipcode}
                                </DialogContentText>
                                <DialogContentText>
                                    <strong>State:</strong> {state}
                                </DialogContentText>
                                <DialogContentText>
                                    <strong>Complement:</strong> {complement}
                                </DialogContentText>
                                <DialogContentText>
                                    <strong>Number:</strong> {number}
                                </DialogContentText>
                            </Grid>
                        )}
                    </Grid>
                </Box>
                {status === "pending" ?
                    <DialogActions>
                        <Button onClick={handleClose} color='error'>Cancel</Button>
                        <Button onClick={handleReOfferConfirmOpen} color="secondary">
                            Reoffer
                        </Button>
                        <Button onClick={handleConfirmOpen} color="success" autoFocus disabled={isButtonDisabled()}>
                            Accept Offer
                        </Button>
                    </DialogActions> : status === 'reoffered' ?
                        <DialogActions>
                            <Button onClick={handleClose} color='error'>Cancel</Button>
                            <Button onClick={handleConfirmOpen} color="success" autoFocus disabled={isButtonDisabled()}>
                                Accept Offer
                            </Button>
                        </DialogActions> :
                        <DialogActions>
                            <Button onClick={handleClose} color='error'>Close</Button>
                        </DialogActions>

                }
            </Dialog>

            <Dialog
                open={confirmOpen}
                onClose={handleConfirmClose}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
            >
                <DialogTitle id="confirm-dialog-title">Confirm Offer Acceptance</DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-dialog-description">
                        Are you sure you want to accept this offer?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose} color="error" disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleAcceptOffer(row)} color="success" disabled={loading}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Accept Offer'}
                    </Button>
                    <Snackbar open={loading} autoHideDuration={4000} onClose={handleLoadingClose}>
                        <MuiAlert onClose={handleLoadingClose} severity="success" sx={{ width: '100%' }}>
                            Offer accepted successfully!
                        </MuiAlert>
                    </Snackbar>
                </DialogActions>
            </Dialog>

            <Dialog
                open={confirmReOfferOpen}
                onClose={handleReOfferConfirmClose}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
            >
                <DialogTitle id="confirm-dialog-title">Create a new ReOffer</DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-dialog-description">
                        Please add the new offer value:
                    </DialogContentText>
                    <input
                        type="text"
                        value={new_value}
                        className="value-input-form"
                        onChange={(e) => setNewValue(formatCurrency(e.target.value))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleReOfferConfirmClose} color="error" disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleReoffer(row)} color="success" disabled={loading}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Create new offer'}
                    </Button>
                    <Snackbar open={loading} autoHideDuration={4000} onClose={handleLoadingClose}>
                        <MuiAlert onClose={handleLoadingClose} severity="success" sx={{ width: '100%' }}>
                            ReOffer created successfully!
                        </MuiAlert>
                    </Snackbar>
                </DialogActions>
            </Dialog>
        </div>
    );
}