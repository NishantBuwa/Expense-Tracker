import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';

function Signup({setUserInfo, setIsAuthenticated}) {

    const [formData, setFormData] = useState({ name: '', email: '', username: '', age: '', password: '', c_password: '' });

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.c_password) {
            alert('Password Does Not Match')
        }
        else {
            try{
                const dataToSend = {
                    ...formData,
                    email:formData.email.toLowerCase()
                }
                const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/createuser`, {
                    method:'POST',
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(dataToSend)
                })
                // if(res.status === 409){
                //     alert('User Exits with this email')
                //     return;
                // }
                const data = await res.json();
                if(data.message === "User Exists"){
                    alert('Email id already exists')
                    formData({
                        name: '', email: '', username: '', age: '', password: '', c_password: '' 
                    })
                    return ;
                }
                if(data.success) {
                    setUserInfo({email:formData.email.toLowerCase(),username:formData.username})
                    setIsAuthenticated(true)
                    navigate('/privateview')
                    // console.log("User signed up successfully")
                }
            }
            catch(error){
                // console.log("Error in api call (Sign up) ", error)
            }
        }
        // console.log(formData)
        setFormData({ name: '', age: '', password: '', c_password: '', email:'', username:'' })
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='h-screen bg-black text-white'>
            <div className="p-8">
                <form onSubmit={handleSubmit} className='grid grid-cols-1 sm:w-[400px] w-[280px]  mx-auto gap-4'>
                    <div className="flex items-center gap-2">
                        <label htmlFor='name' className='sm:w-40 w-[80px] '>Name: </label>
                        <input type='text'
                            name='name'
                            onChange={handleChange}
                            value={formData.name}
                            className='flex-1 px-2 py-1 text-black outline-none w-[150px]'

                            required />
                    </div>
                    <div className="flex items-center gap-2 sm:mt-0 mt-2">
                        <label htmlFor='email' className='sm:w-40 w-[80px] '>Email: </label>
                        <input type='text'
                            name='email'
                            onChange={handleChange}
                            value={formData.email}
                            className='flex-1 px-2 py-1 text-black outline-none w-[150px]'

                            required />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor='username' className='sm:w-40 w-[80px] '>User-Name: </label>
                        <input type='text'
                            name='username'
                            onChange={handleChange}
                            value={formData.username}
                            className='flex-1 px-2 py-1 text-black outline-none w-[150px]'

                            required />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor='age' className='sm:w-40 w-[80px] '>Age: </label>
                        <input type='number'
                            name='age'
                            onChange={handleChange}
                            value={formData.age}
                            className='flex-1 px-2 py-1 text-black outline-none w-[150px]'

                            required />
                    </div>
                    <div className="flex items-center gap-2 sm:mt-0 mt-2">
                        <label htmlFor='password' className='sm:w-40 w-[80px] '>Password: </label>
                        <input type='password'
                            name='password'
                            onChange={handleChange}
                            value={formData.password}
                            className='flex-1 px-2 py-1 text-black outline-none w-[150px]'

                            required />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor='c_password' className='sm:w-40 w-[80px] '>Confirm Password: </label>
                        <input type='password'
                            name='c_password'
                            onChange={handleChange}
                            value={formData.c_password}
                            className='flex-1 px-2 py-1 text-black outline-none w-[150px]'

                            required />
                    </div>
                    {/* <div className="flex"> */}
                    <button type='submit' className='bg-green-600 mx-auto py-1 rounded-md outline-none sm:mt-10 mt-3 w-[90px]'>Signup</button>
                    {/* </div> */}
                    <Link to='/login' className='text-center'>
                        <button className='bg-blue-600 mx-auto py-1 rounded-md outline-none w-[90px]'>Login</button>
                    </Link>
                </form>
            </div>
        </div>



    )
}

export default Signup
