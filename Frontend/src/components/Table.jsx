import React from 'react'

function Table({expenseData}) {
    return (
        <div className='text-white relative'>
            <table className='table-auto mx-[auto] xl:w-[1150px] lg:w-[980px] md:w-[700px] sm:w-[580px] w-[320px] min-[401px]:w-[85%] sm:border-separate border-spacing-1    border border-gray-300 mt-[120px] '>
                <thead>
                    <tr className='bg-gray-200 font-cinzelBlack xL:text-[20px] lg:text-[17px] md:text-[15px] sm:text-[10px] text-[8px]'>
                        <th className='px-0 sm:py-2 md:py-1 py:-0 border border-gray-300 text-black'>Sr. No.</th>
                        <th className='px-0 sm:py-2 md:py-1 py:-0 border border-gray-300 text-black'>Expense Name</th>
                        <th className='px-0 sm:py-2 md:py-1 py:-0 border border-gray-300 text-black'>Amount Spent</th>
                        <th className='px-0 sm:py-2 md:py-1 py:-0 border border-gray-300 text-black'>Category</th>
                        <th className='px-0 sm:py-2 md:py-1 py:-0 border border-gray-300 text-black'>Payment Mode</th>
                        <th className='px-0 sm:py-2 md:py-1 py:-0 border border-gray-300 text-black'>Date</th>
                    </tr>
                </thead>

                <tbody className='font-cinzelBlack text-center md:text-[15px] sm:text-[12px] text-[7px] '>
                    {expenseData.map((item, index) => (
                        <tr key={index}
                            className='hover:bg-white hover:text-black'
                        >
                            <td className='md:px-4 px-0 md:py-1 py:0 border border-gray-300 '>{index + 1}</td>
                            <td className='md:px-4 px-0 md:py-1 py:0 border border-gray-300 '>{item.expenseName}</td>
                            <td className='md:px-4 px-0 md:py-1 py:0 border border-gray-300 '>{item.amount}</td>
                            <td className='md:px-4 px-0 md:py-1 py:0 border border-gray-300 '>{item.category}</td>
                            <td className='md:px-4 px-0 md:py-1 py:0 border border-gray-300 '>{item.ptype}</td>
                            <td className='md:px-4 px-0 md:py-1 py:0 border border-gray-300 '>{item.date?.split('T')[0].split('-').reverse().join('-')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
