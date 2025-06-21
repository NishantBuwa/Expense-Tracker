import React, { useState, useEffect, useCallback } from 'react'
import logo from '../assets/logo.png'
import Card from '../components/Card'
import Table from '../components/Table'
import Piechart from '../components/Pie-chart'
// import dummydata from '../assets/data.json'
import Barchart from '../components/Bar-chart'
import { Navigate } from 'react-router-dom'

const today = new Date();
const defaultMonthYear = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;


function PrivateView({ isAuthenticated, userInfo, setIsAuthenticated, setUserInfo }) {

    const btnClass = 'bg-blue-800 md:py-1 md:px-3 sm:px-2 px-1 py-[2px] text-white rounded-sm sm:text-[15px] text-[8px]'
    const headingClass = 'text-center xl:text-[35px] lg:text-[30px] md:text-[25px] sm:text-[20px] text-[16px] font-bold text-purple-800'

    const [inputDisable, setInputDisable] = useState('');
    const [isData, setIsData] = useState(false)
    const [expenseData, setExpenseData] = useState([])
    const [cardData, setCardData] = useState([])
    const [dataOfMonth,setDataOfMonth] = useState([])
    const [formData, setFormData] = useState({
        date: '',
        income: '',
        expenseName: '',
        category: 'Food',
        amount: '',
        ptype: 'Card',
        email: ''
    });
    const [selectedMonthYear, setSelectedMonthYear] = useState(defaultMonthYear)

    const GetExpense = useCallback(async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/getexpense`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( {email: userInfo.email})
            });
            const data = await res.json();
            if (data) {
                // console.log("Data Recieved: ", data)
                setExpenseData(data)
            }
            if (data.length>0){
                setIsData(true);
            }
            const content = document.getElementsByClassName('content')[0];
            const addButton = document.getElementsByClassName('addButton')[0];

            if (!data || data.length === 0) {
                content.classList.remove('hidden');
                addButton.classList.add('hidden');
            } else {
                content.classList.add('hidden');
                addButton.classList.remove('hidden');
            }
        } catch (err) {
            console.error("Error fetching user data", err);
        }
    },[userInfo.email])


    useEffect(() => {
        if (isAuthenticated && userInfo) {
            GetExpense();
        }
    }, [isAuthenticated, userInfo, GetExpense]);


    useEffect(() => {
        if (expenseData.length > 0 && selectedMonthYear) {
            const cardStats = generateCardData(expenseData, selectedMonthYear);
            // console.log("Card Stats: ", cardStats)
            setCardData(cardStats);
            // console.log("expense data: ", expenseData)
        }
    }, [expenseData, selectedMonthYear]);

    useEffect(()=>{
        if(dataOfMonth.length===0){
            // console.log(dataOfMonth)
            // console.log("Data not availeble")
            setIsData(false)
        }
        else{
            setIsData(true)
        }
    },[selectedMonthYear, dataOfMonth.length])


    if (!isAuthenticated) {
        return <Navigate to="/" />
    }


    const handleLogout=()=>{
        setUserInfo({});
        setIsAuthenticated(false)
    }




    const generateCardData = (data, selectedMonthYear) => {
        if (!selectedMonthYear) return [];

        const [year, month] = selectedMonthYear.split('-');

        const filtered = data.filter(item => {
            if (item.date) {
                const dateObj = new Date(item.date);
                const itemMonth = String(dateObj.getMonth() + 1).padStart(2, '0');
                const itemYear = String(dateObj.getFullYear());
                return itemMonth === month && itemYear === year;
            }
            return false;
        });

        setDataOfMonth(filtered)
        if (filtered.length === 0) return [];
        // console.log("Filtered Data for card generation: ", filtered)
        const totalIncome = Number(filtered[0]?.salary);
        const totalExpense = filtered.reduce((sum, item) => sum + Number(item.amount), 0);
        const totalSaving = totalIncome - totalExpense;

        const categoryMap = {};
        const paymentMap = {};

        filtered.forEach(item => {
            categoryMap[item.category] = (categoryMap[item.category] || 0) + Number(item.amount);
            paymentMap[item.ptype] = (paymentMap[item.ptype] || 0) + 1;
        });

        const highestCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
        const mostUsedPayment = Object.entries(paymentMap).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

        return [
            { title: 'Total Income', value: totalIncome },
            { title: 'Total Expense', value: totalExpense },
            { title: 'Total Saving', value: totalSaving },
            { title: 'Highest Category Spent', value: highestCategory },
            { title: 'Most Used Payment Method', value: mostUsedPayment }
        ];
    };


    const ExpenseForm = () => {
        const expenseForm = document.getElementsByClassName('expense-form')[0];
        if (expenseForm.classList.contains("hidden")) {
            expenseForm.classList.remove("hidden");
        }
    }

    const handleOnChange = async (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })

        if (e.target.name === 'date') {
            const selectedDate = e.target.value
            const month = new Date(selectedDate).getMonth() + 1;
            const year = new Date(selectedDate).getFullYear();
            const dataToSend = {
                month: month,
                year: year,
                email: userInfo.email
            }
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/checksalary`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                })
                const data = await res.json()
                if (data.exists) {
                    setFormData(prev => ({
                        ...prev,
                        income: data.salary
                    }))
                    setInputDisable(true)
                }
            }
            catch (e) {
                console.error("Error occured on retrieving income info ", e);
            }
        }
    }

    const handleFormSubmit = async (e) => {
        const expenseForm = document.getElementsByClassName('expense-form')[0];
        const content = document.getElementsByClassName('content')[0];
        const addButton = document.getElementsByClassName('addButton')[0];
        expenseForm.classList.add("hidden");
        content.classList.add("hidden");
        addButton.classList.remove('hidden');
        e.preventDefault();
        // console.log(formData);

        const dataToSend = {
            ...formData,
            email: userInfo.email
        }

        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/AddExpense`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            })
            const data = await res.json()
            if (data.success) {
                // console.log(data)
                GetExpense()
            }
        }
        catch (error) {
            // console.log("Error in Submitting the form ", error)
        }

        setFormData({
            date: '',
            income: '',
            expenseName: '',
            category: 'Food',
            amount: '',
            ptype: 'Card',
            email: ''
        })
        // console.log(userInfo)
    }



    return (
        <div className='text-white min-h-screen bg-black'>
            <nav className='mx-4 flex justify-between items-center'>
                <div className=''>
                    <img src={logo} alt="" className='lg:h-[100px] sm:h-[75px] h-[60px] lg:mx-8 sm:mx-6 mx-3' />
                    <h1 className='lg:text-2xl sm:text-xl text-[12px] font-bold text-white'>Expense Tracker</h1>
                </div>
                <div className='flex gap-5 min-[460px]:gap-10'>
                    <button className={`addButton ${btnClass}`} onClick={() => ExpenseForm()}>Add Expense</button>
                    <p className={`${btnClass}`}>Hi, {userInfo.username}</p>
                    <button className={`addButton ${btnClass} bg-red-600`} onClick={handleLogout}>Logout</button>
                </div>
            </nav>
            <div className="content text-center hidden">
                <h1 className='xl:text-[35px] lg:text-[30px] sm:text-[20px] text-[13px] font-bold text-purple-800' >No Expenses To Show</h1>
                <button className='bg-white md:py-1 md:px-3 sm:px-2 px-1 py-0 text-black rounded-2xl sm:text-[20px] text-[10px] mt-[10px]' onClick={() => ExpenseForm()}>Add New Expense ➡️</button>
            </div>
            <div className="expense-form mt-[20px] md:w-[600px] w-[250px] h-auto mx-auto hidden ">
                <form action="POST" onSubmit={(e) => { handleFormSubmit(e) }} className='form gap-2 absolute bg-blue-700 md:w-[600px] w-[250px] p-4 shadow-2xl text-black md:text-[18px] text-[13px]'>
                    <span className='absolute right-[15px] top-[10px]' 
                    onClick={()=>{document.getElementsByClassName('expense-form')[0].classList.add('hidden')
                    setFormData({
                        date: '',
                        income: '',
                        expenseName: '',
                        category: 'Food',
                        amount: '',
                        ptype: 'Card',
                        email: ''
                        })
                    }}
                    >❌</span>
                    <div className="Date flex flex-col mt-5">
                        <label htmlFor="date">Expense Date: </label>
                        <input type="date"
                            name="date"
                            min="2025-01-01"
                            value={formData.date}
                            onChange={handleOnChange}
                            className='text-black mt-[3px]'
                            required
                        />
                    </div>

                    <div className="Income flex flex-col md:mt-3 mt-1">
                        <label htmlFor="income">Monthly Income: </label>
                        <input type="number"
                            name="income"
                            value={formData.income}
                            onChange={handleOnChange}
                            className='text-black'
                            required
                            disabled={inputDisable}
                        />
                    </div>

                    <div className="Name flex flex-col md:mt-3 mt-1">
                        <label htmlFor="expenseName">Expense Name: </label>
                        <input type="text"
                            name="expenseName"
                            value={formData.expenseName}
                            onChange={handleOnChange}
                            className='text-black'
                            required
                        />
                    </div>

                    <div className="Category flex flex-col md:mt-3 mt-1">
                        <label htmlFor="category">Expense Category: </label>
                        <select className='text-black' name='category' value={formData.category} onChange={handleOnChange} required>
                            <option value="Food" >Food & Groceries</option>
                            <option value="Travel">Transport & Travel</option>
                            <option value="Health">Health & Medical</option>
                            <option value="Education">Education</option>
                            <option value="Miscellaneous">Miscellaneous</option>
                        </select>
                    </div>

                    <div className="Amount flex flex-col md:mt-3 mt-1">
                        <label htmlFor="amount">Expense Amount: </label>
                        <input type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleOnChange}
                            className='text-black'
                            required
                        />
                    </div>

                    <div className="payment-type flex flex-col md:mt-3 mt-1">
                        <label htmlFor="ptype">Payment Type: </label>
                        <select className='text-black' name='ptype' value={formData.ptype} onChange={handleOnChange} required>
                            <option value="Card">Card</option>
                            <option value="UPI">UPI</option>
                            <option value="Cash">Cash</option>
                        </select>
                    </div>
                    <button className='bg-green-600 md:py-1 md:px-3 sm:px-2 px-0 py-[2px] text-white rounded-lg sm:text-[15px] text-[12px] w-[70px] mx-auto md:mt-5 mt-4 mb-[-4px] flex justify-center' type="submit">Submit</button>
                </form>
            </div>
            {isData === true ? (
                <>
                    <h1 className={`${headingClass} md:mt-8 mt-5'`} >EXPENSE HIGHLIGHTS</h1>
                    <div className="lg:max-w-[1000px] mx-auto sm:max-w-[600px] w-[320px] min-[401px]:w-[85%] ">
                        <input
                        type="month"
                        value={selectedMonthYear}
                        onChange={(e) => setSelectedMonthYear(e.target.value)}
                        className="text-white bg-purple-600 sm:px-3 px-1 sm:mt-0 mt-3 outline-none float-right m-0 lg:w-[220px] sm:w-[110px] w-[90px] lg:text-[20px] sm:text-[13px] text-[10px]"
                    />
                    </div>
                    <Card
                        data={cardData}
                    />
                    <h1 className={`${headingClass} mt-14 mb-[-80px]`}>MY EXPENSES</h1>
                    <Table expenseData={dataOfMonth} />
                    <h1 className={`${headingClass} md:mt-16 mt-10 md:mb-10 mb-8`}>DASHBOARD</h1>
                    <Piechart expenseData={dataOfMonth} />
                    {/* {() => { console.log(expenseData) }} */}
                    <div className="mt-16"></div>
                    <Barchart expenseData={dataOfMonth} />
                </>
            ) : 
            (<>
                <p className={`${headingClass}`}>Data not available</p>
            </>)}
        </div>
    )
}

export default PrivateView