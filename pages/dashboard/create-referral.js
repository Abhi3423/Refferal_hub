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

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      !refForm?.position ||
      !refForm?.city ||
      !refForm?.company_name ||
      !refForm?.min_experience ||
      !refForm?.job_description
    )
      alert("Please fill all the fields");
    try {
      const res = await fetch("/api/referral", {
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
      router.push("/dashboard");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Layout>
      <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div class="text-gray-600">
            <p class="font-medium text-lg">{user?.currentUserDetails?.name}</p>
            <p>{user?.currentUserDetails?.email}</p>
          </div>

          <div class="lg:col-span-2">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div class="md:col-span-5">
                <label for="full_name">Full Name</label>
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
                <label for="address">Referral Position </label>
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
                <label for="city">City</label>
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
                <label for="address">Company Name </label>
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
                <label for="city">Minimum Experience (yr)</label>
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
              <div class="md:col-span-5">
                <label for="state">Job Description</label>
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
