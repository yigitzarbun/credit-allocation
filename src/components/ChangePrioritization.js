import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation } from "react-router-dom";
function ChangePrioritization(props) {
  const location = useLocation();
  const propsData = location.state;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const handleChangePrioritization = () => {
    navigate("/prioritization");
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
            <p>{`${propsData.sector} -- ${propsData.occupation}`}</p>
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
