import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../api";

function Dashboard() {
  const [links, setLinks] = useState([]);

  const navigate = useNavigate();

  const savedData = localStorage.getItem("userData");
  const userData = (savedData && JSON.parse(savedData)) || null;

  const getUserLinks = async () => {
    try {
      const response = await axios.get(
        API_BASE_URL + "/links/" + userData.username
      );
      setLinks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLink=async (linkId)=>{
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userData.token}`,
        },
      };

      const response = await axios.delete(API_BASE_URL+`/links/${linkId}`, config);
      getUserLinks()
    } catch (error) {
      console.log(error);
    }
  }

  const createLink = async (title, link)=>{
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userData.token}`,
        },
      };
      const response = await axios.post({data:[{title, link}]},config)

      getUserLinks()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!userData) {
      navigate("/login", { replace: true });
    } else {
      getUserLinks();
    }
  }, []);

  const frontendUrl = API_BASE_URL

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="mt-12">
        <div className="bg-white shadow-xl rounded-2xl px-10 py-10">

        <div className="flex gap-2 rounded-md m-1 py-3 px-3 border-2 border-solid border-gray-300">
          <div className="font-semibold">Your Linktree:</div> <input readOnly value={frontendUrl+userData.username} />
        </div>

          {links.length < 5 && (
            <button onClick={()=>{
              setLinks([...links, {title:"", link:""}])
            }} className="mt-1 text-white bg-black px-7 py-5 rounded-full">
              Add Link
            </button>
          )}

          {links.length >= 1 &&
            links.map((item, index) => (
              <div className="flex gap-2 justify-between mt-5" key={index}>
                <div className="px-5 py-5 rounded-md border-solid border-2 border-gray-400">
                  <div className="flex gap-2 rounded-md m-1 py-3 px-3 border-2 border-solid border-gray-300">
                    <div className="font-semibold">Title:</div> <input defaultValue={item.title} />
                  </div>

                  <div className="flex gap-2 rounded-md m-1 py-3 px-3 border-2 border-solid border-gray-300">
                    <div className="font-semibold">Link:</div> <input defaultValue={item.link} />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                <button onClick={()=>{
                  if(item._id){
                    deleteLink(item._id)
                  } else {
                    setLinks(links.filter((_,i)=> i!==index))
                  }
                }} className={`h-10 rounded-md px-3 font-semibold ${item._id? 'bg-red-400': 'bg-yellow-400'}`}>
                  {item._id ? 'Delete': 'Remove'}
                </button>
                <button onClick={()=>{
                  if(item._id){
                    createLink(links[index]['link'])
                  } else {
                    //setLinks(links.filter((_,i)=> i!==index))
                  }
                }} className={`h-10 rounded-md px-3 font-semibold ${item._id? 'bg-blue-400': 'bg-green-400'}`}>
                  {item._id ? 'Update': 'Save'}
                </button>
                </div>
              </div>
            ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
