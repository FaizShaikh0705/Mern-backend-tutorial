import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../api'
import { ToastContainer, toast } from 'react-toastify'

function SignupPage() {
    const [buttonDisabled, setButtonDisabled] = React.useState(false)

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })

    const onSignup = async () => {
        if(user.username.includes(" ")){
            toast("Username with space not valid!",{
                type:'warning'
            })
            return;
        }
        try {
            setLoading(true);

            const response = await axios.post(API_BASE_URL+"/",user)
            console.log("Signup success", response.data);
            
            //router.push("/login")
            
        } catch (error) {
            console.log("client",error);
        } finally {
            setLoading(false)
        }
    }

    const [loading, setLoading] = React.useState(false)

    const savedData = localStorage.getItem('userData')
    const userData = savedData && JSON.parse(savedData) || null;

    const navigate = useNavigate();
    
    useEffect(()=>{
        if(userData){
            navigate("/dashboard", {
                replace: true
            })
        }
    }, [])

    return (
        <div className="flex flex-col items-center min-h-screen">
            <ToastContainer />
            <div className="w-full max-w-xs mt-10">
                <form className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="Password"
                        />

                    </div>
                    <div className="flex gap-5 flex-col justify-between">
                        <button
                            disabled={user.email.length<1 || user.password.length<1|| user.username.length<1}
                            onClick={onSignup}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Sign Up
                        </button>
                        <div className="text-gray-700">
                            Existing User? <Link className="text-blue-500 underline" to={"/login"}>Signin</Link>
                        </div>

                    </div>
                </form>
                
            </div>
        </div>
    );
}

export default SignupPage