import React, { useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Image from "next/image";
import success from "../../../public/assets/success.svg";

const Confirmation = () => {
  const user = React.useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/type/user/profile");
    }, 5000);
  }, []);
  return (
    <div>
      <div className="w-full flex flex-col gap-5 justify-center items-center">
        <Image width={80} src={success} alt="success" />
        <span>Profile Created Successfully!!</span>
      </div>
    </div>
  );
};

export default Confirmation;
