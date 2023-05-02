import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { addSector } from "../redux-stuff/actions";
import { useDispatch } from "react-redux";
function AddSector() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const handleAddSector = (data) => {
    dispatch(addSector(data, navigate));
    reset();
  };

  return (
    <div className="formContainer">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">Sektör Ekle</h2>
        <Link to="/sectors">
          <img src="/images/cancel.png" alt="cancel" className="h-4 w-4" />
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(handleAddSector)}
        className="flex flex-col mt-4"
      >
        <div>
          <label htmlFor="sector_name" className="flex">
            Sektör Adı
          </label>
          <input
            type="text"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("sector_name", { required: "Sektör adı zorunlu" })}
          />
          {errors.sector_name && (
            <span className="fieldError">{errors.sector_name.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="sector_score" className="flex">
            Sektör Skoru
          </label>
          <input
            type="number"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("sector_score", { required: "Sektör skoru zorunlu" })}
          />
          {errors.sector_score && (
            <span className="fieldError">{errors.sector_score.message}</span>
          )}
        </div>
        <button className="positiveButton" disabled={!isValid} type="submit">
          <p className="font-bold">Ekle</p>
        </button>
      </form>
    </div>
  );
}

export default AddSector;
