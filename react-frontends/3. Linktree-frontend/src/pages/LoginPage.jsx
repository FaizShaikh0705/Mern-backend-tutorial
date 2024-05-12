import React,{useContext, useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../api';
import axios from 'axios'

function LoginPage() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);

    const [email, setEmail] =useState("");
    const [password, setPassword] =useState("");

    const savedData = localStorage.getItem('userData')
    const userData = savedData && JSON.parse(savedData) || null;

    const onLogin = async () => {
        try {
            const response = await axios.post(API_BASE_URL+'/users/auth',{email, password})
            
            localStorage.setItem('userData', JSON.stringify(response.data.data))
            navigate("/dashboard")
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        if(userData){
            navigate("/dashboard", {
                replace: true
            })
        }
    },[])

  return (
    <div className="flex flex-col items-center min-h-screen">
            <div className="w-full max-w-xs mt-10">
                <form className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4">
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />

                    </div>
                    <div className="flex flex-col gap-5 justify-between">
                        <button
                            disabled={loading && (email.length<1 || password.length<1)}
                            onClick={onLogin}
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Sign In
                        </button>
                        <div className="text-gray-700">
                            New User? <Link className="text-blue-500 underline" to={"/signup"}>Signup</Link>
                        </div>

                    </div>

                    
                </form>
                
            </div>
        </div>
  )
}

export default LoginPage