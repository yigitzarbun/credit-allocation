import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
function AddEmployee() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const handleAddEmployee = () => {
    navigate("/employees");
    reset();
  };

  return (
    <div className=" p-8 mt-8 rounded-md shadow-md w-1/3 mx-auto xs:w-2/3">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">Çalışan Ekle</h2>
        <Link to="/employees">
          <img src="/images/cancel.png" alt="cancel" className="h-4 w-4" />
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(handleAddEmployee)}
        className="addEmployeeForm flex flex-col mt-4"
      >
        <div className="addEmployeeFormContainer">
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
        <div className="addEmployeeFormContainer">
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
        <div className="addEmployeeFormContainer">
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
        <button
          className="mt-4 mx-auto border-2 w-1/2 cursor-pointer border-[#D09600] rounded-md hover:bg-[#D09600] hover:text-white p-2"
          disabled={!isValid}
          type="submit"
        >
          <p className="font-bold">Ekle</p>
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
