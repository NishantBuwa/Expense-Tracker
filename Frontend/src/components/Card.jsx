import React from 'react'

function Card(props) {
    return (
        <div>
            <div className="card card-div my-[40px] grid grid-cols-3 md:gap-10 bg-slate-200 lg:max-w-[1000px] mx-auto md:p-[30px] sm:max-w-[600px] w-[320px] min-[401px]:w-[85%] lg:text-[20px] 
                sm:text-[12px] text-[8px] p-[20px] sm:gap-4 gap-2 md:rounded-xl rounded-lg text-black font-custom1">
                {
                    props.data.map((item, index) => (
                        <div key={index}
                            className={`h-[63px] sm:h-[110px] lg:h-[170px] rounded-xl shadow-xl sm:text-[12px] text-[7px]
                                     {index === 0 ? 'bg-green-600' : index == 1 ? 'bg-red-700' : index ==2 ? 'bg-cyan-400' : 'bg-white'}
                        `}>
                            <h1 className='font-semibold p-[8px] sm:p-[15px]'>{item.title}</h1>
                            <p className={`font-semibold p-[8px] sm:px-[15px] py-[0px]
                                ${index === 0 ? 'text-green-600' : index == 1 ? 'text-red-700' : index ==2 ? 'text-blue-500' : 'text-yellow-600'}`
                            }>{typeof (item.value) == "number" ? '₹' : ''} {item.value}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Card
