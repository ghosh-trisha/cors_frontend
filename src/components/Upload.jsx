import React, { useState } from "react";
import { FileInput, Label } from "flowbite-react";
import { Button, TextInput } from "flowbite-react";
import { Clipboard } from "flowbite-react";
import { Card } from "flowbite-react";
import axios from "axios";
import AxiosHandler from "../utils/AxiosHandler.jsx";
import { CirclesWithBar } from "react-loader-spinner";

function Upload() {
  const [files, setFiles] = useState(null);
  const [time, setTime] = useState(5);
  const [accessCode, setAccessCode] = useState("");
  const [loading, setLoading] = useState(false);
  const onchangeHandler = (e) => {
    // console.log(e.target.files);
    setFiles(e.target.files);
    // console.log(e.target.files);
  };

  const ontimeChange = (e) => {
    // console.log(e.target.value);
    setTime(e.target.value);
    // console.log(e.target.value);
  };

  const onClickSend = async () => {
    if (!files || files.length === 0) {
      console.log("No files selected.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("givenfiles", files[i]);
    }
    formData.append("timeOut", time);
    setLoading(true);
    const response = await AxiosHandler("post", "/upload", formData);
    setLoading(false);
    setAccessCode(response.data.accessCode);

    // try {
    //   const response = await axios.post(
    //     'http://localhost:3000/api/v1/cors/upload',
    // //     'https://cors-backend-u0je.onrender.com/api/v1/cors/upload',
    //     formData,
    //     {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //       withCredentials: true,
    //     }
    //   );
    //   console.log(response.data);
    // } catch (err) {
    //   console.error('Error during file upload:', err);
    // }
  };

  return (
    <div className="flex flex-col w-full items-center justify-center md:h-screen">
      <Button type="" className="w-28 mt-5 h-10">
        Upload
      </Button>

      {/* put folder */}
      <div className="w-full mt-20 pl-10 pr-20">
        <Label
          htmlFor="multiple-file-upload"
          className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            {files == null ? (
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            ) : (
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                {`${files.length} files`}
                <br />
                {` ${files[0].name}...`}
              </p>
            )}
          </div>
          <FileInput
            id="multiple-file-upload"
            className="hidden"
            onChange={(e) => {
              onchangeHandler(e);
            }}
            multiple
          />
        </Label>
      </div>

      {/* put time */}
      <div className="m-10 w-96">
        <div className="mb-2 block">
          <Label htmlFor="timeOut" value="Time Out" />
        </div>
        <TextInput
          id="timeOut"
          type="number"
          placeholder="availability time (in minutes)"
          required
          onChange={(e) => {
            ontimeChange(e);
          }}
        />
      </div>

      {/* send button */}
      <Button type="submit" className="w-32 " onClick={onClickSend}>
        {loading ? (
          <CirclesWithBar
            height="23"
            width="23"
            color="#FFFF"
            outerCircleColor="#FFFF"
            innerCircleColor="#FFFF"
            barColor="#FFFF"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : (
          "Send"
        )}
      </Button>

      {/* get code section */}
      <div className="mt-[auto] mb-10 max-md:mt-20">
        <div className="grid w-full max-w-[23rem] grid-cols-8 gap-2 ">
          <label htmlFor="npm-install" className="sr-only">
            Label
          </label>
          <input
            id="npm-install"
            type="text"
            className="col-span-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={accessCode}
            disabled
            readOnly
          />
          <Clipboard
            className="bg-[#0891B2]"
            valueToCopy={accessCode}
            label="Copy"
          />
        </div>
      </div>
    </div>
  );
}

export default Upload;
