import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {

  const [username, setUsername] = useState();

  const navigate = useNavigate();

  const savedData = localStorage.getItem('userData')
  const userData = savedData && JSON.parse(savedData) || null;

  useEffect(()=>{
    if(userData){
      navigate("/dashboard",{replace:true})
    }
  },[userData])

  return (
    <main>
      <div>
        <div className="text-yellow-300 mb-10">
          <h1 className="text-5xl text-bold font-bold sm:w-1/3">
            Everything you are. In one, simple link in bio.
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row sm:w-1/3">
          <div className="flex items-center text-gray-500 px-2 py-5 bg-white rounded-xl m-1 w-full">
            linktree/
            <input
              className="w-1/2 text-black focus:outline-none"
              placeholder="yourname"
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
            />
          </div>
          <button onClick={()=>{
            navigate(username? `/signup?username=${username}` :'/signup')
          }} className="text-black rounded-full px-7 py-5 m-1 w-full bg-pink-300">
            Claim your linktree
          </button>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
