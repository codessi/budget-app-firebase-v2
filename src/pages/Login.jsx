import React, { useState } from "react";
import { useLogin } from "./../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex bg-gradient-to-r from-teal-500 to-cyan-500 min-h-screen justify-center items-start  ">
      <form
        action=""
        className="bg-white mt-20 flex flex-col w-96 p-5 rounded-xl space-y-5"
        onSubmit={onSubmit}
      >
        <h2>Login</h2>
        <label htmlFor="">
          <h3>Email:</h3>
          <input
            type="email"
            id="email"
            className="w-full bg-slate-200"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>

        <label htmlFor="">
          <h3>Password:</h3>
          <input
            type="password"
            value={password}
            className="w-full bg-slate-200"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {!isPending && (
          <button
            className="rounded-sm outline outline-teal-600  "
            type="submit"
          >
            Login
          </button>
        )}
        {isPending && (
          <button type="submit" className="outline outline-teal-600 " disabled>
            Loading
          </button>
        )}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
