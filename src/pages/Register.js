import React, { useContext } from "react";
import AuthContext from "../utils/AuthContext";

const Register = () => {
    let {registerUser} = useContext(AuthContext)
  return (
    <div>
      <form className="flex flex-col mx-auto items-center justify-center"
      onSubmit={registerUser}
      >
        <h1 className="text-3xl my-5">Register</h1>
        <input
          placeholder="Username..."
          type="text"
          name="username"
          className="rounded border p-2 my-2 bg-transparent"
        />
        <input
          placeholder="Email..."
          type="email"
          name="email"
          className="rounded border p-2 my-2 bg-transparent"
        />
        <input
          placeholder="Password..."
          type="password"
          name="password"
          className="rounded border p-2 my-2 bg-transparent"
        />
        <input
          placeholder="Confirm Password..."
          type="password"
          name="confirmpassword"
          className="rounded border p-2 my-2 bg-transparent"
        />
        <button
          type="submit"
          className="bg-[#00C897] rounded p-2 mx-auto block my-2 btn-hover" 
        >
          Register
        </button>
        <h3>Already a member? <Link to="/login" className="text-[#00C897] underline">Login</Link></h3>
      </form>
    </div>
  );
};

export default Register;
