import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addOccupation } from "../redux-stuff/actions";
function AddOccupation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const handleAddOccupation = (formData) => {
    dispatch(addOccupation(formData, navigate));
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
        className="addOccupationForm flex flex-col mt-4"
      >
        <div className="addOccupationFormContainer">
          <label htmlFor="occupation_name" className="flex">
            Meslek Adı
          </label>
          <input
            type="text"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("occupation_name", { required: "Meslek adı zorunlu" })}
          />
          {errors.occupation_name && (
            <span className="fieldError">{errors.occupation_name.message}</span>
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
