import { React, useEffect } from "react";
import Layout from "@/components/manager_shared/layout";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";


function Profile() {

  const user = useContext(AuthContext);

  useEffect(() => {
    console.log(user?.currentUserDetails);
  }, [user?.currentUserDetails]);


  return (
    <Layout>
      <div className="w-full bg-white rounded-lg p-4">

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
              src={user?.currentUserDetails?.photo}
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
                value={user?.currentUserDetails?.name}
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
                value={user?.currentUserDetails?.email}
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
                value={user?.currentUserDetails?.email}
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
                value={user?.currentUserDetails?.email}
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
                value={user?.currentUserDetails?.email}
              />
            </div>
          </div>

        </div>









        <div className="flex gap-3 w-full items-center">
          <span className="block h-[0.5px] w-[4%] bg-slate-400 top-1/2 right-0 transform -translate-y-1/2"></span>
          <span className="text-sm font-semibold whitespace-nowrap">
            COMPANY DETAILS
          </span>
          <span className="block h-[0.5px] w-[70%] bg-slate-400 top-1/2 left-0 transform -translate-y-1/2"></span>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
