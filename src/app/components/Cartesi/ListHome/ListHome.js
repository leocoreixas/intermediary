import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import LineChartComponent from "../../Charts/LineChart";
import BarChartComponent from "../../Charts/BarChart";
import PieChartComponent from "../../Charts/PieChart";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import axios, * as others from 'axios';
import web3 from 'web3';


const URL_QUERY_GRAPHQL = "http://localhost:4000/graphql";

const client = new ApolloClient({
  uri: URL_QUERY_GRAPHQL,
  cache: new InMemoryCache(),
});


// GraphQL query to retrieve notices given a cursor
const GET_NOTICES = gql`
    query GetNotices($cursor: String) {
        notices(first: 10, after: $cursor) {
            totalCount
            pageInfo {
                hasNextPage
                endCursor
            }
            edges {
                node {
                    index
                    input {
                        index
                    }
                    payload
                }
            }
        }
    }
`;

const INSPECT_URL = "http://localhost:5005/inspect";


function ListHome() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const localStorareUser = localStorage.getItem('user_id');
  const [dataNotice, setDataNotice] = useState([]);
  const [dataInspect, setDataInspect] = useState([]);
  const { loading: queryLoading, error: queryError, data } = useQuery(GET_NOTICES, {
    variables: { cursor: null },
    pollInterval: 500,
  });
  const [cursor, setCursor] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const handleDisableButton = () => {
    return !startDate || !endDate
  }



  function handleLoad() {
    const sendInput = async () => {
      setLoading(true);

      const payload = {
        function_id: 3,
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
        let arrayOfString = regularString.split("\n");
        arrayOfString = replaceSpecialCharacters(arrayOfString)

        const arrayOfObjects = arrayOfString && arrayOfString[0].length > 0 ? arrayOfString.map((string) =>
          JSON.parse(string
            .replace(/None/g, 'null')
            .replace(/False/g, 'false')
            .replace(/True/g, 'true')
            .replace(/'/g, '"'))) : [];       
        setDataInspect(arrayOfObjects);
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

  function replaceSpecialCharacters(data) {
    const sanitizedData = JSON.parse(JSON.stringify(data).replace(/\\/g, ''));
    return sanitizedData;
}

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

  const handleFilterClick = () => {
    if (dataNotice.length == 0 && dataInspect.length == 0) {
      handleLoad()
      refetchData()
    }
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59);
      const newNoticeData = dataNotice.filter((item) => {
        const date = new Date(item.created_at);
        return date >= start && date <= end;
      });
      const newInspectData = dataInspect.filter((item) => {
        const date = new Date(item.created_at);
        return date >= start && date <= end;
      });
      setDataNotice(newNoticeData);
      setDataInspect(newInspectData);
    } else {
      setDataNotice(dataNotice);
      setDataInspect(dataInspect);
    }
  };

  const handleResetClick = () => {
    setStartDate(null);
    setEndDate(null);
    handleLoad()
    refetchData()
  }


  return (
    <div className="data-table">
      <div className="filter">

        <div className="data-picker">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                value={startDate}
                label="Offers from"
                onChange={(newValue) => setStartDate(newValue)} />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="data-picker">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker value={endDate} label="Offers until" onChange={(endValue) => setEndDate(endValue)} />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <Button variant="outlined"
          onClick={handleFilterClick}
          style={{ marginLeft: '25px', marginTop: '5px' }}
          disabled={handleDisableButton()}
        >
          filter date
        </Button>

        <Button variant="outlined"
          onClick={handleResetClick}
          style={{ marginLeft: '25px', marginTop: '5px' }}
          disabled={!startDate || !endDate}
        >
          Reset filter
        </Button>


      </div>
      <div className="top-page">

        <LineChartComponent filterValue={filterValue} dataNotice={dataNotice} dataInspect={dataInspect} startDate={startDate} endDate={endDate} />
        {/* <PieChartComponent filterValue={filterValue} dataNotice={dataNotice} dataInspect={dataInspect} startDate={startDate} endDate={endDate} /> */}
      </div>
      <div className="bottom-page">
        <BarChartComponent filterValue={filterValue} dataNotice={dataNotice} dataInspect={dataInspect} startDate={startDate} endDate={endDate} />
      </div>
    </div>
  );
}

function ListInitialPage() {
  return (
    <ApolloProvider client={client}>
      <ListHome />
    </ApolloProvider>
  );
}

export default ListInitialPage;