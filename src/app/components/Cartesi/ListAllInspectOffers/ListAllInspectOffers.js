import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component"
import axios, * as others from 'axios';
import web3 from 'web3';
import ActionsCell from './ActionsCell';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import CategoriesEnum from '../../../utils/enums/EnumCategories';

const INSPECT_URL = "http://localhost:5005/inspect";
//const LOCALHOST_DAPP_ADDRESS = "0xF8C694fd58360De278d5fF2276B7130Bfdc0192A";


function ListAllInspectOffers() {
    const [loading, setLoading] = useState(false);
    const localStorareUser = localStorage.getItem('user_id');
    const [data, setData] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(data.length / itemsPerPage);


    const CustomButtonPending = styled(Button)`
    font-weight: bold;
    background-color: cornsilk;`;
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
            selector: (row) => row.offer_value,
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



    function handleLoad() {
        const sendInput = async () => {
            setLoading(true);

            const payload = {
                function_id: 1,
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
                let arrayOfObjects = arrayOfString && arrayOfString[0].length > 0 ? arrayOfString.map((string) =>
                    JSON.parse(string
                        .replace(/None/g, 'null')
                        .replace(/False/g, 'false')
                        .replace(/True/g, 'true')
                        .replace(/'/g, '"'))) : [];
                if (arrayOfObjects.length > 0) {
                    arrayOfObjects = arrayOfObjects.map((row) => {
                        row.selectedType = row.selectedType.toString()
                        row.image = row.image && row.image.length > 0 ? row.image.split(",") : [];
                        switch (row.selectedType) {
                            case '0':
                                row.selectedType = 'Assistance';
                                break;
                            case '1':
                                row.selectedType = 'Classes';
                                break;
                            case '2':
                                row.selectedType = 'Cars';
                                break;
                            case '3':
                                row.selectedType = 'Consulting';
                                break;
                            case '4':
                                row.selectedType = 'Design and Technology';
                                break;
                            case '5':
                                row.selectedType = 'Events';
                                break;
                            case '6':
                                row.selectedType = 'Fashion and Beauty';
                                break;
                            case '7':
                                row.selectedType = 'Reforms and Repairs';
                                break;
                            case '8':
                                row.selectedType = 'Health';
                                break;
                            case '9':
                                row.selectedType = 'Domestic Services';
                                break;
                            default:
                                break;
                        }
                        return row;
                    }
                    );
                }

                setData(arrayOfObjects);
            } catch (error) {
                console.log(error);
            }


            setLoading(false);
        };
        sendInput();
    }

    useEffect(() => {
        handleLoad()
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
        handleLoad();
        setSelectedFilter("");

    };
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

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

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {paginatedData.map((row, index) => (
                    <Card key={index} sx={{ minWidth: 370, minHeight: 560 }}>
                        <CardContent>
                            {Columns.map((column, colIndex) => (
                                <div key={colIndex}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {column.name}
                                    </Typography>
                                    <Typography>
                                        {typeof column.selector === 'function'
                                            ? column.selector(row)
                                            : (
                                                <div>
                                                    <ActionsCell row={row} />
                                                </div>
                                            )}
                                    </Typography>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="pagination-list" style={{ marginTop: 20 }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    showFirstButton
                    showLastButton
                />
            </div>
        </div>
    );
}

export default ListAllInspectOffers;


