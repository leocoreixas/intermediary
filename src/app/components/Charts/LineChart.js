import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import EnumCategories from '../../utils/enums/EnumCategories';

const generateDateRange = (startDate, endDate, needToLimit = true, numDays = 7) => {
  const dateRange = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let currentDate = startDate ? new Date(startDate) : new Date(today);
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



const LineChartComponent = ({ filterValue, dataNotice, dataInspect, startDate, endDate }) => {
  const [opacity, setOpacity] = useState({
    uv: 1,
    pv: 1,
  });
  const [chartData, setChartData] = useState([]);
  const [startDateFilter, setStartDate] = useState(null);
  const [endDateFilter, setEndDate] = useState(null);

  useEffect(() => {
    setStartDate(startDate);
    setEndDate(endDate);
    fillChart()
  }, [dataNotice, dataInspect, startDate, endDate]);

  const fillChart = () => {
    debugger
    let dateRange = generateDateRange();
    const generatedData = [];
    const concatData = dataNotice.concat(dataInspect)
    if (startDateFilter && endDateFilter) {
      dateRange = generateDateRange(startDateFilter, endDateFilter, false)
      dateRange = dateRange.filter((item) => {
        const date = new Date(item);
        const startDateNew = new Date(startDateFilter);
        return date >= startDateNew.setDate(startDateNew.getDate() - 1) && date <= endDateFilter;
      })
    } 
    for (const date of dateRange) {
      const total = {
        date,
        'technical assistance': 0,
        classes: 0,
        autos: 0,
        consulting: 0,
        'design and technology': 0,
        events: 0,
        'fashion and beauty': 0,
        'renovations and repairs': 0,
        health: 0,
        'domestic services': 0,

      }
      const filteredData = concatData.filter((item) => {
        if (item?.created_at) {
          const dateItem = new Date(item?.created_at)
          const dateItemFormated = dateItem.toISOString().split('T')[0]
          return dateItemFormated == date
        }
      })
      filteredData.map((item) => {
        if (item?.created_at) {
          const selectTypeToIncrement = item?.selectedType
          switch (Number(selectTypeToIncrement)) {
            case EnumCategories.ASSISTENCIA_TECNICA:
              total['technical assistance'] += 1;
              break;
            case EnumCategories.AULAS:
              total.classes += 1;
              break;
            case EnumCategories.AUTOS:
              total.autos += 1;
              break;
            case EnumCategories.CONSULTORIA:
              total.consulting += 1;
              break;
            case EnumCategories.DESIGN_E_TECNOLOGIA:
              total['design and technology'] += 1;
              break;
            case EnumCategories.EVENTOS:
              total.events += 1;
              break;
            case EnumCategories.MODA_E_BEALEZA:
              total['fashion and beauty'] += 1;
              break;
            case EnumCategories.REFORMAS_E_REPAROS:
              total['renovations and repairs'] += 1;
              break;
            case EnumCategories.SAUDE:
              total.health += 1;
              break;
            case EnumCategories.SERVICOS_DOMESTICOS:
              total['domestic services'] += 1;
              break;
            default:
              break;
          }
        }
      })
      if (filteredData.length == 0) {
        generatedData.push({
          date,
          'technical assistance': 0,
          classes: 0,
          autos: 0,
          consulting: 0,
          'design and technology': 0,
          events: 0,
          'fashion and beauty': 0,
          'renovations and repairs': 0,
          health: 0,
          'domestic services': 0,

        });
      } else {
        generatedData.push(total);
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
  const colors = [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#f76e6e',
    '#bcbcbc',
    '#6e81c8',
    '#ff8e83',
    '#59a14e',
    '#ffca66',
    '#9c755f',
  ];
  const categories = [
    { dataKey: 'technical assistance', strokeOpacity: opacity.pv, key: 0 },
    { dataKey: 'classes', strokeOpacity: opacity.uv, key: 1 },
    { dataKey: 'autos', strokeOpacity: opacity.pv, key: 2 },
    { dataKey: 'consulting', strokeOpacity: opacity.uv, key: 3 },
    { dataKey: 'design and technology', strokeOpacity: opacity.pv, key: 4 },
    { dataKey: 'events', strokeOpacity: opacity.uv, key: 5 },
    { dataKey: 'fashion and beauty', strokeOpacity: opacity.pv, key: 6 },
    { dataKey: 'renovations and repairs', strokeOpacity: opacity.uv, key: 7 },
    { dataKey: 'health', strokeOpacity: opacity.pv, key: 8 },
    { dataKey: 'domestic services', strokeOpacity: opacity.uv, key: 9 },
  ];

  return (
    <div style={{ width: '100%' }}>
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
          {categories.map((category, index) => (
            <Line
              key={category.key}
              type="monotone"
              dataKey={category.dataKey}
              strokeOpacity={category.strokeOpacity}
              stroke={colors[index % colors.length]}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
