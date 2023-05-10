import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { updateOccupation } from "../redux-stuff/actions";
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
      occupation_score: propsData.occupation_score,
    },
  });
  const handleChangeOccupation = (data) => {
    const dataWide = {
      occupation_id: propsData.occupation_id,
      occupation_name: propsData.occupation_name,
      occupation_score: data.occupation_score,
    };
    dispatch(updateOccupation(dataWide, navigate));
    reset();
  };
  return (
    <div className="formContainer">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">Meslek Skoru Değiştir</h2>
        <Link to="/occupations">
          <img src="/images/cancel.png" alt="cancel" className="h-4 w-4" />
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(handleChangeOccupation)}
        className=" flex flex-col mt-4"
      >
        <div>
          <label htmlFor="occupation_score" className="flex">
            <p>
              Değiştirilecek meslek:{" "}
              <span className="text-blue-400 font-bold">{`${propsData.occupation_name}`}</span>
            </p>
          </label>
          <input
            type="number"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("occupation_score", {
              required: "Skor zorunlu",
              min: { value: 0, message: "Min 0" },
              max: { value: 100, message: "Max 100" },
            })}
          />
          {errors.occupation_score && (
            <span className="fieldError">
              {errors.occupation_score.message}
            </span>
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
