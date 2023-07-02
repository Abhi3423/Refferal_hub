import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "@/components/manager_shared/layout";

function Create_referral() {
  const user = useContext(AuthContext);
  const [refForm, setRefForm] = useState({});
  const router = useRouter();
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");

  const handleSkillChange = (event) => {
    setCurrentSkill(event.target.value);
  };

  const handleAddSkill = () => {
    if (currentSkill.trim() !== "") {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setRefForm({ ...refForm, skill: skills });
    if (
      !refForm?.position ||
      !refForm?.city ||
      !refForm?.company_name ||
      !refForm?.min_experience ||
      !refForm?.job_description ||
      !skills.length
    ) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const res = await fetch("/api/data/create_referal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refForm,
          email: user?.currentUserDetails?.email,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      router.push("/type/dashboard/profile");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Layout>
      <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div class="flex flex-col text-gray-600 gap-1 items-center">
            <Image
              src={user?.currentUserDetails?.photo}
              width={100}
              height={100}
              alt="err"
              className="rounded-full"
            />
            <p class="font-medium text-lg">{user?.currentUserDetails?.name}</p>
            <p>{user?.currentUserDetails?.email}</p>
          </div>

          <div class="lg:col-span-2">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div class="md:col-span-5">
                <label className="font-medium text-gray-700" for="full_name">
                  Full Name
                </label>
                <input
                  type="text"
                  disabled="disabled"
                  name="full_name"
                  placeholder={user?.currentUserDetails?.name}
                  id="full_name"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50 cursor-not-allowed"
                  value=""
                />
              </div>

              <div class="md:col-span-3">
                <label className="font-medium text-gray-700" for="address">
                  Referral Position{" "}
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50 "
                  value={refForm?.position}
                  placeholder=""
                  onChange={(e) =>
                    setRefForm({ ...refForm, position: e.target.value })
                  }
                />
              </div>

              <div class="md:col-span-2">
                <label className="font-medium text-gray-700" for="city">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  value={refForm?.city}
                  placeholder=""
                  onChange={(e) =>
                    setRefForm({ ...refForm, city: e.target.value })
                  }
                />
              </div>
              <div class="md:col-span-3">
                <label className="font-medium text-gray-700" for="address">
                  Company Name{" "}
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  value={refForm?.company_name}
                  placeholder=""
                  onChange={(e) =>
                    setRefForm({ ...refForm, company_name: e.target.value })
                  }
                />
              </div>

              <div class="md:col-span-2">
                <label className="font-medium text-gray-700" for="city">
                  Minimum Experience (yr)
                </label>
                <input
                  type="number"
                  name="minExp"
                  id="minExp"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  value={refForm?.min_experience}
                  placeholder=""
                  onChange={(e) =>
                    setRefForm({ ...refForm, min_experience: e.target.value })
                  }
                />
              </div>

              <div className="md:col-span-5">
                <label className="block mb-2 font-medium text-gray-700">
                  Skills
                </label>
                <div className="flex flex-col flex-wrap gap-2">
                  <div className="flex items-center">
                    <input
                      name="skill"
                      type="text"
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter a skill"
                      value={currentSkill}
                      onChange={handleSkillChange}
                    />
                    <button
                      className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-md"
                      onClick={handleAddSkill}>
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <div
                        key={skill}
                        className="w-fit flex items-center px-3 py-1 rounded-md bg-blue-500 text-white cursor-pointer"
                        onClick={() => handleRemoveSkill(skill)}>
                        <span>{skill}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="ml-1 w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div class="md:col-span-5">
                <label className="font-medium text-gray-700" for="state">
                  Job Description
                </label>
                <textarea
                  name="job_description"
                  id="job_description"
                  value={refForm?.job_description}
                  class="h-40 appearance-none border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder=""
                  onChange={(e) =>
                    setRefForm({ ...refForm, job_description: e.target.value })
                  }
                />
              </div>

              <div class="md:col-span-5 text-right">
                <div class="inline-flex items-end">
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={(e) => {
                      onSubmit(e);
                    }}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Create_referral;
