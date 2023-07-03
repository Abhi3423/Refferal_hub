import { React, useEffect, useState } from "react";
import Layout from "@/components/candidate_shared/layout";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import SuccessModal from "@/components/successModal";
import cross from './../../../public/assets/cross.png'
import Image from "next/image";

function Profile() {
  const user = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({});
  const [email, setEmail] = useState("");
  const [popup, setpopup] = useState(false)
  const [resumeUrl, setResumeUrl] = useState("");

  async function getUserDetails() {
    //post request to backend giving email
    //get response and set it to userDetails,
    const response = await fetch("/api/user/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    const data = await response.json();
    // console.log(email);
    setUserDetails(data.data);
  }

  function handleClick() {
    setResumeUrl(userDetails?.resume_url)
    setpopup(true)
  }

  useEffect(() => {
    setEmail(user?.currentUserDetails?.email);
  }, [user?.currentUserDetails]);
  useEffect(() => {
    if (email) {
      getUserDetails();
    }
  }, [email])
    ;

  return (
    <>
      <Layout>
        <div className="w-full bg-white dark:text-black rounded-lg p-4 h-[85vh]">
          <div className="flex gap-3 w-full items-center">
            <span className="block h-[0.5px] w-[4%] bg-slate-400 top-1/2 right-0 transform -translate-y-1/2"></span>
            <span className="text-sm font-semibold whitespace-nowrap">
              PERSONAL DETAILS
            </span>
            <span className="block h-[0.5px] w-[70%] bg-slate-400 top-1/2 left-0 transform -translate-y-1/2"></span>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-center w-full my-2">
              <Image
                className="rounded-full"
                width={90}
                height={90}
                src={userDetails?.photo}
                alt="user"
              />
            </div>

            <div className="flex justify-center items-center w-full">
              <div className="font-bold text-sm grid grid-rows-2 md:grid-cols-2 gap-x-40 items-center md:text-center">
                <label htmlFor="name">Name </label>
                <input
                  className="w-fit px-4 py-2 border-solid border-[1.5px] border-[#E5E5E5] rounded-md font-semibold"
                  type="text"
                  name="name"
                  value={userDetails?.name}
                />
              </div>
            </div>

            <div className="flex justify-center items-center w-full">
              <div className="font-bold text-sm grid grid-rows-2 md:grid-cols-2 gap-x-40 items-center md:text-center">
                <label htmlFor="gmail">Gmail </label>
                <input
                  className="w-fit px-4 py-2 border-solid border-[1.5px] border-[#E5E5E5] rounded-md font-semibold"
                  type="text"
                  name="gmail"
                  value={userDetails?.email}
                />
              </div>
            </div>
            <div className="flex justify-center items-center w-full">
              <div className="font-bold text-sm grid grid-rows-2 md:grid-cols-2 gap-x-40 items-center md:text-center">
                <label htmlFor="gmail">Phone Number </label>
                <input
                  className="w-fit px-4 py-2 border-solid border-[1.5px] border-[#E5E5E5] rounded-md font-semibold"
                  type="text"
                  name="gmail"
                  value={userDetails?.personal?.phoneNumber}
                />
              </div>
            </div>
            <div className="flex justify-center items-center w-full">
              <div className="font-bold text-sm grid grid-rows-2 md:grid-cols-2 gap-x-40 items-center md:text-center">
                <label htmlFor="gmail">Address </label>
                <input
                  className="w-fit px-4 py-2 border-solid border-[1.5px] border-[#E5E5E5] rounded-md font-semibold"
                  type="text"
                  name="gmail"
                  value={userDetails?.personal?.state + ", " + userDetails?.personal?.country}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 w-full items-center">
            <span className="block h-[0.5px] w-[4%] bg-slate-400 top-1/2 right-0 transform -translate-y-1/2"></span>
            <span className="text-sm font-semibold whitespace-nowrap">
              RESUME DETAILS
            </span>
            <span className="block h-[0.5px] w-[70%] bg-slate-400 top-1/2 left-0 transform -translate-y-1/2">

            </span>

          </div>
          <div className="flex justify-center items-center w-full">
            <div className="font-bold text-sm grid grid-rows-2 md:grid-cols-2 gap-x-40 items-center md:text-center p-4">
              <button onClick={() => handleClick()} className="cursor-pointer p-2 rounded-md bg-blue-500 text-white">
                View Resume
              </button>
            </div>
          </div>
        </div>
      </Layout>

      {
        popup &&
        <SuccessModal successState={popup}>
          <div className="flex flex-col w-full">
            <div><button
              className="flex justify-end w-full text-white rounded-md p-1"
              onClick={() => setpopup(false)}
            >
              <Image src={cross} alt="" width={30} height={30}></Image>
            </button></div>
            <iframe src={resumeUrl} width="100%" height="600px" />
          </div>
        </SuccessModal>
      }
    </>

  );
}

export default Profile;
