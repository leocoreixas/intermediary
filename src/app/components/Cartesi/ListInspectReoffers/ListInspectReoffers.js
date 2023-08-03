import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component"
import axios, * as others from 'axios';
import web3 from 'web3';
import ActionsCell from '../ListAllInspectOffers/ActionsCell';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './ListInspectReOffers.css'
import Grid from '@mui/material/Grid';
import CategoryList from "../CreateForm/ServiceType";


const INSPECT_URL = "http://localhost:5005/inspect";

function ListInspectReOffers() {
    const [loading, setLoading] = useState(false);
    const localStorareUser = localStorage.getItem('user_id');
    const [data, setData] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("");
    const typeOptions = ['All types', 'Homemade', 'New', 'Used'];
    const CustomButtonPending = styled(Button)`
    font-weight: bold;
    background-color: azure;`;

    const customStyles = {
        table: {
            style: {
                borderRadius: "3px",
            },
        },
    };
    const Columns = [
        {
            name: "User ID",
            selector: (row) => row.user_id,
        },
        {
            name: "Product Name",
            selector: (row) => row.name,
        },
        {
            name: "Value",
            selector: (row) => row.offer_value || row.value,
        },
        {
            name: "Created At",
            selector: (row) => (row.created_at ? new Date(row.created_at).toLocaleString() : row.created_at),
        },
        {
            name: "Type",
            selector: (row) => row.selectedType,
        },
        {
            name: "Description",
            selector: (row) => row.description,
        },
        {
            name: "Status",
            selector: (row) => (
                <CustomButtonPending className="button-status" variant="outlined" disabled>
                    {row.status}
                </CustomButtonPending>
            ),
        },
        {
            name: "Actions",
            cell: (row) => <ActionsCell row={row} />,
        },
    ];



    function handleSubmit() {
        const sendInput = async () => {
            setLoading(true);

            const payload = {
                function_id: 2,
                user_id: localStorareUser
            }
            const stringToEncode = JSON.stringify(payload);
            const url = `${INSPECT_URL}/${stringToEncode}`;

            let config = {
                url: url,
                headers: {
                    'Accept': 'application/json'
                }
            };

            try {
                const response = await axios.get(config.url);

                const parsedData = response.data.reports[0].payload
                const regularString = web3.utils.hexToAscii(parsedData);
                const arrayOfString = regularString.split("\n");
                const arrayOfObjects = arrayOfString && arrayOfString[0].length > 0 ? arrayOfString.map((string) =>
                    JSON.parse(string
                        .replace(/None/g, 'null')
                        .replace(/False/g, 'false')
                        .replace(/True/g, 'true')
                        .replace(/'/g, '"'))) : [];
                setData(arrayOfObjects);
            } catch (error) {
                console.log(error);
            }


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

        const keyword = e.target.value.toLowerCase();
        const newData = [...data];

        const filteredData = newData.filter(
            (item) =>
                item.id.toString().toLowerCase().includes(keyword) ||
                item.name.toLowerCase().includes(keyword) ||
                item.offer_value.toLowerCase().includes(keyword) ||
                item.created_at.toLowerCase().includes(keyword) ||
                item.description.toLowerCase().includes(keyword) ||
                item.status.toLowerCase().includes(keyword)
        );
        setData(filteredData);
        if (keyword === "") {
            refetchData();
        }
    };
    const refetchData = () => {
        setLoading(true);
        setData([]);
        handleSubmit();
        setSelectedFilter("");
    };
    const handleFilterChange = (e) => {
        const selectedType = e.target.value;
        if (selectedType === "All types") {
            setSelectedFilter(selectedType);
            refetchData();
        } else {
            setSelectedFilter(selectedType);
            filterDataByType(selectedType);
        }
    };

    const filterDataByType = (selectedType) => {
        const newData = [...data];

        const filteredData = data.filter(
            (item) => item.selectedType?.toLowerCase() === selectedType?.toLowerCase()
        );
        setData(filteredData);
    };
    return (
        <div className="data-table">
            <Grid container spacing={2}>
                <Grid item xs={8}>

                    <input
                        className="data-table-input"
                        type="text"
                        placeholder="Search by Any Field..."
                        onChange={handleFilter}
                        style={{ borderRadius: "8px" }}
                    />
                </Grid>
            </Grid>

            <DataTable
                columns={Columns}
                data={data}
                progressPending={loading}
                paginationRowsPerPageOptions={[5, 10]}
                customStyles={customStyles}
                pagination
            />
        </div>
    );
}

export default ListInspectReOffers;


