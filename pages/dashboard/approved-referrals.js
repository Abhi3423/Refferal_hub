import React, { useState, useEffect, useContext } from "react";
import Layout from "@/components/manager_shared/layout";
import { AuthContext } from "@/context/AuthContext";

function Approved_referrals() {
  const useAuth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [user, setUser] = React.useState([]);
  async function getUser() {
    //post request paasing email
    const res = await fetch("/api/user/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    const data = await res.json();
    const temp = data.data.referal_accepted;
    //sort temp array in descending order of resume score
    setUser(temp);
  }
  useEffect(() => {
    if (email) {
      console.log(email);
      getUser();
    }
  }, [email]);

  useEffect(() => {
    setEmail(useAuth.currentUser.email);
  }, [useAuth.currentUser.email]);
  // console.log(email);

  return (
    <Layout>
      <div className="w-full bg-white rounded-lg p-4">
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
          <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                {/* title */}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        Sr. No.
                      </th>
                      <th scope="col" className="px-4 py-3">
                        User name
                      </th>
                      <th scope="col" className="px-4 py-3">
                        User Email
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {user?.map((item, index) => {
                      return (
                        <tr
                          className="border-b dark:border-gray-700 "
                          key={index}>
                          <td className="px-4 py-3">{index + 1}</td>
                          <th
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.name}
                          </th>
                          <td className="px-4 py-3">{item.userEmail}</td>
                          <td className="px-4 py-3">{item.resumeScore}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Approved_referrals;
