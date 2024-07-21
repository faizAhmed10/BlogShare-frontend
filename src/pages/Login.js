import React, { useContext } from 'react';
import AuthContext from '../utils/AuthContext';
import {Link} from "react-router-dom"
const Login = () => {

    let {loginUser} = useContext(AuthContext)
    return (
        <div className="">
      <form className="flex flex-col mx-auto items-center justify-center" onSubmit={loginUser}>
        <h1 className="text-3xl my-5">Login</h1>
        <input
          placeholder="Username"
          type='text'
          name="username"
          className="rounded border p-2 my-2 bg-transparent"
          
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          className="rounded border p-2 my-2 bg-transparent"
        />
        <button type="submit" className="btn-hover bg-[#00C897] rounded p-2 mx-auto block my-2">Login</button>
        <h3>Not a member? <Link to="/register" className="text-[#00C897] underline">Register</Link></h3>
      </form>
    </div>
    )
}

export default Login;