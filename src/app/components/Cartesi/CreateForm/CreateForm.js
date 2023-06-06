import React, { useState } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { InputFacet__factory } from "@cartesi/rollups";
import { Input, Button, useToast } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import './CreateForm.css'

const HARDHAT_DEFAULT_MNEMONIC =
    "test test test test test test test test test test test junk";
const HARDHAT_LOCALHOST_RPC_URL = "http://localhost:8545";
const LOCALHOST_DAPP_ADDRESS = "0xF8C694fd58360De278d5fF2276B7130Bfdc0192A";

// This Component presents an Input field and adds its contents as an Input for the Echo DApp
function CreateForm() {
    const [value, setValue] = useState("");
    const [accountIndex] = useState(0);
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImages] = useState([]);
    const localStorareUser = localStorage.getItem('user_id');

    const handleImageChange = (e) => {
        
        const files = e.target.files;
        const fileList = Array.from(files);
        setImages((prevImages) => [...prevImages, ...fileList]);
      };

    function formatCurrency(value) {
        // Remove non-digit characters
        const numericValue = value.replace(/[^0-9.]/g, '');

        // Convert to number
        const numberValue = parseFloat(numericValue);

        // Format as currency with dollar symbol and two decimal places
        const formattedValue = numberValue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        return formattedValue;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const sendInput = async () => {
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
                user_id: localStorareUser,
                proposer_id: null,
                offer_value: value,
                status: 'pending',
                ended: false,
                created_at: new Date(),
                updated_at: null,
                ended_at: null,
            }
            
            const inputString = JSON.stringify(input);
            // Encode the input
            const inputBytes = ethers.utils.isBytesLike(inputString)
                ? inputString
                : ethers.utils.toUtf8Bytes(inputString);

            // Send the transaction
            const tx = await inputContract.addInput(inputBytes);
            console.log(`transaction: ${tx.hash}`);
            toast({
                title: "Offer created",
                description: "Offer created successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-left",
            });

            const receipt = await tx.wait(1);

            // Search for the InputAdded event
            const event = receipt.events?.find((e) => e.event === "InputAdded");

            setLoading(false);
        };
        sendInput();
    }

    let buttonProps = {};
    if (loading) {
        buttonProps.isLoading = true;
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>

                <div className="card">
                    <div className="card-content">
                        <h2>NEW OFFER</h2>
                        <label className="name-input-label">
                            Product Name:
                            <input
                                type="text"
                                value={name}
                                className="name-input-form"
                                onChange={(e) => setName(e.target.value)}
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
                                className="value-input-form"
                                onChange={(e) => setValue(formatCurrency(e.target.value))}
                            />
                        </label>
                        <label className="image-input">
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
                        <Button
                            className="button-create-form"
                            {...buttonProps}
                            colorScheme="teal"
                            variant="outline"
                            type="submit">
                            Create Offer
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateForm;
