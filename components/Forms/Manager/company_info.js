import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

const Company_info = () => {
  const user = useContext(AuthContext);
  const [userType, setUserType] = useState("Hiree");
  const { setFullDetails, fullDetails } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      currentOrg: "",
      yourField: "",
      location: "",
      position: "",
      resume: "",
      servedMonths: undefined,
    },
    validationSchema: Yup.object().shape({
      // currentOrg: Yup.string().required("* Current company is required"),
      // location: Yup.string().required("* Location is required"),
      // position: Yup.string().required("* Position is required"),
      // servedMonths: Yup.number()
      //   .required("* Served months is required")
      //   .min(1, "Minimum 1 month of service required"),
      // resume: Yup.string().required("* Resume is required"),
      // yourRole: Yup.string().required("* Your role is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        const res = await fetch("/api/data/create_hirer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userType,
            email: user?.currentUserDetails?.email,
            name: user?.currentUserDetails?.name,
            photo: user?.currentUserDetails?.photo,
            ...fullDetails,
            company: values,
          }),
        });
        console.log(res);
      } catch (error) {
        console.error(error);
      }
      if (user?.step < 3) user?.setstep((e) => e + 1);
      console.log(values);
    },
  });

  return (
    <form className="flex flex-col gap-4 mt-4" onSubmit={formik.handleSubmit}>
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

      <div className="flex justify-center items-center w-full gap-4">
        <span class="ml-3 text-sm font-medium text-gray-900 ">Recrute</span>
        <label class="relative inline-flex items-center mr-5 cursor-pointer ">
          <input
            type="checkbox"
            value={userType}
            class="sr-only peer"
            onChange={(e) => {
              setUserType(e.target.value == "recrute" ? "hiree" : "recrute");
              console.log(userType);
            }}
          />
          <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
          <span class="ml-3 text-sm font-medium text-gray-900 ">Hiree </span>
        </label>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="font-normal text-sm grid grid-cols-2 gap-x-40 items-center">
          <label htmlFor="org">Current Organisation </label>
          <input
            className="w-fit px-4 py-2 border-solid border-[1.5px] border-[#E5E5E5] rounded-md font-semibold"
            type="text"
            name="currentOrg"
            value={formik.values.currentOrg}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.currentOrg && formik.errors.currentOrg ? (
            <div className="text-red-500 text-xs col-start-2 mt-1">
              {formik.errors.currentOrg}
            </div>
          ) : (
            <div className="text-red-500 text-xs col-start-2 mt-1 w-full h-4"></div>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="font-normal text-sm grid grid-cols-2 gap-x-40 items-center">
          <label htmlFor="location">Location </label>
          <input
            className="w-fit px-4 py-2 border-solid border-[1.5px] border-[#E5E5E5] rounded-md font-semibold"
            type="text"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.location && formik.errors.location ? (
            <div className="text-red-500 text-xs col-start-2 mt-1">
              {formik.errors.location}
            </div>
          ) : (
            <div className="text-red-500 text-xs col-start-2 mt-1 w-full h-4"></div>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="font-normal text-sm grid grid-cols-2 gap-x-40 items-center">
          <label htmlFor="pos">Position </label>
          <input
            className="w-fit px-4 py-2 border-solid border-[1.5px] border-[#E5E5E5] rounded-md font-semibold"
            type="text"
            name="position"
            value={formik.values.position}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.position && formik.errors.position ? (
            <div className="text-red-500 text-xs col-start-2 mt-1">
              {formik.errors.position}
            </div>
          ) : (
            <div className="text-red-500 text-xs col-start-2 mt-1 w-full h-4"></div>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="font-normal text-sm grid grid-cols-2 gap-x-40 items-center">
          <label htmlFor="served">Served Months </label>
          <input
            className="w-fit px-4 py-2 border-solid border-[1.5px] border-[#E5E5E5] rounded-md font-semibold"
            type="number"
            name="servedMonths"
            value={formik.values.servedMonths}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.servedMonths && formik.errors.servedMonths ? (
            <div className="text-red-500 text-xs col-start-2 mt-1">
              {formik.errors.servedMonths}
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

export default Company_info;
