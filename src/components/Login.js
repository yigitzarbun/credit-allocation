import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux-stuff/actions";
import { useDispatch } from "react-redux";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const handleLogin = (data) => {
    dispatch(login(data, navigate));
    reset();
  };
  const handleClearForm = () => {
    reset();
  };
  return (
    <div>
      <div className="formContainer ">
        <h2 className="font-bold text-4xl">Giriş</h2>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="loginForm flex flex-col mt-4"
        >
          <div className="loginFormContainer">
            <label htmlFor="email" className="flex">
              Email
            </label>
            <input
              placeholder="e.g. user@email.com"
              className="rounded-md w-full p-2 text-black"
              type="email"
              {...register("email", { required: "Email gereklidir" })}
            />
            {errors.email && (
              <span className="fieldError">{errors.email.message}</span>
            )}
          </div>

          <div className="loginFormContainer mt-4">
            <label className="flex">Şifre</label>
            <input
              type="password"
              className="rounded-md w-full p-2 text-black"
              {...register("password", {
                required: "Şifre gereklidir",
              })}
            />
            {errors.password && (
              <span className="fieldError">{errors.password.message}</span>
            )}
          </div>
          <div className="flex">
            <button
              className="positiveButton"
              disabled={!isValid}
              type="submit"
            >
              <p className="font-bold">Giriş</p>
            </button>
            <button onClick={handleClearForm} className="negativeButton">
              <p>Vazgeç</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
