import React, { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getOccupations,
  updateCustomer,
  getSectors,
} from "../redux-stuff/actions";
function ChangeCustomer() {
  const { sectors, occupations } = useSelector((store) => store);
  const location = useLocation();
  const propsData = location.state.customer;
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
      fname: propsData.fname,
      lname: propsData.lname,
      experience_years: propsData.experience_years,
      sector_id: propsData.sector_id,
      occupation_id: propsData.occupation_id,
    },
  });
  const handleUpdateCustomer = (changes) => {
    const dataWide = {
      customer_id: propsData.customer_id,
      fname: changes.fname,
      lname: changes.lname,
      occupation_id: changes.occupation_id,
      sector_id: changes.sector_id,
      experience_years: changes.experience_years,
      pipedrive: propsData.pipedrive,
      credit_score: propsData.credit_score,
      priority_id: propsData.priority_id,
    };
    dispatch(updateCustomer(dataWide, navigate));
    reset();
  };

  useEffect(() => {
    dispatch(getSectors());
    dispatch(getOccupations());
  }, []);
  return (
    <div className="formContainer">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">Müşteri Bilgileri Değiştir</h2>
        <Link to="/unprocessed-loan-requests">
          <img src="/images/cancel.png" alt="cancel" className="h-4 w-4" />
        </Link>
      </div>
      <p className="mt-8">
        Değiştirilecek müşteri:{" "}
        <span className="text-blue-400 font-bold">{`${propsData.fname} ${propsData.lname}`}</span>
      </p>
      <form
        onSubmit={handleSubmit(handleUpdateCustomer)}
        className=" flex flex-col mt-4"
      >
        <div>
          <label htmlFor="fname" className="flex">
            Müşteri Adı
          </label>
          <input
            type="text"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("fname", { required: "İsim zorunlu" })}
          />
          {errors.fname && (
            <span className="fieldError">{errors.fname.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="lname" className="flex">
            Müşteri Soyadı
          </label>
          <input
            type="text"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("lname", { required: "Soyisim zorunlu" })}
          />
          {errors.lname && (
            <span className="fieldError">{errors.lname.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="experience_years" className="flex">
            Tecrübe (Yıl)
          </label>
          <input
            type="number"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("experience_years", { required: "Soyisim zorunlu" })}
          />
          {errors.experience_years && (
            <span className="fieldError">
              {errors.experience_years.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="sector_id" className="flex">
            Sektör
          </label>
          <select
            {...register("sector_id")}
            className="border-2 rounded-md w-full p-2 mt-4 text-black"
          >
            {sectors &&
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
            {...register("occupation_id")}
            className="border-2 rounded-md w-full p-2 mt-4 text-black"
          >
            {occupations &&
              occupations.map((occupation) => (
                <option
                  key={occupation.occupation_id}
                  value={occupation.occupation_id}
                >
                  {occupation.occupation_name}
                </option>
              ))}
          </select>
          {errors.occupation_id && (
            <span className="fieldError">{errors.occupation_id.message}</span>
          )}
        </div>
        <button className="positiveButton" disabled={!isValid} type="submit">
          <p className="font-bold">Değiştir</p>
        </button>
      </form>
    </div>
  );
}

export default ChangeCustomer;
