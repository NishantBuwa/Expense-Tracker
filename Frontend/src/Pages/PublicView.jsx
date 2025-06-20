import logo from '../assets/logo.png';
import React from 'react';
import user from '../assets/user.png';
import { Link } from 'react-router-dom';

function publicHome() {
    return (
        <div className='min-h-screen bg-black'>
            <div className=' text-white'>
                <nav className='mx-4 flex justify-between items-center'>
                    <div className=''>
                        <img src={logo} alt="" className='lg:h-[100px] sm:h-[75px] h-[60px] lg:mx-8 sm:mx-6 mx-3' />
                        <h1 className='lg:text-2xl sm:text-xl text-[12px] font-bold text-white'>Expense Tracker</h1>
                    </div>
                    <div className='flex md:gap-10 gap-5'>
                        <Link to='/signup'>
                            <button className='bg-blue-800 md:py-1 md:px-3 sm:px-2 px-1 py-0 text-white rounded-sm sm:text-[15px] text-[10px]'>Signup</button>
                        </Link>
                        <Link to='/login'>
                            <button className='bg-blue-800 md:py-1 md:px-3 sm:px-2 px-1 py-0 text-white rounded-sm sm:text-[15px] text-[10px]' onClick={() => { console.log("clicked") }}>Login</button>
                        </Link>
                    </div>
                </nav>
                <div className='text-left mx-auto xl:w-[700px] md:w-[600px] sm:w-[500px] w-[250px] sm:pl-[50px] md:mt-0 mt-2 '>
                    <h1 className='xl:text-[35px] lg:text-[30px] sm:text-[20px] text-[13px] font-bold text-purple-800'>WELCOME TO OUR EXPENSE TRACKER</h1>
                    <p className='font-bold sm:text-[15px] text-[10px] sm:mt-0 mt-[10px]' >Take control of your money, track your expenses, and stay on budget— all in one place.</p>
                    <h3 className='mt-[20px] text-center font-bold sm:text-[15px] text-[11px]'>Login or Sign up to start tracking your expenses today!</h3>
                    <div className="feature">
                        <p className='md:text-[25px] sm:text-[20px] text-[13px] font-bold text-purple-800 sm:mt-8 mt-4'>Features of our Expense Tracker :</p>
                        <ul className='mt-[10px] text-bold'>
                            <li className='list-disc sm:text-[15px] text-[10px]'>Simple & Fast - Add expenses in seconds</li>
                            <li className='list-disc sm:text-[15px] text-[10px]'>Smart Insights - See where your money goes</li>
                            <li className='list-disc sm:text-[15px] text-[10px]'>Safe & Private - Your data stays yours</li>
                        </ul>
                    </div>
                    <p className='md:text-[25px] sm:text-[20px] text-[13px]  font-bold text-purple-800 mt-8'>Testimonials of Our Users : </p>
                    <div className="testimonial flex gap-10 mt-4 text-black justify-center sm:text-lg text-[9px]">
                        <div className="card border-2 border-white bg-white sm:w-[300px] w-[250px] rounded-2xl ">
                            <img src={user} alt="" className='mx-auto sm:h-[60px] h-[23px]' />
                            <p className=' font-bold text-center'>Alex</p>
                            <p className='text-center text-grey-500'>Los Angeles</p>
                            <p className='m-2'>I've tried multiple expense tracking apps before, but none felt as simple and user-friendly as this one. </p>
                        </div>
                        <div className="card border-2 border-white bg-white sm:w-[300px] w-[250px] rounded-2xl">
                            <img src={user} alt="" className='mx-auto sm:h-[60px] h-[23px]' />
                            <p className=' font-bold text-center'>Bendita</p>
                            <p className='text-center text-grey-500'>Florida</p>
                            <p className='m-2'>As a student managing limited funds, this expense tracker has been a lifesaver.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default publicHome