import React, { Fragment, useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import { AiTwotoneAppstore } from "react-icons/ai";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { AiFillCheckCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = ({ children }) => {
  const user = useContext(AuthContext);
  const routeLinks = [
    {
      icon: <AiTwotoneAppstore />,
      display: "Profile",
      to: "/type/dashboard/profile",
    },
    {
      icon: <IoPersonAddSharp />,
      display: "Create Referral",
      to: "/type/dashboard/create-referral",
    },
    {
      icon: <FaClipboardList />,
      display: "Referral Invitations",
      to: "/type/dashboard/invite-referrals",
    },
    {
      icon: <AiFillCheckCircle />,
      display: "Referrals approved",
      to: "/typedashboard/approved-referrals",
    },
  ];

  const router = useRouter();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const currentPath = router.asPath;
    setActiveLink(currentPath);
  }, [router.asPath]);
  const [sidebar, setSidebar] = useState(true);

  const handelSignOut = async () => {
    await user?.SignOut();
    router.push("/");
  };

  function handleClick() {
    setSidebar(!sidebar);
  }

  return (
    <Fragment>
      <div className="fixed w-full flex justify-between items-center bg-blue-50 z-30 drop-shadow py-2.5 px-2">
        <div className="flex gap-2 items-center order-first">
          <button
            onClick={handleClick}
            className="rounded-full p-3 text-gray-500 text-sm hover:bg-gray-200">
            <FaBars />
          </button>
          <div className="flex flex-col text-base gap-1 items-start font-bold">
            <p>Dashboard</p>
          </div>
        </div>

        <div className="text-[#337AB7] mx-8 font-bold text-md hidden md:inline">
          🌎Referrals Hub
        </div>

        <Link
          className="text-center px-5 py-1 rounded-md cursor-pointer hover:bg-gray-100 flex flex-col justify-center items-center"
          href="/"
          onClick={handelSignOut}>
          <FaSignOutAlt />
          <p className="text-sm font-medium">Logout</p>
        </Link>
      </div>

      <div className="w-full">
        <div
          className={
            sidebar
              ? "fixed grid row-span-2 left-[-100%] lg:left-0 top-0 pt-24  w-60 z-10 border-0 h-full drop-shadow-2xl bg-blue-50 ease-in-out duration-500"
              : "fixed grid row-span-2 left-0 lg:left-[-100%] top-0 pt-24 w-60 z-10 border-0 h-full drop-shadow-2xl bg-blue-50 ease-in-out duration-500"
          }>
          <ul className="space-y-8">
            {routeLinks.map((routeItem, index) => {
              return (
                <li key={index}>
                  <Link
                    key={index}
                    href={routeItem.to}
                    className={`flex gap-4 px-4 items-center font-medium text-[0.94rem] whitespace-nowrap ${
                      activeLink === routeItem.to
                        ? "border-blue-400 border-x-[3px] text-[#212832]"
                        : "text-[#212832] font-normal"
                    }`}>
                    {React.cloneElement(routeItem.icon, {
                      color:
                        activeLink === routeItem.to ? "#337AB7" : "#69707a",
                      size: 20,
                    })}
                    <span>{routeItem.display}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className={
            sidebar
              ? "h-full w-full lg:pl-[17rem] static px-8 py-[80px] bg-blue-50 ease-in-out duration-500"
              : "h-full w-full static overflow-visible px-8 py-[80px] bg-blue-50 ease-in-out duration-500"
          }>
          {children}
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
