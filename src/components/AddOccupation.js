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
    <div className=" formContainer">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">Meslek Ekle</h2>
        <Link to="/occupations">
          <img src="/images/cancel.png" alt="cancel" className="h-4 w-4" />
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(handleAddOccupation)}
        className=" flex flex-col mt-4"
      >
        <div>
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
        <div>
          <label htmlFor="occupation_score" className="flex">
            Meslek Skoru
          </label>
          <input
            type="number"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("occupation_score", {
              required: "Meslek skoru zorunlu",
              max: { value: 100, message: "Max 100" },
              min: { value: 0, message: "Min 0" },
            })}
          />
          {errors.occupation_score && (
            <span className="fieldError">
              {errors.occupation_score.message}
            </span>
          )}
        </div>
        <button className="positiveButton" disabled={!isValid} type="submit">
          <p className="font-bold">Ekle</p>
        </button>
      </form>
    </div>
  );
}

export default AddOccupation;
