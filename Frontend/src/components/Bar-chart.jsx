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

  const [chartSize, setChartSize] = useState({ height: 550, fontSize: 12 });

  useEffect(() => {
    const handleChartSize = () => {
      const width = window.innerWidth;
      if (width < 450) {
        setChartSize({ height: 250, fontSize: 7 });
      } else if (width < 650) {
        setChartSize({ height: 300, fontSize: 12 });
      } else if (width < 850) {
        setChartSize({ height: 400, fontSize: 12 });
      } else if (width < 1024) {
        setChartSize({ height: 450, fontSize: 12 });
      } else {
        setChartSize({ height: 550, fontSize: 12 });
      }
    };

    window.addEventListener('resize', handleChartSize);
    handleChartSize();

    return () => {
      window.removeEventListener('resize', handleChartSize);
    };
  }, []);

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
    <div className="w-full overflow-x-hidden flex flex-cols-2 justify-center items-center md:gap-6 gap-0 md:text-[15px] text-[8px]">
      
      {/* ------------------ Top 5 Expenses Chart ------------------ */}
      <div className="w-full max-w-full overflow-hidden">
        <h2 className="text-center xl:text-[35px] lg:text-[30px] md:text-[25px] sm:text-[20px] text-[14px] text-yellow-500 sm:font-semibold md:mb-10 mb-2">
          Highest Expenses
        </h2>
        <div className="mx-auto lg:w-[500px] max-w-full overflow-hidden" style={{ height: `${chartSize.height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topExpenses} margin={{ top: 20, right: 30, left: 10, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="expenseName"
                tick={{ fontSize: chartSize.fontSize }}
                angle={-30}
                textAnchor="end"
                interval={0}
              />
              <YAxis />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Bar dataKey="amount" fill="#2ef1f8" name="Expense (₹)" activeBar={{ fillOpacity: 1 }} />
              <Legend layout="horizontal" wrapperStyle={{ paddingTop: 20, textAlign:'center' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ------------------ Grouped Bar Chart ------------------ */}
      <div className=" w-full max-w-full overflow-hidden">
        <h2 className="text-center xl:text-[35px] lg:text-[30px] md:text-[25px] sm:text-[20px] text-[14px] text-yellow-500 sm:font-semibold md:mb-10 mb-2">
          Payment Breakdown
        </h2>
        <div className="mx-auto lg:w-[500px] max-w-full overflow-hidden" style={{ height: `${chartSize.height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={groupedData} margin={{ top: 20, right: 30, left: 10, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="category"
                tick={{ fontSize: chartSize.fontSize }}
                angle={-30}
                textAnchor="end"
                interval={0}
              />
              <YAxis />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Legend layout="horizontal" wrapperStyle={{ paddingTop: 20 }} />
              <Bar dataKey="UPI" stackId="a" fill="#33cc33" />
              <Bar dataKey="Cash" stackId="a" fill="#facc15" />
              <Bar dataKey="Card" stackId="a" fill="#cc99ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BarCharts;

