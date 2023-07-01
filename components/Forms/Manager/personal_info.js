import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

const Personal_info = () => {
  const user = useContext(AuthContext);
  const {setCurrentUserDetails} = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    console.log(user?.currentUserDetails);
  }, [user?.currentUserDetails]);

  const formik = useFormik({
    initialValues: {
      gender: "",
      phoneNumber: "",
      country: "",
      state: "",
    },
    validationSchema: Yup.object().shape({
      gender: Yup.string().required("* Gender is required"),
      phoneNumber: Yup.string().required("* Phone number is required"),
      country: Yup.string().required("* Country is required"),
      state: Yup.string().required("* State is required"),
    }),
    onSubmit: async (values) => {
      
      setCurrentUserDetails({
        ...user.currentUserDetails,
        personal: values
      });
      console.log(user.currentUserDetails)

      // try {
      //   const { name, email, ...restCurrentUserDetails } = user?.currentUserDetails[0];

      //   const res = await fetch("/api/data/create_refferar", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ ...values, name, email, ...restCurrentUserDetails }),
      //   });

      //   console.log(res);
      // } catch (error) {
      //   console.error(error);
      // }

      if (user?.step < 3) {
        user?.setstep((prevStep) => prevStep + 1);
        console.log(user?.step);
      }
    },
  });

  return (
    <form
      className="flex flex-col gap-4 mt-4"
      onSubmit={(e) => formik.handleSubmit(e)}>
      <div className="w-full flex gap-5 justify-center items-center">
        <Image
          className="rounded-full"
          width={90}
          height={90}
          src={user?.currentUserDetails?.photo}
          alt="user"
        />
        <div className="flex flex-col gap-2">
          <div>{user?.currentUserDetails?.name}</div>
          <div>{user?.currentUserDetails?.email}</div>
        </div>
      </div>

      <div className="flex justify-center items-center w-full">
        <div className="font-normal text-sm grid grid-cols-2 gap-x-40 items-center">
          <label htmlFor="gender">Gender </label>
          <input
            className="w-fit px-4 py-2 border-solid border-[1.5px] border-[#E5E5E5] rounded-md font-semibold"
            type="text"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.gender && formik.errors.gender ? (
            <div className="text-red-500 text-xs col-start-2 mt-1">
              {formik.errors.gender}
            </div>
          ) : (
            <div className="text-red-500 text-xs col-start-2 mt-1 w-full h-4" />
          )}
        </div>
      </div>

      <div className="flex justify-center items-center w-full">
        <div className="font-normal text-sm grid grid-cols-2 gap-x-40 items-center">
          <label htmlFor="phone">Phone number </label>
          <input
            className="w-fit px-4 py-2 border-solid border-[1.5px] border-[#E5E5E5] rounded-md font-semibold"
            type="number"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className="text-red-500 text-xs col-start-2 mt-1">
              {formik.errors.phoneNumber}
            </div>
          ) : (
            <div className="text-red-500 text-xs col-start-2 mt-1 w-full h-4"></div>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center w-full">
        <div className="font-normal text-sm grid grid-cols-2 gap-x-40 items-center">
          <label htmlFor="country">Country </label>
          <input
            className="w-fit px-4 py-2 border-solid border-[1.5px] border-[#E5E5E5] rounded-md font-semibold"
            type="text"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.country && formik.errors.country ? (
            <div className="text-red-500 text-xs col-start-2 mt-1">
              {formik.errors.country}
            </div>
          ) : (
            <div className="text-red-500 text-xs col-start-2 mt-1 w-full h-4"></div>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center w-full">
        <div className="font-normal text-sm grid grid-cols-2 gap-x-40 items-center">
          <label htmlFor="state">State </label>
          <input
            className="w-fit px-4 py-2 border-solid border-[1.5px] border-[#E5E5E5] rounded-md font-semibold"
            type="text"
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.state && formik.errors.state ? (
            <div className="text-red-500 text-xs col-start-2 mt-1">
              {formik.errors.state}
            </div>
          ) : (
            <div className="text-red-500 text-xs col-start-2 mt-1 w-full h-4"></div>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center w-full">
        <button
          className="bg-green-500 w-fit py-2 px-4 rounded-lg text-white"
          type="submit"
          value="submit">
          Next
        </button>
      </div>
    </form>
  );
};

export default Personal_info;
