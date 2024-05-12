import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../api";

function LinkPage() {
  const { username } = useParams();
  const [links, setLinks] = useState([]);

  const getUserLinks = async () => {
    try {
      const response = await axios.get(API_BASE_URL + "/links/" + username);
      setLinks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserLinks();
  }, []);
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="mt-12 flex flex-col items-center justify-center sm:flex-row w-full">
        {links && (
          <div className="bg-white rounded-2xl shadow-xl h-auto gap-2 w-96 px-10 py-10 justify-center bg-white max-w-sm h-9 flex flex-col items-center">
            <img src="/person.svg" height={60} width={60} />
            <div className="text-md font-bold">@{username}</div>
            {links.map((item, index) => (
              <a target="_blank" href={item.link} key={index} className="text-lg font-bold">
                {item.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LinkPage;
