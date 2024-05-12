import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const location = useLocation();

  const savedData = localStorage.getItem('userData')
  const userData = savedData && JSON.parse(savedData) || null;

  const logout=()=>{
    localStorage.removeItem('userData')
    navigate('/login')
  }

  return (
    <div className="flex justify-between items-center bg-white w-full p-3 rounded-full">
      <div className="sm:ml-5">
        <Link className="flex items-center gap-5" to={"/"}>
          <img src="/logo.svg" width={"50px"} alt="logo" />
          <div className="hidden sm:block text-2xl font-bold">
          Linktree
            </div>
        </Link>
      </div>
      {!["/login", "/signup"].includes(location.pathname) && <div className="gap-5 flex mx-5">
        {userData && (
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="bg-gray-300 text-black px-7 py-5 rounded-lg hover:bg-gray-400"
          >
            Logout
          </button>
        )}
        {!userData && (
          <>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="bg-gray-300 text-black px-7 py-5 rounded-lg hover:bg-gray-400"
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className="text-white bg-black px-7 py-5 rounded-full"
            >
              Sign up
            </button>
          </>
        )}
      </div>}
    </div>
  );
}

export default Header;
