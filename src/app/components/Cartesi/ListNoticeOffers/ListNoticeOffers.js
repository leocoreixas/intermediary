import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import DataTable from "react-data-table-component"
import ActionsCell from '../ListAllInspectOffers/ActionsCell';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { generateGetNoticesQuery } from '../graphql/query_notice'
import dotenv from "dotenv";
dotenv.config();
const NEXT_PUBLIC_URL_QUERY_GRAPHQL = process.env.NEXT_PUBLIC_URL_QUERY_GRAPHQL;

const client = new ApolloClient({
  uri: NEXT_PUBLIC_URL_QUERY_GRAPHQL,
  cache: new InMemoryCache(),
});

const CustomButtonPending = styled(Button)`
    font-weight: bold;
    background-color: cornsilk;
    color: black;`;

const CustomButtonAccepted = styled(Button)`
    font-weight: bold;
    background-color: rgb(16 255 0 / 26%);
    color: black;`;
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
    selector: (row) => row.value || row.offer_value,
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
    cell: (row) => (
      <>
        {row.status === 'pending' ? (
          <CustomButtonPending variant="outlined" disabled>
            {row.status}
          </CustomButtonPending>
        ) : (
          <CustomButtonAccepted variant="outlined" disabled>
            {row.status}
          </CustomButtonAccepted>
        )}
      </>
    ),
  },
  {
    name: "Actions",
    cell: (row) => <ActionsCell row={row} />,
  },
];

// GraphQL query to retrieve notices given a cursor

function OffersList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataNotice, setDataNotice] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const typeOptions = ['All types', 'Homemade', 'New', 'Used'];
  const [cursor, setCursor] = useState(null);
  const [totalCount, setTotalCount] = useState(10);
  const GET_NOTICES = generateGetNoticesQuery(totalCount);

  const handleFilter = (e) => {
    const keyword = e.target.value.toLowerCase();
    if (keyword === "") {
    } else {
      const newData = [...dataNotice];
      const filteredData = newData.filter(
        (item) =>
          item?.id?.toString().toLowerCase().includes(keyword) ||
          item?.name?.toLowerCase().includes(keyword) ||
          item?.value?.toLowerCase().includes(keyword) ||
          item?.created_at?.toLowerCase().includes(keyword) ||
          item?.description?.toLowerCase().includes(keyword) ||
          item?.status?.toLowerCase().includes(keyword)
      );
      setDataNotice(filteredData);
    }
  };
  const result = useQuery(GET_NOTICES, {
    variables: { cursor: cursor },
    pollInterval: 500,
  });
  useEffect(() => {
    if (result?.loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (result?.data?.notices?.edges) {
      const newNoticeData = result?.data.notices.edges.map(({ node }) => {
        const echo = ethers.utils.toUtf8String(node.payload);
        return JSON.parse(echo);
      });
      setDataNotice(newNoticeData);
    }
  }, [result?.data?.notices?.edges, result?.loading]);

  const handleFilterChange = (e) => {
    const selectedType = e.target.value;
    if (selectedType === "All types") {
      setSelectedFilter(selectedType);
    } else {
      setSelectedFilter(selectedType);
      filterDataByType(selectedType);
    }
  };

  const filterDataByType = (selectedType) => {
    const filteredData = dataNotice.filter(
      (item) => item.selectedType?.toLowerCase() === selectedType?.toLowerCase()
    );
    setDataNotice(filteredData);
  };

  return (
    <div className="data-table">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <input
            className="data-table-input"
            type="text"
            placeholder="Search by Any Field..."
            style={{ borderRadius: "8px" }}
            onChange={handleFilter}
          />
        </Grid>
        {/* <Grid item xs={4}>
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            placeholder="Filter by Type..."
            style={{ width: "80%", height: "40px", borderRadius: "8px" }}
          >
            {typeOptions.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Grid> */}
      </Grid>
      <DataTable
        columns={Columns}
        data={dataNotice}
        progressPending={loading}
        paginationRowsPerPageOptions={[totalCount]}
        customStyles={customStyles}
        pagination
      />
    </div>
  );
}

function ListNotice() {
  return (
    <ApolloProvider client={client}>
      <OffersList />
    </ApolloProvider>
  );
}

export default ListNotice;