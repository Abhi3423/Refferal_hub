import React, { useContext, useState, useEffect } from "react";
import FormData from "form-data";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

const Resume_info = () => {
  const user = useContext(AuthContext);
  const [userType, setUserType] = useState("recrute");
  const [isLoading, setIsLoading] = useState(false);
  const { setFullDetails, fullDetails } = useContext(AuthContext);
  const [jsonresume, setJsonResume] = useState();

  const formik = useFormik({
    initialValues: {
      resume: "",
    },
    validationSchema: Yup.object().shape({
      resume: Yup.string().required("* Resume is required"),
    }),
    onSubmit: async (values) => {
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
            jsonresume,
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

  //fetch resume parser
  const resumeParser = async (resume) => {
    setIsLoading(true);
    console.log(resume);
    const form = new FormData();
    form.append("providers", "affinda");
    form.append("file", resume);
    const url = "https://api.edenai.run/v2/ocr/resume_parser";
    const apiKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzM4NjU2NWYtZWFjYS00MmJlLTk1NDItZDRjODIyYzNmODY1IiwidHlwZSI6ImFwaV90b2tlbiJ9.E3idlR05Fq_vrZsYRdyKEcirb_CN4JjxRQ-64SKYF0M";
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: form,
    };
    try {
      await fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          setJsonResume(data);
        })
        .catch((error) => {
          console.error(error);
        });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  // fetch end
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
        <div className="flex justify-center items-center w-full"></div>
        <div className="flex justify-center items-center w-full">
          <div className="font-normal text-sm grid grid-cols-2 gap-x-40 items-center">
            <label htmlFor="org">Resume Upload Link </label>
            <input
              className="w-fit px-4 py-2 border-solid border-[1.5px] border-[#E5E5E5] rounded-md font-semibold"
              type="file"
              name="resume"
              // value={formik.values.resume}
              // onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onChange={(e) => {
                formik.setFieldValue("resume", e.target.files[0]);
                resumeParser(e.target.files[0]);
              }}
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

        <div className="flex justify-center items-center w-full">
          <button
            className="bg-green-500 w-fit py-2 px-4 rounded-lg text-white"
            type="submit"
            value="submit"
            disabled={isLoading}>
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default Resume_info;
