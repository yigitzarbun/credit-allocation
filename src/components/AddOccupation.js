import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
function AddOccupation() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const handleAddOccupation = () => {
    navigate("/");
    reset();
  };

  return (
    <div className=" p-8 mt-8 rounded-md shadow-md w-1/3 mx-auto xs:w-2/3">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">Meslek Ekle</h2>
        <Link to="/">
          <img src="/images/cancel.png" alt="cancel" className="h-4 w-4" />
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(handleAddOccupation)}
        className="addOccupationrForm flex flex-col mt-4"
      >
        <div className="addOccupationrFormContainer">
          <label htmlFor="name" className="flex">
            Meslek Adı
          </label>
          <input
            type="text"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("text", { required: "Meslek adı zorunlu" })}
          />
          {errors.name && (
            <span className="fieldError">{errors.name.message}</span>
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

export default AddOccupation;
