import React from "react";
import create_referral from "./create-referral";
import Layout from "@/components/manager_shared/layout";

function profile() {
  return (
    <Layout>
      <div className="w-full bg-white rounded-lg p-4">
        <create_referral />
      </div>
    </Layout>
  );
}

export default profile;
