import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

const Resume_info = () => {
  const user = useContext(AuthContext);
  const [userType, setUserType] = useState("recrute");
  const { setFullDetails, fullDetails } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      resume: "",
    },
    validationSchema: Yup.object().shape({
      resume: Yup.string().required("* Resume is required"),
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
            resume: values,
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
      <div>
        <div className="flex justify-center items-center w-full">
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="font-normal text-sm grid grid-cols-2 gap-x-40 items-center">
            <label htmlFor="org">Resume Upload Link </label>
            <input
              className="w-fit px-4 py-2 border-solid border-[1.5px] border-[#E5E5E5] rounded-md font-semibold"
              type="text"
              name="resume"
              value={formik.values.resume}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.resume && formik.errors.resume ? (
              <div className="text-red-500 text-xs col-start-2 mt-1">
                {formik.errors.resume}
              </div>
            ) : (
              <div className="text-red-500 text-xs col-start-2 mt-1 w-full h-4"></div>
            )}
          </div>
        </div>
        {/* <div className="w-full flex justify-center items-center mt-4">
          <div class="flex items-center justify-center w-1/4 ">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">
                  Give Your Resume Link
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Doc, .PDF
                </p>
              </div>
              <input
                id="url"
                type="url"
                onChange={(e) => {
                  console.log(e.target.value);
                  formik.setFieldValue("resume", e.target.value);
                }}
                className="rounded-md"
              />
            </label>
          </div>
        </div> */}
        <div className="flex justify-center items-center w-full">
          <button
            className="bg-green-500 w-fit py-2 px-4 rounded-lg text-white"
            type="submit"
            value="submit">
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default Resume_info;
