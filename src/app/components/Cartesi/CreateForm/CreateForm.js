import React, { useState } from "react";
import { Box, Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const steps = ['Basic Information', 'Address Details'];
import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { InputFacet__factory } from "@cartesi/rollups";
import './CreateForm.css'
import CountrySelector from "../../CountrySelector/CountrySelector";

const HARDHAT_DEFAULT_MNEMONIC =
    "test test test test test test test test test test test junk";
const HARDHAT_LOCALHOST_RPC_URL = "http://localhost:8545";
const LOCALHOST_DAPP_ADDRESS = "0xF8C694fd58360De278d5fF2276B7130Bfdc0192A";

function CreateForm() {
    const [accountIndex] = useState(0);
    const localStorareUser = localStorage.getItem('user_id');
    const [activeStep, setActiveStep] = useState(0);
    const [value, setValue] = useState(null);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [image, setImages] = useState([]);
    const [country, setCountry] = useState(null);
    const [state, setState] = useState(null);
    const [city, setCity] = useState(null);
    const [street, setStreet] = useState(null);
    const [zipcode, setZipcode] = useState(null);
    const [complement, setComplement] = useState(null);
    const [number, setNumber] = useState(null);
    const [selectedType, setSelectedOption] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setLoading(false);
    }
    const handleCountryChange = selectedOption => {
        setCountry(selectedOption);
    };

    const handleNextButton = () => {
        return (
            !name ||
            !description ||
            !value ||
            !selectedType
        )
    }

    const handleCreateButton = () => {
        return (
            !country ||
            !state ||
            !city ||
            !street ||
            !zipcode ||
            !number
        )
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    }
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleImageChange = (e) => {

        const files = e.target.files;
        const fileList = Array.from(files);
        setImages((prevImages) => [...prevImages, ...fileList]);
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
    function resetForm () {
        setValue(null);
        setName(null);
        setDescription(null);
        setImages([]);
        setCountry(null);
        setState(null);
        setCity(null);
        setStreet(null);
        setZipcode(null);
        setComplement(null);
        setNumber(null);
        setSelectedOption(null);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const sendInput = async () => {
            try {
                setLoading(true);
                const provider = new JsonRpcProvider(HARDHAT_LOCALHOST_RPC_URL);
                const signer = ethers.Wallet.fromMnemonic(
                    HARDHAT_DEFAULT_MNEMONIC,
                    `m/44'/60'/0'/0/${accountIndex}`
                ).connect(provider);
                const inputContract = InputFacet__factory.connect(
                    LOCALHOST_DAPP_ADDRESS,
                    signer
                );
                const input = {
                    function_id: 1,
                    needToNotice: false,
                    name,
                    description,
                    image,
                    original_offer_id: null,
                    user_id: localStorareUser,
                    proposer_id: null,
                    offer_value: value,
                    status: 'pending',
                    ended: false,
                    created_at: new Date(),
                    updated_at: null,
                    ended_at: null,
                    country,
                    state,
                    city,
                    street,
                    zipcode,
                    number,
                    complement,
                    selectedType
                }

                const inputString = JSON.stringify(input);
                const inputBytes = ethers.utils.isBytesLike(inputString)
                    ? inputString
                    : ethers.utils.toUtf8Bytes(inputString);

                const tx = await inputContract.addInput(inputBytes);
                const receipt = await tx.wait(1);
                setLoading(false);
                resetForm();
                setActiveStep(0);
            } catch (error) {
                setLoading(false);
            }

        };
        sendInput();
    }

    return (
        <Box sx={{ width: '1000px', }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <form >
                {activeStep === 0 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                        <label className="name-input-label">
                            Product Name:
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="name-input-form"
                            />
                        </label>
                        <label className="description-input-label">
                            Description:
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="description-input-form"
                            ></textarea>
                        </label>
                        <label className="value-input-label">
                            Value:
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => setValue(formatCurrency(e.target.value))}
                                className="value-input-form"
                            />
                        </label>
                        <label className="type-input-label" htmlFor="selectOption">Product type:</label>
                        <select className="select-input" value={selectedType} onChange={handleOptionChange}>
                            <option selected={true} value="" disabled>Select the type...</option>
                            <option value="Homemade">Homemade</option>
                            <option value="Used">Used</option>
                            <option value="New">New</option>
                        </select>
                        <label className="image-input-label">
                            Add Image:
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                className="file-input"
                                multiple
                                onChange={handleImageChange}
                            />
                        </label>
                    </Box>
                )}
                {activeStep === 1 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                        <div className="address-input">

                            <label className="country-input-label">
                                Country:
                                <CountrySelector value={country} onChange={handleCountryChange} />
                            </label>
                            <label className="state-input-label">
                                State:
                                <input
                                    type="text"
                                    value={state}
                                    className="state-input-form"
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </label>
                            <label className="city-input-label">
                                City:
                                <input
                                    type="text"
                                    value={city}
                                    className="city-input-form"
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </label>
                            <label className="street-input-label">
                                Street:
                                <input
                                    type="text"
                                    value={street}
                                    className="street-input-form"
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                            </label>
                            <label className="number-input-label">
                                Number:
                                <input
                                    type="text"
                                    value={number}
                                    className="number-input-form"
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </label>
                            <label className="zipcode-input-label">
                                Zip Code:
                                <input
                                    type="text"
                                    value={zipcode}
                                    className="zipcode-input-form"
                                    onChange={(e) => setZipcode(e.target.value)}
                                />
                            </label>
                            <label className="complement-input-label">
                                Complement:
                                <input
                                    type="text"
                                    value={complement}
                                    className="complement-input-form"
                                    onChange={(e) => setComplement(e.target.value)}
                                />
                            </label>
                        </div>
                    </Box>
                )}
            </form>
            <Box sx={{ mt: 2, mb: 1 }}>
                <React.Fragment>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {activeStep === steps.length - 1 ? (
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleSubmit} disabled={handleCreateButton() || loading}>
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Create new offer'}
                                </Button>
                                <Snackbar open={loading} autoHideDuration={4000} onClose={handleClose}>
                                    <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                        Offer created successfully!
                                    </MuiAlert>
                                </Snackbar>
                            </Box>
                        ) : (
                            <Button onClick={handleNext} disabled={handleNextButton()}>Next</Button>
                        )}
                    </Box>
                </React.Fragment>
            </Box>
        </Box>
    );
}

export default CreateForm;
