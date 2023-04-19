import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { login } from "../redux-stuff/actions";
import { useDispatch } from "react-redux";
function Login() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const handleLogin = (data) => {
    dispatch(login(data));
    console.log(data);
    reset();
  };
  const handleClearForm = () => {
    reset();
  };
  return (
    <div>
      <div className="bg-slate-800 text-white p-8 mt-8 rounded-md shadow-md w-1/2 mx-auto xs:w-2/3">
        <h2 className="font-bold text-4xl">Login</h2>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="loginForm flex flex-col mt-4"
        >
          <div className="loginFormContainer">
            <label htmlFor="email">Email</label>
            <input
              placeholder="e.g. user@email.com"
              type="email"
              {...register("email", { required: "You must enter an email" })}
            />
            {errors.email && (
              <span className="fieldError">{errors.email.message}</span>
            )}
          </div>

          <div className="loginFormContainer">
            <label>Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <span className="fieldError">{errors.password.message}</span>
            )}
          </div>
          <div className="flex">
            <button
              className="mt-4 mr-2  border-2 w-1/2 cursor-pointer border-green-500 rounded-md hover:bg-green-500 hover:text-white p-2"
              disabled={!isValid}
              type="submit"
            >
              <p className="font-bold">Login</p>
            </button>
            <button
              onClick={handleClearForm}
              className="font-bold mt-4 ml-2 w-1/2 border-2 border-red-500 rounded-md hover:bg-red-500 hover:text-white p-2 text-center"
            >
              <p>Clear</p>
            </button>
          </div>
        </form>
        <Link to="/register">
          <p className="mt-8">
            Don't have an account yet?
            <span className="text-blue-400 font-bold ml-2">Register</span>
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Login;
