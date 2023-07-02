import React from 'react'
import Link from 'next/link'

function index() {
    return (
        <main className={`flex min-h-screen w-full flex-col gap-4 p-8`}>
            <div className='flex flex-col gap-10 justify-center w-full bg-white shadow-lg rounded-lg p-4 h-52'>
                <div className='text-6xl font-bold text-center'>
                    Lets! Unlock your Role!
                </div>
                <div className='flex gap-4 w-full justify-center items-center'>
                    <Link href={'/type/dashboard'}>
                        <button className='rounded-lg text-lg py-2 px-5 bg-green-400 text-white items-center justify-center flex'>
                            Hire
                        </button>
                    </Link>
                    <Link href={'/type/user'}>
                        <button className='rounded-lg text-lg py-2 px-5 bg-green-400 text-white items-center justify-center flex'>
                            User
                        </button>
                    </Link>
                </div>

            </div>

        </main>
    )
}

export default index
