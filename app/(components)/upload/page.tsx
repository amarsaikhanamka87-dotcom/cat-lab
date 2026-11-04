"use client";

import { useRouter } from "next/navigation";

import { UploadIcon } from "/_icons/uplaod-icon";

import React from "react";

export default function Upload() {
  const router = useRouter();

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log("Selected files:", files);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleClick = () => {
    router.push("/label");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div
        className="border border-gray-300 rounded-md p-4 w-200 h-100
        flex items-center justify-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <button onClick={handleUploadClick}>
          <UploadIcon />
        </button>
      </div>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}>
        Next: Label photos
      </button>
    </div>
  );
}
