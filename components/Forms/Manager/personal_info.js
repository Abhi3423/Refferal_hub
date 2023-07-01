import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Personal_info = () => {

    const formik = useFormik({
        initialValues: {
            palette: "",
            isAvailable: "",
            inventoryCount: undefined,
            availableDate: undefined,
            file: "",
        },
        validationSchema: Yup.object().shape({
            palette: Yup.string().required("* Palette is required"),
            isAvailable: Yup.string().required("* Availability status is required"),
            inventoryCount: Yup.number().when("isAvailable", {
                is: "yes",
                then: Yup.number()
                    .required("* Inventory count is required")
                    .min(1, "minimum 1 quantity needed"),
            }),
            availableDate: Yup.date().when("isAvailable", {
                is: "no",
                then: Yup.date().required("* Date is required"),
            }),
            file: Yup.mixed()
                .required("* Image required")
                .test(
                    "fileFormat",
                    "Unsupported file format",
                    (value) =>
                        value &&
                        ["image/jpeg", "image/png", "image/gif"].includes(value.type)
                )
                .test(
                    "fileSize",
                    "File size is too large",
                    (value) => value && value.size <= 1000000 // 1 MB
                ),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });


    return (
        <form className="flex flex-col gap-4 mt-4" onSubmit={formik.handleSubmit}>

            <div className="w-full flex gap-5 justify-center items-center">
                <div className="w-28 h-28 rounded-full bg-purple-600"></div>
                <div className="flex flex-col gap-2">
                    <div>NAME</div>
                    <div>EMAIL@gmail.com</div>
                </div>
            </div>

            <div className="flex justify-center items-center w-full">
                <div className="font-normal text-sm grid grid-cols-2 gap-x-40 items-center">
                    <label htmlFor="color">Palette </label>
                    <input
                        className="w-12 h-8"
                        type="color"
                        name="palette"
                        value={formik.values.palette}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.palette && formik.errors.palette ? (
                        <div className="text-red-500 text-xs col-start-2 mt-1">
                            {formik.errors.palette}
                        </div>
                    ) : (
                        <div className="text-red-500 text-xs col-start-2 mt-1 w-full h-4"></div>
                    )}
                </div>
            </div>


            <div className="ml-8 font-normal text-sm grid grid-cols-2 items-center w-full">
                <label htmlFor="color">Palette </label>
                <input
                    className="w-12 h-8"
                    type="color"
                    name="palette"
                    value={formik.values.palette}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.palette && formik.errors.palette ? (
                    <div className="text-red-500 text-xs col-start-2 mt-1">
                        {formik.errors.palette}
                    </div>
                ) : (
                    <div className="text-red-500 text-xs col-start-2 mt-1 w-full h-4"></div>
                )}
            </div>

            <div className="ml-8 font-normal text-sm grid grid-cols-2 items-center">
                <label htmlFor="color">Color Name </label>
                <input
                    className="w-fit px-4 py-2 border-solid border-[1.5px] border-[#E5E5E5] rounded-md font-semibold"
                    type="text"
                    value={formik.values.palette}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </div>

            <div className="grid grid-cols-2 items-center ml-8 text-sm">
                <label htmlFor="Availability">Availability Status :</label>
                <div
                    id="availability-type"
                    className="btn-group btn-group-toggle flex flex-row gap-3 font-normal"
                    data-toggle="buttons"
                >
                    <label>
                        Yes
                        <input
                            className="border-solid ml-2"
                            type="radio"
                            name="isAvailable"
                            value="yes"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </label>

                    <label>
                        No
                        <input
                            className="border-solid ml-2"
                            type="radio"
                            name="isAvailable"
                            value="no"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </label>
                </div>
                {formik.touched.isAvailable && formik.errors.isAvailable ? (
                    <div className="text-red-500 text-xs col-start-2 mt-1">
                        {formik.errors.isAvailable}
                    </div>
                ) : (
                    <div className="text-red-500 text-xs col-start-2 mt-1 w-full h-4"></div>
                )}
            </div>

            <div className="ml-8 font-normal text-sm h-6">
                {formik.values.isAvailable === "yes" && (
                    <label className="grid grid-cols-2 items-center">
                        <span>Inventory Count</span>
                        <input
                            className="w-fit px-4 py-2 border-solid border-[1.5px] border-[#E5E5E5] rounded-md font-semibold"
                            type="number"
                            name="inventoryCount"
                            value={formik.values.inventoryCount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.inventoryCount && formik.errors.inventoryCount ? (
                            <div className="text-red-500 text-xs col-start-2 mt-1">
                                {formik.errors.inventoryCount}
                            </div>
                        ) : (
                            <div className="text-red-500 text-xs col-start-2 mt-1 w-full h-4"></div>
                        )}
                    </label>
                )}

                {formik.values.isAvailable === "no" && (
                    <label className="grid grid-cols-2 items-center">
                        <span>Available Date</span>
                        {formik.touched.availableDate && formik.errors.availableDate ? (
                            <div className="text-red-500 text-xs col-start-2 mt-1">
                                {formik.errors.availableDate}
                            </div>
                        ) : (
                            <div className="text-red-500 text-xs col-start-2 mt-1 w-full h-4"></div>
                        )}
                    </label>
                )}
            </div>

            {/* <div className="flex justify-center mt-10">
                    <div className="">
                        <div className="preview">
                            <img
                                className="hidden w-[20vw] h-[20vh] p-2 border-solid border-2 border-[#023047] rounded-md"
                                id="preview-selected-image"
                                alt="preview-of-car"
                            />
                        </div>
                        <input
                            ref={hiddenFileInput}
                            id="file-upload"
                            name="file"
                            className="hidden"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                previewImage(e);
                                formik.setFieldValue("file", e.currentTarget.files[0]);
                            }}
                        />
                    </div>
                </div>
                <div className="w-full justify-center flex mt-1">
                    <div
                        onClick={handleClick}
                        className="flex gap-2 justify-center btn-md cursor-pointer btn-primary w-fit"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                        </svg>
                        Upload Images from gallery
                    </div>
                </div> */}

            {formik.touched.file && formik.errors.file ? (
                <div className="flex justify-center mr-40  text-red-500 text-xs -mt-2">
                    {formik.errors.file}
                </div>
            ) : (
                <div className="error-box -mt-2"></div>
            )}

            <div className="mt-3 flex flex-row gap-4 justify-center items-center text-sm font-semibold">
                <button className="discard group" onClick={() => setAddItem(false)}>
                    <div className="flex flex-row gap-3 justify-center items-center">
                        <svg
                            className="showsvg"
                            width="16"
                            height="22"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.52 5.27307L5.47998 10.3131M5.47998 5.27307L10.52 10.3131"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M8 14.793C11.866 14.793 15 11.659 15 7.79297C15 3.92698 11.866 0.792969 8 0.792969C4.13401 0.792969 1 3.92698 1 7.79297C1 11.659 4.13401 14.793 8 14.793Z"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        Discard
                    </div>
                </button>

                <button className="save group" type="submit" value="submit">
                    <svg
                        className="showsvg"
                        width="17"
                        height="24"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 7.79297L8 10.293L12 5.29297M8.5 14.793C7.58075 14.793 6.6705 14.6119 5.82122 14.2601C4.97194 13.9083 4.20026 13.3927 3.55025 12.7427C2.90024 12.0927 2.38463 11.321 2.03284 10.4718C1.68106 9.62247 1.5 8.71222 1.5 7.79297C1.5 6.87372 1.68106 5.96346 2.03284 5.11418C2.38463 4.26491 2.90024 3.49323 3.55025 2.84322C4.20026 2.19321 4.97194 1.67759 5.82122 1.32581C6.6705 0.974029 7.58075 0.792969 8.5 0.792969C10.3565 0.792969 12.137 1.53047 13.4497 2.84322C14.7625 4.15598 15.5 5.93645 15.5 7.79297C15.5 9.64948 14.7625 11.43 13.4497 12.7427C12.137 14.0555 10.3565 14.793 8.5 14.793Z"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    Add Variant Item
                </button>
            </div>

        </form>
    );
}

export default Personal_info;