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

const INSPECT_URL = "http://localhost:5005/inspect";


function ListHome() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const localStorareUser = localStorage.getItem('user_id');
  const [dataNotice, setDataNotice] = useState([]);
  const [dataInspect, setDataInpesct] = useState([]);
  const typeOptions = ['Pending', 'Reoffered', 'Completed', 'New', 'Used', 'Homemade'];
  const { loading: queryLoading, error: queryError, data } = useQuery(GET_NOTICES, {
    variables: { cursor: null },
  });
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [totalReOffered, setTotalReOffered] = useState(0);
  const [totalNew, setTotalNew] = useState(0);
  const [totalUsed, setTotalUsed] = useState(0);
  const [totalHomemade, setTotalHomemade] = useState(0);
  const [sendData, setSendData] = useState(0);
  const [filterValue, setFilterValue] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleFilterChange = (value) => {
        setFilterValue(value); 
  };

  function handleSubmit() {
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
        const arrayOfString = regularString.split("\n");
        const arrayOfObjects = arrayOfString && arrayOfString[0].length > 0 ? arrayOfString.map((string) =>
          JSON.parse(string
            .replace(/None/g, 'null')
            .replace(/False/g, 'false')
            .replace(/True/g, 'true')
            .replace(/'/g, '"'))) : [];


        setDataInpesct(arrayOfObjects);
      } catch (error) {
        console.log(error);
      }


      setLoading(false);
    };
    sendInput();
  }

  useEffect(() => {
    handleSubmit()
    refetchData()
    fillValues()
  }, [])

  const fillValues = () => {
    setTotalCompleted(dataNotice.filter((item) => item?.status.toLowerCase() == 'accepted').length);
    setTotalPending(dataInspect.filter((item) => item?.status.toLowerCase() == 'pending').length);
    setTotalReOffered(dataInspect.filter((item) => item?.status.toLowerCase() == 'reoffered').length);
    setTotalNew(dataNotice.filter((item) => item?.selectedType.toLowerCase() == 'new').length +
     dataInspect.filter((item) => item?.selectedType.toLowerCase() == 'new').length);
    setTotalUsed(dataNotice.filter((item) => item?.selectedType.toLowerCase() == 'used').length +
     dataInspect.filter((item) => item?.selectedType.toLowerCase() == 'used').length);
    setTotalHomemade(dataNotice.filter((item) => item?.selectedType.toLowerCase() == 'homemade').length +
     dataInspect.filter((item) => item?.selectedType.toLowerCase() == 'homemade').length);
  }

  const refetchData = () => {
    setLoading(true);
    setError(null);
    setDataNotice([]);
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
      const newNoticeData = data.notices.nodes.map((node) => {
        const echo = ethers.utils.toUtf8String(node.payload);
        return JSON.parse(echo);
      });
      setDataNotice(newNoticeData);
    }
  }, []);

  const handleFilterClick = () => {
    const newNoticeData = dataNotice.filter((item) => {
      if (filterValue === 'No filter') {
        return item;
      }
      return item.type === filterValue;
    });
    if (startDate && endDate) {
      const newNoticeData2 = newNoticeData.filter((item) => {
        const date = new Date(item.date);
        return date >= startDate && date <= endDate;
      });
      setDataNotice(newNoticeData2);
    } else {
      setDataNotice(newNoticeData);
    }
  };


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
        >
          filter date
        </Button>
      </div>
      <div className="top-page">

        <LineChartComponent filterValue={filterValue} dataNotice={dataNotice} dataInspect={dataInspect} />
        <PieChartComponent filterValue={filterValue} dataNotice={dataNotice} dataInspect={dataInspect}/>
      </div>
      <div className="bottom-page">
        <BarChartComponent filterValue={filterValue} dataNotice={dataNotice} dataInspect={dataInspect}/>
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