import React, { useContext, useState, useEffect } from "react";
import Layout from "@/components/candidate_shared/layout";
import { AuthContext } from "@/context/AuthContext";

function Approved_referrals() {
  const useAuth = useContext(AuthContext);
  const [email, setEmail] = useState("");

  const [user, setUser] = useState([]);
  async function getUser() {
//     
    const res = await fetch("/api/user/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    const data = await res.json();
    const temp = data?.data?.pending_invites;
    //store invites with accepted equals true
    var newdata=[];
    temp?.map((item)=>{
        if(item.accepted){
            newdata.push(item)
        }
    })
    
    setUser(newdata);
  }
  useEffect(() => {
    if (email) {
      console.log(email);
      getUser();
    }
  }, [email]);
console.log(user);
  useEffect(() => {
    setEmail(useAuth.currentUser.email);
  }, [useAuth.currentUser.email]);
  // console.log(email);
  return (
    <Layout>
      <div className="w-full bg-white rounded-lg p-4">
        <section className="bg-gray-50 p-3 sm:p-5">
          <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
            <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                {/* title */}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        Sr. No.
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Manager name
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Company name
                      </th>
                      <th scope="col" className="px-4 py-3">
                        City
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Position
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Minimum Experience
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {user?.map((item, index) => {
                      return (
                        <tr
                          className="border-b "
                          key={index}>
                          <td className="px-4 py-3">{index + 1}</td>
                          <th
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-600 whitespace-nowrap">
                            {item.recruiterName}
                          </th>
                          <td className="px-4 py -3">{item?.form?.company_name}</td>
                          <td className="px-4 py-3">{item?.form?.city}</td>
                          <td className="px-4 py-3">{item?.form?.position}</td>
                          <td className="px-4 py-3">{item?.form?.min_experience}</td>
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
