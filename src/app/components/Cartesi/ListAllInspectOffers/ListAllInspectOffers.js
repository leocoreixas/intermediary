import React, { useState, useEffect } from "react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { InputFacet__factory } from "@cartesi/rollups";
import { useToast } from "@chakra-ui/react";
import DataTable from "react-data-table-component"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import axios, * as others from 'axios';

const HARDHAT_DEFAULT_MNEMONIC =
    "test test test test test test test test test test test junk";
const HARDHAT_LOCALHOST_RPC_URL = "http://localhost:8545/inspect";
const LOCALHOST_DAPP_ADDRESS = "0xF8C694fd58360De278d5fF2276B7130Bfdc0192A";

// This Component presents an Input field and adds its contents as an Input for the Echo DApp
function ListAllInspectOffers() {
    const [value, setValue] = useState("");
    const [accountIndex] = useState(0);
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const localStorareUser = localStorage.getItem('user_id');
    const [data, setData] = useState([
        {
            id: 1,
            name: 'Conan the Barbarian',
            value: '1234',
            created_at: '1982',
            description: 'new product',
            status: 'pending'
        },
    ]);

    const Columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Value",
            selector: (row) => row.value,
            sortable: true,
        },
        {
            name: "Created At",
            selector: (row) => row.created_at,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => row.description,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
        },
        {
            name: "Actions",
            cell: () => <FontAwesomeIcon className="ellipsis-vertical-menu" icon={faEllipsisVertical} />,
        },
    ];



    function handleSubmit() {
        const sendInput = async () => {
            setLoading(true);

            const provider = new JsonRpcProvider(HARDHAT_LOCALHOST_RPC_URL);
            const signer = ethers.Wallet.fromMnemonic(
                HARDHAT_DEFAULT_MNEMONIC,
                `m/44'/60'/0'/0/${accountIndex}`
            ).connect(provider);

            // Instantiate the Input Contract
            const inputContract = InputFacet__factory.connect(
                LOCALHOST_DAPP_ADDRESS,
                signer
            );

            // Encode the input
            const inputBytes = ethers.utils.isBytesLike(value)
                ? value
                : ethers.utils.toUtf8Bytes(value);

            // Send the transaction
            const tx = await inputContract.addInput(inputBytes);

            setLoading(false);
        };
        sendInput();
    }

    useEffect(() => {
        handleSubmit()
    }, [])


    let buttonProps = {};
    if (loading) {
        buttonProps.isLoading = true;
    }

    const handleFilter = (e) => {
        debugger
        const keyword = e.target.value.toLowerCase();
        const newData = [...data];
        const filteredData = newData.filter(
            (item) =>
                item.id.toString().toLowerCase().includes(keyword) ||
                item.name.toLowerCase().includes(keyword) ||
                item.value.toLowerCase().includes(keyword) ||
                item.created_at.toLowerCase().includes(keyword) ||
                item.description.toLowerCase().includes(keyword) ||
                item.status.toLowerCase().includes(keyword)
        );
        setData(filteredData);
        if (keyword === "") {
            fetchTableData();
        }
    };
    return (
        <div className="data-table">
            <input className="data-table-input" type="text" placeholder="Search" onChange={handleFilter} />

            <DataTable
                columns={Columns}
                data={data}
                progressPending={loading}
                paginationRowsPerPageOptions={[5, 10]}
                selectableRows
                pagination
            />
        </div>
    );
}

export default ListAllInspectOffers;


