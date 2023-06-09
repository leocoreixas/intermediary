import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import DataTable from "react-data-table-component"
import ActionsCell from '../ListAllInspectOffers/ActionsCell';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


const URL_QUERY_GRAPHQL = "http://localhost:4000/graphql";

const client = new ApolloClient({
  uri: URL_QUERY_GRAPHQL,
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
      border: "1px solid black",
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
const GET_NOTICES = gql`
  query GetNotices($cursor: String) {
    notices(first: 10, after: $cursor) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        payload
        index
        input {
          index
          epoch {
            index
          }
        }
      }
    }
  }
`;

function OffersList() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataNotice, setDataNotice] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const typeOptions = [...new Set(dataNotice.map((item) => item.selectedType))];


  // Retrieve notices
  const { loading: queryLoading, error: queryError, data } = useQuery(GET_NOTICES, {
    variables: { cursor: null },
  });
  const handleFilter = (e) => {
    const keyword = e.target.value.toLowerCase();
    if (keyword === "") {
      refetchData();
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

  const refetchData = () => {
    setLoading(true);
    setError(null);
    setDataNotice([]);
    setSelectedFilter("");
    client
      .query({
        query: GET_NOTICES,
        variables: { cursor: null },
      })
      .then((result) => {
        const { data } = result;
        if (data?.notices?.nodes) {
          const newNoticeData = data.notices.nodes.map((node) => {
            const echo = ethers.utils.toUtf8String(node.payload);
            return JSON.parse(echo);
          });
          setDataNotice(newNoticeData);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };
  // Check query status
  useEffect(() => {
    setLoading(queryLoading);
    setError(queryError);

  }, [queryLoading, queryError, toast]);

  // Update dataNotice when new data is received
  useEffect(() => {
    if (data?.notices?.nodes) {
      debugger
      const newNoticeData = data.notices.nodes.map((node) => {
        const echo = ethers.utils.toUtf8String(node.payload);
        return JSON.parse(echo);
      });
      setDataNotice(newNoticeData);
    }
  }, [data]);

  const handleFilterChange = (e) => {
    const selectedType = e.target.value;
    if (selectedType === "All") {
      setSelectedFilter(selectedType);
      refetchData();
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
          <Typography variant="h6" gutterBottom>
            Search by Any Field
          </Typography>
          <input
            className="data-table-input"
            type="text"
            placeholder="Search"
            onChange={handleFilter}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" gutterBottom>
            Type
          </Typography>
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            style={{ width: "80%", height: "40px" }}
          >
            <option value="All">All</option>
            {typeOptions.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Grid>
      </Grid>
      <DataTable
        columns={Columns}
        data={dataNotice}
        progressPending={loading}
        paginationRowsPerPageOptions={[5, 10]}
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