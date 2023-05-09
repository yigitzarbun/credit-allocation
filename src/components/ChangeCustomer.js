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
  let missingValues = [];
  if (propsData) {
    Object.keys(propsData).filter((p) => {
      if (propsData[p] === null) {
        missingValues.push(p);
      }
    });
  }
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
      age: propsData.age,
      email: propsData.email,
      experience_years: propsData.experience_years,
      full_name: propsData.full_name,
      gender: propsData.gender,
      occupation_id: propsData.occupation_id,
      phone: propsData.phone,
      product_choice: propsData.product_choice,
      sector_id: propsData.sector_id,
      source: propsData.source,
    },
  });
  const handleUpdateCustomer = (changes) => {
    const dataWide = {
      age: changes.age,
      credit_score: propsData.credit_score,
      customer_id: propsData.customer_id,
      email: changes.email,
      experience_years: changes.experience_years,
      full_name: changes.full_name,
      gender: changes.gender,
      landing_id: propsData.landing_id,
      occupation_id: changes.occupation_id,
      phone: changes.phone,
      pipedrive: propsData.pipedrive,
      priority_id: changes.priority_id,
      product_choice: changes.product_choice,
      sector_id: changes.sector_id,
      source: changes.source,
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
        <h2 className="font-bold text-4xl">Müşteri Güncelle</h2>
        <Link to="/unprocessed-loan-requests">
          <img src="/images/cancel.png" alt="cancel" className="h-4 w-4" />
        </Link>
      </div>
      <p className="mt-8">
        Değiştirilecek müşteri:{" "}
        <span className="text-blue-400 font-bold">{`${propsData.full_name}`}</span>
      </p>
      <div className="mt-4">
        {missingValues &&
        Array.isArray(missingValues) &&
        missingValues.length > 0 ? (
          missingValues
            .filter((v) => {
              return (
                v === "full_name" ||
                v === "experience_years" ||
                v === "sector_name" ||
                v === "occupation_name" ||
                v === "age" ||
                v === "email" ||
                v === "phone" ||
                v === "source" ||
                v === "gender" ||
                v === "product_choice"
              );
            })
            .map((v) => (
              <p key={v} className="text-red-400">
                <span className="text-white"> Eksik bilgi: </span> {v}
              </p>
            ))
        ) : (
          <p className="text-green-400">Tüm bilgiler bulunuyor</p>
        )}
      </div>
      <form
        onSubmit={handleSubmit(handleUpdateCustomer)}
        className=" flex flex-col mt-4"
      >
        <div>
          <label htmlFor="full_name" className="flex">
            Müşteri Adı
          </label>
          <input
            type="text"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("full_name", { required: "İsim zorunlu" })}
          />
          {errors.full_name && (
            <span className="fieldError">{errors.full_name.message}</span>
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
        <div>
          <label htmlFor="age" className="flex">
            Yaş
          </label>
          <input
            type="number"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("age", { required: "Yaş zorunlu" })}
          />
          {errors.age && (
            <span className="fieldError">{errors.age.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="email" className="flex">
            Email
          </label>
          <input
            type="text"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("email", { required: "Email zorunlu" })}
          />
          {errors.email && (
            <span className="fieldError">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="flex">
            Telefon
          </label>
          <input
            type="number"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("phone", { required: "Yaş zorunlu" })}
          />
          {errors.phone && (
            <span className="fieldError">{errors.phone.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="source" className="flex">
            Kaynak
          </label>
          <input
            type="text"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("source", { required: "Kaynak zorunlu" })}
          />
          {errors.source && (
            <span className="fieldError">{errors.source.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="gender" className="flex">
            Cinsiyet
          </label>
          <input
            type="text"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("gender", { required: "Cinsiyet zorunlu" })}
          />
          {errors.gender && (
            <span className="fieldError">{errors.gender.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="product_choice" className="flex">
            Ürün Tercihi
          </label>
          <input
            type="text"
            className="border-2 rounded-md w-full p-2 mt-4"
            {...register("product_choice", { required: "Kaynak zorunlu" })}
          />
          {errors.product_choice && (
            <span className="fieldError">{errors.product_choice.message}</span>
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
