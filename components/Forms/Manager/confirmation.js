import React from "react";
import Image from "next/image";
import success from '../../../public/assets/success.svg'

const Confirmation = () => {
    return (
        <div>
            <div className="w-full flex flex-col gap-5 justify-center items-center">
                <Image width={80} src={success} alt='success' />
                <span>Profile Created Successfully!!</span>
            </div>
        </div>
    );
}

export default Confirmation;