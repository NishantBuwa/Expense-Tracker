import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login({setIsAuthenticated, setUserInfo}) {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await apiCallForPassword(formData.email, formData.password);
        setFormData({   
            email: '',
            password: ''
        })
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const apiCallForPassword = async () => {
        const dataToSend = {
            ...formData,
            email:formData.email.toLowerCase()
        }
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/loginuser`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(dataToSend)
        })
        const data = await res.json()
        if(data.success){
            setIsAuthenticated(true)
            setUserInfo({email:formData.email.toLowerCase(),username:data.username})
            // console.log(`User has logged in with ${formData.email} ${data.username}`);
            navigate('/privateview')
        }
        else {
            alert("invalid credentials")
        }
    }

    return (
        <div className='h-screen bg-black text-white'>
            <div className="p-8">
                <form onSubmit={handleSubmit} className='grid grid-cols-1 sm:w-[400px] w-[280px] mx-auto gap-4'>
                    <div className="flex items-center gap-2">
                        <label htmlFor='email' className='sm:w-40 w-[80px] '>Email: </label>
                        <input type='text'
                            name='email'
                            onChange={handleChange}
                            value={formData.email}
                            placeholder="Demo -> Test@gmail.com"
                            className='flex-1 px-1 py-1 text-black outline-none w-[150px] '
                            required />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor='password' className='sm:w-40 w-[80px]'>Password: </label>
                        <input type='password'
                            name='password'
                            onChange={handleChange}
                            value={formData.password}
                            placeholder="Demo -> Test123"
                            className='flex-1 px-1 py-1 text-black outline-none w-[150px]'

                            required />
                    </div>
                    {/* <div className="flex"> */}
                    <button type='submit' className='bg-green-600 px-4 mx-auto outline-none mt-2 rounded-md'>Login</button>
                    <Link to='/signup' className='text-center'>
                        <button className='bg-blue-600 px-3 outline-none mt-0 rounded-md'>Signup</button>
                    </Link>
                    {/* </div> */}
                </form>
            </div>
        </div>



    )
}

export default Login
