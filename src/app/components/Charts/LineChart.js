import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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



const LineChartComponent = ({ filterValue, dataNotice, dataInspect }) => {
  const [opacity, setOpacity] = useState({
    uv: 1,
    pv: 1,
  });
  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    fillChart(filterValue)
  }, [chartData]);

  const fillChart = () => {
    const dateRange = generateDateRange();
    const generatedData = [];
    const concatData = dataNotice.concat(dataInspect)
    for (const date of dateRange) {
      concatData.map((item) => {
        if (item?.created_at) {
          const dateItem = new Date(item?.created_at)
          const dateItemFormated = dateItem.toISOString().split('T')[0]
          if (dateItemFormated == date) {
            generatedData.push({
              date,
              pending: dataInspect.filter((item) => item?.status?.toLowerCase() == 'pending').length,
              reoffered: dataInspect.filter((item) => item?.status?.toLowerCase() == 'reoffered').length,
              accepted: dataNotice.filter((item) => item?.status?.toLowerCase() == 'accepted').length,
            });
          }
          else {
            generatedData.push({
              date,
              pending: 0,
              reoffered: 0,
              accepted: 0,
            });
          }
        }
      })
      if (generatedData.length == 0) {
        generatedData.push({
          date,
          pending: 0,
          reoffered: 0,
          accepted: 0,
        });
      }
    }

    setChartData(generatedData);
  }

  const handleMouseEnter = (o) => {
    const { dataKey } = o;

    setOpacity((prevOpacity) => ({ ...prevOpacity, [dataKey]: 0.5 }));
  };

  const handleMouseLeave = (o) => {
    const { dataKey } = o;

    setOpacity((prevOpacity) => ({ ...prevOpacity, [dataKey]: 1 }));
  };

  return (
    <div style={{ width: '60%' }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          <Line type="monotone" dataKey="pending" stroke="#8884d8"  />
          <Line type="monotone" dataKey="reoffered" stroke="#061b28" />
          <Line type="monotone" dataKey="accepted" stroke="#e3c2e9" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
