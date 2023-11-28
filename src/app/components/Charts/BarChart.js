import React, { useState, useEffect } from 'react';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const generateDateRange = (startDate, endDate, needToLimit = true, numDays = 7) => {
  const dateRange = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let currentDate = startDate ? new Date(startDate) : new Date(today);
  currentDate.setDate(currentDate.getDate() + 1);
  currentDate.setHours(23,59, 59, 59);
  if (!startDate) {
    currentDate.setDate(today.getDate() - numDays +1); 
  }
  
  const lastDate = endDate ? new Date(endDate) : new Date(today);
  lastDate.setDate(lastDate.getDate() + 1);

  while (currentDate < lastDate) {
    dateRange.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1); 

    if (needToLimit && dateRange.length >= numDays) {
      break; 
    }
  }

  return dateRange;
};

const BarChartComponent = ({ filterValue, dataNotice, dataInspect, startDate, endDate }) => {
  const [chartData, setChartData] = useState([]);
  const [startDateFilter, setStartDate] = useState(null);
  const [endDateFilter, setEndDate] = useState(null);
  debugger
  useEffect(() => {
    setStartDate(startDate);
    setEndDate(endDate);
    fillChart();
  }, [dataNotice, dataInspect, startDate, endDate]);

  const fillChart = () => {
    let dateRange = generateDateRange();
    if (startDateFilter && endDateFilter) {
      dateRange = generateDateRange(startDateFilter, endDateFilter, false)
      dateRange = dateRange.filter((item) => {
        const date = new Date(item);
        const startDateNew = new Date(startDateFilter);
        return date >= startDateNew.setDate(startDateNew.getDate() - 1) && date <= endDateFilter;
      })
    } 
    const generatedData = [];
    for (const date of dateRange) {
      const filteredData = dataNotice.filter(item => {
        const itemDate = new Date(item?.created_at).toISOString().split('T')[0];
        return itemDate === date;
      });

      generatedData.push({
        date,
        amount: filteredData.length,
      });
    }

    setChartData(generatedData);
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          width={500}
          height={400}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            bottom: 20,
            left: 5,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" name="All offers accepted on the day" barSize={20} fill="#413ea0" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
