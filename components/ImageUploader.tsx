"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { PrimaryButton } from "../ui/Button";

const removeBg = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const url = "http://localhost:5000";
  let img = "";
  try {
    const res = await fetch(url, { method: "POST", body: formData });
    const imgBlob = await res.blob();
    img = URL.createObjectURL(imgBlob);
  } catch (error) {
    console.log(error);
  }
  return img;
};

const downloadImage = (href: string) => {
  const link = document.createElement("a");
  link.href = href;
  link.download = "removed-bg-img";
  link.click();
};

const ImageUploader = () => {
  const [file, setFile] = useState<File>();
  const [remBgImg, setRemBgImg] = useState<string>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files) setFile(e?.target?.files[0]);
  };

  useEffect(() => {
    if (file) {
      (async () => {
        const img = await removeBg(file);
        if (img) setRemBgImg(img);
      })();
    }
  }, [file]);

  return (
    <div className="mt-1 sm:mt-0 sm:col-span-2">
      <div className="mx-auto max-w-lg flex justify-center px-6 pt-16 pb-20 border-2 border-gray-300 border-dashed rounded-md">
        {remBgImg ? (
          <div className="">
            <Image
              src={remBgImg}
              alt="remove-bg-img"
              width={200}
              height={200}
              style={{ objectFit: "contain" }}
              className="mb-4"
            />
            <PrimaryButton onClick={() => downloadImage(remBgImg)}>
              Download
            </PrimaryButton>
          </div>
        ) : (
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span className="block w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900">
                  Upload an image
                </span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleChange}
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
