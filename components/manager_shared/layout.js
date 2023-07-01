import React from "react";
import Sidebar from "./sidebar";
import Link from "next/link";

const Layout = ({ children }) => {
    return (
        <div className="">
            <header className="nav bg-white">
                <div className="container">
                    <div className="row items-center mb-lg">
                        <div className="column align-left">
                            <a
                                href="#"
                                aria-current="page"
                                className="w-inline-block w--current">
                                <div className="logo">
                                    <span className="emoji mr-md">🌎</span> Refferals
                                </div>
                            </a>
                        </div>
                        <div className="column align-right">
                            <div className="row items-center">
                                <Link href="#" className="u mr-lg">
                                    Log in
                                </Link>
                                <div
                                    // href="/dashboard"
                                    className="button main w-button"
                                    onClick={(e) => handelSignUp(e)}>
                                    Sign in
                                    <span
                                        data-feather="arrow-right"
                                        className="icon mr-md-n ml-md">
                                        •
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="flex w-full">
                <div className="left-0 inset-0 top-48 pt-24 bg-white z-30 sticky h-auto overflow-y-visible border-b-0 border-0 w-60">
                    Sidebar
                </div>
                <div className="min-h-screen w-full static max-h-full overflow-hidden py-[100px] px-3">
                    {children}
                </div>
            </div>
        </div>

    );
};

export default Layout;