import Image from "next/image";
import { useContext } from "react";
import { Inter } from "next/font/google";
import Stepper from "@/components/Cards/stepper";
import Personal_info from "@/components/Forms/Candidate/personal_info";
import Resume_info from "@/components/Forms/Candidate/resume";
import Confirmation from "@/components/Forms/Manager/confirmation";
import { AuthContext } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { step } = useContext(AuthContext);
  return (
    <main className={`flex min-h-screen flex-col gap-4 p-8 ${inter.className}`}>
      <Stepper />

      {step == 1 && (
        <div className="rounded-lg shadow-lg bg-slate-100 p-4">
          <Personal_info />
        </div>
      )}

      {step == 2 && (
        <div className="rounded-lg shadow-lg bg-slate-100 p-4">
          <Resume_info />
        </div>
      )}

      {step == 3 && (
        <div className="rounded-lg shadow-lg bg-slate-100 p-4 py-12">
          <Confirmation />
        </div>
      )}
    </main>
  );
}
