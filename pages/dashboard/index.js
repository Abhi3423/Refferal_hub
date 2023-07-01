import Image from 'next/image'
import { Inter } from 'next/font/google'
import Stepper from '@/components/Cards/stepper'
import Personal_info from '@/components/Forms/Manager/personal_info'
import Company_info from '@/components/Forms/Manager/company_info'
import Confirmation from '@/components/Forms/Manager/confirmation'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col gap-4 p-8 ${inter.className}`}
    >
      <Stepper />

      {/* <div className='rounded-lg shadow-lg bg-slate-100 p-4'>
        <Personal_info />
      </div> */}

      {/* <div className='rounded-lg shadow-lg bg-slate-100 p-4'>
        <Company_info />
      </div> */}

      <div className='rounded-lg shadow-lg bg-slate-100 p-4 py-12'>
        <Confirmation />
      </div> 

    </main>
  )
}
