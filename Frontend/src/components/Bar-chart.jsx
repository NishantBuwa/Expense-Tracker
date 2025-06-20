import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const BarCharts = ({ expenseData }) => {

  const [chartSize, setChartSize] = useState({ height: 550, width: 500, fontSize:12 })

  useEffect(() => {
    const handleChartSize = () => {
      const width = window.innerWidth;
      if (width < 450) {
        setChartSize({ height: 250, width: 165, fontSize:7 })
      } else if (450 <= width && width < 650) {
        setChartSize({ height: 300, width: 220, fontSize:12 })
      } else if (650 <= width && width < 850) {
        setChartSize({ height: 400, width: 300, fontSize:12 })
      } else if (850 <= width && width < 1024) {
        setChartSize({ height: 450, width: 350, fontSize:12 })
      } else if (width >= 1024) {
        setChartSize({ height: 550, width: 500, fontSize:12 })
      }
    }

    window.addEventListener('resize', handleChartSize)
    handleChartSize();

    return () => {
      window.removeEventListener('resize', handleChartSize);
    };

  }, [])


  const topExpenses = [...expenseData]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  const getGroupedCategoryData = () => {
    const categoryMap = {};

    expenseData.forEach(item => {
      const { category, ptype, amount } = item;

      if (!categoryMap[category]) {
        categoryMap[category] = { category, UPI: 0, Cash: 0, Card: 0 };
      }

      categoryMap[category][ptype] += amount;
    });

    return Object.values(categoryMap);
  };
  const groupedData = getGroupedCategoryData();


  return (
    <div className="w-full grid grid-cols-2 md:gap-6 gap-0 mx-auto md:text-[15px] text-[8px]" >
      {/* ------------------ Top 5 Expenses Chart ------------------ */}
      <div className="w-[100%]">
        <h2 className='text-center xl:text-[35px] lg:text-[30px] md:text-[25px] sm:text-[20px] text-[16px] text-yellow-500 text-lg sm:font-semibold md:mb-10 mb-2'>Top 5 Highest Expenses</h2>
        <div className='mx-auto' style={{ width: `${chartSize.width}px`, height: `${chartSize.height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topExpenses}
              margin={{ top: 20, right: 30, left: 10, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: `${chartSize.fontSize}` }}
                angle={-30}
                textAnchor="end"
                interval={0}
              />
              <YAxis />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Legend layout='horizontal' wrapperStyle={{ paddingTop: 20 }} />
              <Bar dataKey="amount" fill="#8884d8" name="Expense (₹)" activeBar={{ fillOpacity: 1 }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ------------------ Grouped Bar Chart ------------------ */}
      <div className="w-[98%]">
        <h2 className='text-center xl:text-[35px] lg:text-[30px] md:text-[25px] sm:text-[20px] text-[16px] text-yellow-500 text-lg sm:font-semibold md:mb-10 mb-2'>Payment Type Breakdown</h2>
        <div className='mx-auto' style={{ width: `${chartSize.width}px`, height: `${chartSize.height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={groupedData}
              margin={{ top: 20, right: 30, left: 10, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="category"
                tick={{ fontSize:`${chartSize.fontSize}` }}
                angle={-30}
                textAnchor="end"
                interval={0}
              />
              <YAxis />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Legend layout='horizontal' verticalAlign="bottom" wrapperStyle={{ paddingTop: 20, }} />
              <Bar dataKey="UPI" stackId="a" fill="#00C49F" />
              <Bar dataKey="Cash" stackId="a" fill="#FFBB28" />
              <Bar dataKey="Card" stackId="a" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BarCharts;
