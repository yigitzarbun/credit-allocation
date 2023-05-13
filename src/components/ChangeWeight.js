import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { getWeights, updateWeight } from "../redux-stuff/actions";
function ChangeOccupation() {
  const location = useLocation();
  const propsData = location.state;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      weight_score: propsData.weight_score,
    },
  });
  const handleChangeWeight = (data) => {
    const dataWide = {
      weight_id: propsData.weight_id,
      field: propsData.field,
      weight_score: data.weight_score,
    };
    dispatch(updateWeight(dataWide, navigate));
    reset();
  };

  return (
    <div className="formContainer">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">Ağırlık Değiştir</h2>
        <Link to="/prioritization">
          <img src="/images/cancel.png" alt="cancel" className="h-4 w-4" />
        </Link>
      </div>

      <form
        onSubmit={handleSubmit(handleChangeWeight)}
        className=" flex flex-col mt-4"
      >
        <div>
          <label htmlFor="weight_score" className="flex">
            <p>
              Değiştirilecek ağırlık:{" "}
              <span className="text-blue-400 font-bold">
                {propsData.field === "sector"
                  ? "Sektör"
                  : propsData.field === "occupation"
                  ? "Meslek"
                  : "Kıdem (Yıl)"}
              </span>
            </p>
          </label>
          <input
            type="number"
            step="0.01"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("weight_score", {
              required: "Skor zorunlu",
              max: { value: 1, message: "Max 1" },
              min: { value: 0, message: "Min 0" },
            })}
          />
          {errors.weight_score && (
            <span className="fieldError">{errors.weight_score.message}</span>
          )}
        </div>
        <button className="positiveButton" disabled={!isValid} type="submit">
          <p className="font-bold">Değiştir</p>
        </button>
      </form>
    </div>
  );
}

export default ChangeOccupation;
