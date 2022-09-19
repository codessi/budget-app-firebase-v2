import { useLogout } from "../hooks/useLogout";
import React from "react";
import { Link, NavLink } from "react-router-dom";
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

        <div className="flex gap-1 text-gray-800">
          {!user && (
            <>
              <li >
                <NavLink className="hover:outline hover:outline-teal-700 rounded-lg p-1 px-4" activeClassName=" outline outline-teal-700 rounded-lg p-px px-3" to="/login">Login</NavLink>
              </li>
              <li >
                <NavLink className="hover:outline hover:outline-teal-700 rounded-lg p-1 px-4" activeClassName=" outline outline-teal-700 rounded-lg p-px px-3" to="/signup">Signup</NavLink>
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
