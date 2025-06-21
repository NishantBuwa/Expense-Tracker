// import React from 'react'
// import {
//     PieChart,
//     Pie,
//     Cell,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
// } from 'recharts';
// import { useState, useEffect } from 'react';

// const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57'];

// function Piechart({ expenseData }) {

//     const [chartSize, setChartSize] = useState({ height: 400, outerRadius: 130, label: true })

//     useEffect(() => {

//         const handleChartSize = () => {
//             const width = window.innerWidth;
//             if (width < 510) {
//                 setChartSize({ height: 150, outerRadius: 50, label: false })
//             }
//             else if (450 <= width && width < 650) {
//                 setChartSize({ height: 200, outerRadius: 70, label: true })
//             }
//             else if (650 <= width && width < 850) {
//                 setChartSize({ height: 380, outerRadius: 100, label: true })
//             }
//             else if (850 <= width) {
//                 setChartSize({ height: 400, outerRadius: 130, label: true })
//             }
//         }
//         window.addEventListener('resize', handleChartSize)
//         handleChartSize()
//     }, [])



//     // Pie Chart 1: Category-wise total expense
//     const categoryData = expenseData.reduce((acc, item) => {
//         const existing = acc.find((d) => d.name === item.category);
//         if (existing) {
//             existing.value += item.amount;
//         } else {
//             acc.push({ name: item.category, value: item.amount });
//         }
//         return acc;
//     }, []);

//     // Pie Chart 2: Payment type distribution
//     const ptypeData = expenseData.reduce((acc, item) => {
//         const existing = acc.find((d) => d.name === item.ptype);
//         if (existing) {
//             existing.value += item.amount;
//         } else {
//             acc.push({ name: item.ptype, value: item.amount });
//         }
//         return acc;
//     }, []);


//     return (
//         <div className="grid grid-cols-2 gap-6 md:text-[15px] text-[8px] ">

//             {/* Pie Chart - Category wise */}
//             <div className=''>
//                 <h2 className='text-center  xl:text-[35px] lg:text-[30px] md:text-[25px] sm:text-[20px] text-[14px] text-yellow-500 text-lg sm:font-semibold'>Expenses by Category Type</h2>
//                 <ResponsiveContainer width="100%" height={chartSize.height}>
//                     <PieChart>
//                         <Pie
//                             data={categoryData}
//                             cx="50%"
//                             cy="50%"
//                             outerRadius={chartSize.outerRadius}
//                             dataKey="value"
//                             label={chartSize.label}
//                         >
//                             {categoryData.map((_, index) => (
//                                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                             ))}
//                         </Pie>
//                         <Tooltip />
//                     </PieChart>
//                 </ResponsiveContainer>
//                 <Legend
//                     payload={categoryData.map((item, index) => ({
//                         id: item.name,
//                         value: item.name,
//                         type: 'square',
//                         color: COLORS[index % COLORS.length]
//                     }))}
//                     layout="horizontal"
//                     align="center"
//                     wrapperStyle={{
//                         paddingTop: '10px',
//                         position: 'relative', // <--- Add this line
//                         textAlign:'center',
//                         lineHeight:'20px'
//                     }}
//                 />
//             </div>

//             {/* Pie Chart - Payment type wise */}
//             <div className=''>
//                 <h2 className='text-center xl:text-[35px] lg:text-[30px] md:text-[25px] sm:text-[20px] text-[14px] text-yellow-500 text-lg sm:font-semibold'>Expenses by Payment Type</h2>
//                 <ResponsiveContainer width="100%" height={chartSize.height}>
//                     <PieChart>
//                         <Pie
//                             data={ptypeData}
//                             cx="50%"
//                             cy="50%"
//                             outerRadius={chartSize.outerRadius}
//                             dataKey="value"
//                             label={chartSize.label}
//                         >
//                             {ptypeData.map((_, index) => (
//                                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                             ))}
//                         </Pie>
//                         <Tooltip />
//                     </PieChart>
//                     <Legend
//                         payload={ptypeData.map((item, index) => ({
//                             id: item.name,
//                             value: item.name,
//                             type: 'square',
//                             color: COLORS[index % COLORS.length]
//                         }))}
//                         layout="horizontal"
//                         align="center"
//                         wrapperStyle={{
//                             paddingTop: '10px',
//                             position: 'relative', // <--- Add this line
//                             textAlign:'center',
//                             width:'auto',
//                             height:'auto'
//                         }}
//                     />
//                 </ResponsiveContainer>
//             </div>

