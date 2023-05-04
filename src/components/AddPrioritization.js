import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  addPrioritization,
  getSectors,
  getOccupations,
} from "../redux-stuff/actions";

function AddPrioritization() {
  const { sectors, occupations } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const handleAddPrioritization = (data) => {
    dispatch(addPrioritization(data, navigate));
    reset();
  };
  useEffect(() => {
    dispatch(getSectors());
    dispatch(getOccupations());
  }, []);
  return (
    <div className="formContainer">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">Öncelik Ekle</h2>
        <Link to="/prioritization">
          <img src="/images/cancel.png" alt="cancel" className="h-4 w-4" />
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(handleAddPrioritization)}
        className=" flex flex-col mt-4"
      >
        <div>
          <label htmlFor="priority" className="flex">
            Öncelik
          </label>
          <input
            type="number"
            className="border-2 rounded-md w-full p-2 mt-2"
            {...register("priority", { required: "Önceliklendirme zorunlu" })}
          />
          {errors.priority && (
            <span className="fieldError">{errors.priority.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="sector_id" className="flex">
            Sektör
          </label>
          <select
            {...register("sector_id", { required: "Sektör zorunlu" })}
            className="border-2 rounded-md w-full p-2 mt-2"
          >
            <option value="">-- Sektör seç --</option>
            {sectors &&
              sectors.length > 0 &&
              sectors.map((sector) => (
                <option key={sector.sector_id} value={sector.sector_id}>
                  {sector.sector_name}
                </option>
              ))}
          </select>
          {errors.sector_id && (
            <span className="fieldError">{errors.sector_id.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="occupation_id" className="flex">
            Meslek
          </label>
          <select
            {...register("occupation_id", { required: "Sektör zorunlu" })}
            className="border-2 rounded-md w-full p-2 mt-2"
          >
            <option value="">-- Sektör seç --</option>
            {occupations &&
              occupations.length > 0 &&
              occupations.map((occupation) => (
                <option
                  key={occupation.occupation_id}
                  value={occupation.occupation_id}
                >
                  {occupation.occupation_name}
                </option>
              ))}
          </select>
          {errors.sector_id && (
            <span className="fieldError">{errors.sector_id.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="experience_years" className="flex">
            Kıdem (Yıl)
          </label>
          <input
            type="number"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("experience_years", {
              required: "Önceliklendirme zorunlu",
            })}
          />
          {errors.experience_years && (
            <span className="fieldError">
              {errors.experience_years.message}
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

export default AddPrioritization;
