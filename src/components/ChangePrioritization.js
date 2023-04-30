import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { updatePrioritization } from "../redux-stuff/actions";
function ChangePrioritization(props) {
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
      priority: propsData.priority,
    },
  });
  const handleChangePrioritization = (data) => {
    const dataWide = {
      priority_id: propsData.priority_id,
      priority: data.priority,
      sector_id: propsData.sector_id,
      occupation_id: propsData.occupation_id,
    };
    dispatch(updatePrioritization(dataWide, navigate));
    reset();
  };
  return (
    <div className=" p-8 mt-8 rounded-md shadow-md w-1/3 mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">Öncelik</h2>
        <Link to="/prioritization">
          <img src="/images/cancel.png" alt="cancel" className="h-4 w-4" />
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(handleChangePrioritization)}
        className="changePrioritizationForm flex flex-col mt-4"
      >
        <div className="changePrioritizationFormContainer">
          <label htmlFor="priority" className="flex">
            <p>{`${propsData.sector} -- ${propsData.occupation} -- ${propsData.experience} (Yıl)`}</p>
          </label>
          <input
            type="number"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("priority", { required: "Önceliklendirme zorunlu" })}
          />
          {errors.priority && (
            <span className="fieldError">{errors.priority.message}</span>
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

export default ChangePrioritization;
