import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { updateSector } from "../redux-stuff/actions";
function ChangeSector(props) {
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
      sector_score: propsData.sector_score,
    },
  });
  const handleChangeSector = (data) => {
    const dataWide = {
      sector_id: propsData.sector_id,
      sector_name: propsData.sector_name,
      sector_score: data.sector_score,
    };
    dispatch(updateSector(dataWide, navigate));
    reset();
  };
  return (
    <div className="formContainer">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">Sektör Skoru Değiştir</h2>
        <Link to="/sectors">
          <img src="/images/cancel.png" alt="cancel" className="h-4 w-4" />
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(handleChangeSector)}
        className=" flex flex-col mt-4"
      >
        <div>
          <label htmlFor="sector_score" className="flex">
            <p>
              Değiştirilecek sektör:{" "}
              <span className="text-blue-400 font-bold">{`${propsData.sector_name}`}</span>
            </p>
          </label>
          <input
            type="number"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("sector_score", { required: "Skor zorunlu" })}
          />
          {errors.sector_score && (
            <span className="fieldError">{errors.sector_score.message}</span>
          )}
        </div>
        <button className="positiveButton" disabled={!isValid} type="submit">
          <p className="font-bold">Değiştir</p>
        </button>
      </form>
    </div>
  );
}

export default ChangeSector;
