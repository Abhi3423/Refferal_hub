import React, { useContext, useState, useEffect } from "react";
import Layout from "@/components/manager_shared/layout";
import { AuthContext } from "@/context/AuthContext";
import { FaUnderline } from "react-icons/fa";
import { useRouter } from "next/router";


function Invite_referrals() {
  const useAuth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [user, setUser] = useState([]);

  const handleClick= async function(item){
   const data=await fetch("/api/user/accept-referal",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({adminEmail:email,userEmail:item.userEmail,name:item.name})
    })

    const res=await data.json();
    if(res.msg=="success"){
      alert("Referal Accepted");
      router.push("/type/dashboard/approved-referrals");
    
    }
  }

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
    const temp = data?.data?.referal_request;
    //sort temp array in descending order of resume score
    temp?.sort((a, b) => b.resumeScore - a.resumeScore);
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
        <section className="bg-gray-50  p-3 sm:p-5">
          <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
            <div className="bg-white  relative shadow-md sm:rounded-lg overflow-hidden">
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
                        User name
                      </th>
                      <th scope="col" className="px-4 py-3">
                        User Email
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Resume Score
                      </th>
                      <th scope="col" className="px-4 py-3">
                      </th>
                      <th scope="col" className="px-4 py-3"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {user?.map((item, index) => {
                      return (
                        <tr
                          className="border-b"
                          key={index}>
                          <td className="px-4 py-3">{index + 1}</td>
                          <th
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-600 whitespace-nowrap">
                            {item.name}
                          </th>
                          <td className="px-4 py -3">{item.userEmail}</td>
                          <td className="px-4 py-3">{item.resumeScore}</td>
                          <td className="px-4 py-3">
                            <button className="cursor-pointer p-2 rounded-md bg-blue-500 text-white">
                              View Resume 
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            <button onClick={()=>handleClick(item)} className="cursor-pointer p-2 rounded-md bg-blue-500 text-white">
                              Accept 
                            </button>
                          </td>
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

export default Invite_referrals;
