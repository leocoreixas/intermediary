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

const generateDateRange = () => {
  const today = new Date();
  const dateRange = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dateRange.push(date.toISOString().split('T')[0]);
  }

  return dateRange;
};

const BarChartComponent = ({ filterValue, dataNotice, dataInspect }) => {
  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    fillChart();
  }, [filterValue, dataNotice, dataInspect]);

  const fillChart = () => {
    const dateRange = generateDateRange();
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
