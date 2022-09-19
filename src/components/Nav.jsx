import { useLogout } from "../hooks/useLogout";
import React from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import tree from "./../assets/tree-svgrepo-com.png";

const Nav = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav>
      <ul className="bg-white flex justify-between p-3 px-16">
    
          <Link className="flex gap-2" to="/">
            <img className="h-6" src={tree} alt="" />
            <li className="text-xl font-semibold text-gray-600">Budget</li>
          </Link>

        <div className="flex gap-5 text-gray-800">
          {!user && (
            <>
              <li className="outline outline-teal-700 rounded-lg p-px px-3 hover:outline-yellow-500">
                <Link to="/login">Login</Link>
              </li>
              <li className=" bg-pink-200 focus:outline-yellow-500 outline-1">
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
          {user && (
            <>
              <p>Hello, &nbsp;{user.displayName} </p>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Nav;
