import React, { useEffect, useState, useContext } from "react";
import { generateKeywords } from "@/utils/calculator";
import { calculateMatchingScore } from "@/utils/calculator";
import { AuthContext } from "@/context/AuthContext";
import Layout from "@/components/candidate_shared/layout";
import { useRouter } from "next/router";


function All_referrals() {

  const [data, setData] = React.useState([]);
    const router = useRouter();

  const useAuth = useContext(AuthContext);
  // console.log(useAuth.currentUser)
  async function getData() {
    const res = await fetch("/api/referal/get-all-referral");
    const data = await res.json();
    setData(data.data);
  }
  useEffect(() => {
    getData();
  }, []);
  // console.log(data[0]?.refForm.position);
  const [resumeScore, setResumeScore] = useState(0);

  const handleClick = async function (item) {
    const jobTitle = item?.refForm?.position
    const jobDescription = item?.refForm?.job_description

    const resume = {
      "name": "Tushar Shingane",
      "email": "tusharshingane1234@gmail.com",
      "phone": "+91-9022176049",
      "degree": "BTech",
      "university": [
        "High School",
        "Indian Institute of Technology ( BHU )",
        "Secondary School",
        "Shri RamKrishna Krida Junior College"
      ],
      "Companies worked at": [],
      "designation": [],
      "Experience durations": "",
      "skills": [
        "Documentation",
        "Css",
        "Git",
        "Presentation",
        "Bootstrap",
        "Postman",
        "Time management",
        "Programming",
        "Python",
        "C/c++",
        "React",
        "Anaconda",
        "Github",
        "Pandas",
        "Numpy",
        "Javascript",
        "Flask"
      ],
      "total_exp": 0
    }

    generateKeywords(jobTitle, jobDescription)
      .then(keywords => {

        setResumeScore(calculateMatchingScore(resume, keywords));
      })
      .catch(err => {
        console.error('Error:', err);
      });
    const data = await fetch('/api/user/apply', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminEmail: item.email,
        userEmail: useAuth?.currentUser?.email,
        resumeScore,
        name:useAuth?.currentUser?.displayName,
        form:item?.refForm,
    }),
      })
      const resp=await data.json();
      if(resp.msg=='success'){
        alert('Applied Successfully');
        router.push('/type/user/invites');
      }
}
console.log(resumeScore)

  return (
    <>
      <Layout>
        <div className="text-gray-600">
          <div className="px-5 mx-auto">
            <div className="flex gap-4 flex-wrap">
              {data?.map((item, index) => {
                return <div key={index} className="py-8 w-[500px] flex flex-wrap md:flex-nowrap mt-4 m-auto bg-white rounded-lg p-4">
                  <div className="md:flex-grow ">
                    <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{item?.refForm?.position}</h2>
                    <h4 className=" pb-4 font-normal">{item?.refForm?.company_name}</h4>
                    <div className="flex pb-2 items-center ">
                      <svg class="w-4 h-4 mr-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9" />
                      </svg>{item?.refForm?.city}
                    </div>
                    <p className="leading-relaxed mb-4">{item?.refForm?.job_description}</p>
                    <hr></hr>
                    <a className="text-white inline-flex items-center cursor-pointer mt-4 bg-[#3d52f1] p-2  rounded" onClick={() => handleClick(item)}>Apply
                      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              })}
            </div>
          </div>
        </div>
      </Layout>

    </>
  )

}

export default All_referrals;