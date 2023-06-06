import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AcceptOfferForm from '../AcceptOfferForm/AcceptOfferForm';


export default function ActionsCell({ row }) {
    const [open, setOpen] = React.useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [accountIndex] = useState(0);

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

    const handleConfirmOpen = () => {
        setConfirmOpen(true);
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

    const handleAcceptOffer = (rows) => {
        AcceptOfferForm(rows, accountIndex)

        handleConfirmClose();
        handleClose();
    };

    const isButtonDisabled = () => {
        return false; 
      };

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
                <DialogTitle id="alert-dialog-title">
                    {name}
                </DialogTitle>
                <DialogContent>
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
                        <strong>Updated At:</strong> {updated_at ? new Date(updated_at).toLocaleString() : "Not updated yet"}
                    </DialogContentText>

                </DialogContent>
                {status === "pending" ?
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
                    <Button onClick={handleConfirmClose} color="error">
                        Cancel
                    </Button>
                    <Button onClick={() => handleAcceptOffer(row)} color="success">
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}