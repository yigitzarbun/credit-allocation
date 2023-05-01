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
    <div className=" p-8 mt-8 rounded-md shadow-md w-1/3 mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">Sektör Değiştir</h2>
        <Link to="/occupations">
          <img src="/images/cancel.png" alt="cancel" className="h-4 w-4" />
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(handleChangeOccupation)}
        className="changePrioritizationForm flex flex-col mt-4"
      >
        <div className="changePrioritizationFormContainer">
          <label htmlFor="occupation_score" className="flex">
            <p>{`${propsData.occupation_name} -- ${propsData.occupation_score}`}</p>
          </label>
          <input
            type="number"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("occupation_score", { required: "Skor zorunlu" })}
          />
          {errors.occupation_score && (
            <span className="fieldError">
              {errors.occupation_score.message}
            </span>
          )}
        </div>
        <button
          className="mt-4 mx-auto border-2 w-1/2 cursor-pointer border-[#D09600] rounded-md hover:bg-[#D09600] hover:text-white p-2"
          disabled={!isValid}
          type="submit"
        >
          <p className="font-bold">Değiştir</p>
        </button>
      </form>
    </div>
  );
}

export default ChangeOccupation;