//         </div>
//     )
// }

// export default Piechart

import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57'];

function Piechart({ expenseData }) {
  const [chartSize, setChartSize] = useState({ height: 400, outerRadius: 130, label: true });

  useEffect(() => {
    const handleChartSize = () => {
      const width = window.innerWidth;
      if (width < 510) {
        setChartSize({ height: 150, outerRadius: 50, label: false });
      } else if (width < 650) {
        setChartSize({ height: 200, outerRadius: 70, label: true });
      } else if (width < 850) {
        setChartSize({ height: 380, outerRadius: 100, label: true });
      } else {
        setChartSize({ height: 400, outerRadius: 130, label: true });
      }
    };

    window.addEventListener('resize', handleChartSize);
    handleChartSize();

    return () => {
      window.removeEventListener('resize', handleChartSize);
    };
  }, []);

  const categoryData = expenseData.reduce((acc, item) => {
    const existing = acc.find((d) => d.name === item.category);
    if (existing) {
      existing.value += item.amount;
    } else {
      acc.push({ name: item.category, value: item.amount });
    }
    return acc;
  }, []);

  const ptypeData = expenseData.reduce((acc, item) => {
    const existing = acc.find((d) => d.name === item.ptype);
    if (existing) {
      existing.value += item.amount;
    } else {
      acc.push({ name: item.ptype, value: item.amount });
    }
    return acc;
  }, []);

  return (
    <div className="w-full overflow-x-hidden grid grid-cols-2 gap-6 md:text-[15px] text-[8px]">
      
      {/* Pie Chart - Category wise */}
      <div className="w-full max-w-full overflow-hidden">
        <h2 className="text-center xl:text-[35px] lg:text-[30px] md:text-[25px] sm:text-[20px] text-[14px] text-yellow-500 sm:font-semibold">
          Expenses by Category Type
        </h2>
        <ResponsiveContainer width="100%" height={chartSize.height}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              outerRadius={chartSize.outerRadius}
              dataKey="value"
              label={chartSize.label}
            >
              {categoryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <Legend
          payload={categoryData.map((item, index) => ({
            id: item.name,
            value: item.name,
            type: 'square',
            color: COLORS[index % COLORS.length],
          }))}
          layout="horizontal"
          align="center"
          wrapperStyle={{
            // marginTop: '10px',
            position: 'relative',
            textAlign: 'center',
            lineHeight: '20px',
          }}
        />
      </div>

      {/* Pie Chart - Payment type wise */}
      <div className="w-full max-w-full overflow-hidden">
        <h2 className="text-center xl:text-[35px] lg:text-[30px] md:text-[25px] sm:text-[20px] text-[14px] text-yellow-500 sm:font-semibold">
          Expenses by Payment Type
        </h2>
        <ResponsiveContainer width="100%" height={chartSize.height}>
          <PieChart>
            <Pie
              data={ptypeData}
              cx="50%"
              cy="50%"
              outerRadius={chartSize.outerRadius}
              dataKey="value"
              label={chartSize.label}
            >
              {ptypeData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
            <Legend
              payload={ptypeData.map((item, index) => ({
                id: item.name,
                value: item.name,
                type: 'square',
                color: COLORS[index % COLORS.length],
              }))}
              layout="horizontal"
              align="center"
              wrapperStyle={{
                // marginTop: '10px',
                position: 'relative',
                textAlign: 'center',
              }}
            />
      </div>
    </div>
  );
}

export default Piechart;
