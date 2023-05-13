import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { addUser } from "../redux-stuff/actions";
import { useDispatch } from "react-redux";

function AddEmployee() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const handleAddEmployee = (data) => {
    dispatch(addUser(data, navigate));
    reset();
  };

  return (
    <div className="formContainer">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">Çalışan Ekle</h2>
        <Link to="/employees">
          <img src="/images/cancel.png" alt="cancel" className="h-4 w-4" />
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(handleAddEmployee)}
        className=" flex flex-col mt-4"
      >
        <div>
          <label htmlFor="email" className="flex">
            Email
          </label>
          <input
            type="email"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("email", { required: "Çalışan email zorunlu" })}
          />
          {errors.email && (
            <span className="fieldError">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="fname" className="flex">
            İsim
          </label>
          <input
            type="text"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("fname", { required: "Çalışan adı zorunlu" })}
          />
          {errors.fname && (
            <span className="fieldError">{errors.fname.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="lname" className="flex">
            Soyisim
          </label>
          <input
            type="text"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("lname", { required: "Çalışan soyadı zorunlu" })}
          />
          {errors.lname && (
            <span className="fieldError">{errors.lname.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="role_name" className="flex">
            Rol
          </label>
          <select
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("role_name", { required: "Çalışan rolü zorunlu" })}
          >
            <option value="">-- Rol seçin -- </option>
            <option value="analyst">Analyst</option>
            <option value="admin">Admin</option>
            {errors.role_name && (
              <span className="fieldError">{errors.role_name.message}</span>
            )}
          </select>
        </div>
        <div>
          <label htmlFor="password" className="flex">
            Password
          </label>
          <input
            type="password"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("password", { required: "Çalışan şifre zorunlu" })}
          />
          {errors.password && (
            <span className="fieldError">{errors.password.message}</span>
          )}
        </div>
        <button className="positiveButton" disabled={!isValid} type="submit">
          <p className="font-bold">Ekle</p>
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;

/*
 <div>
          <label htmlFor="fname" className="flex">
            İsim
          </label>
          <input
            type="text"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("fname", { required: "Çalışan adı zorunlu" })}
          />
          {errors.fname && (
            <span className="fieldError">{errors.fname.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="lname" className="flex">
            Soyisim
          </label>
          <input
            type="text"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("lname", { required: "Çalışan soyadı zorunlu" })}
          />
          {errors.lname && (
            <span className="fieldError">{errors.lname.message}</span>
          )}
        </div>
        */
