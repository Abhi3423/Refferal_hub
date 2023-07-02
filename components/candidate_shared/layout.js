import React from "react";
import Sidebar from './sidebar'

const Layout = ({ children }) => {
    return (
        <div>
            <main className="flex w-full">
                <Sidebar>
                    {children}
                </Sidebar>
            </main>
        </div>

    );
};

export default Layout;