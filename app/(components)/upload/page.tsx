"use client";

import { useRouter } from "next/navigation";
import React from "react";
import axios from "axios";

import { UploadIcon } from "../../_icons/uplaod-icon";

const steps = [
  { number: 1, label: "Upload" },
  { number: 2, label: "Label" },
  { number: 3, label: "Train" },
];

export default function Upload() {
  const router = useRouter();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const response = await axios.post("/api/photos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Photo uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  const handleClick = () => {
    router.push("/label");
  };

  const addPhoto = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-[var(--page-bg)] px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl rounded-[24px] border border-[var(--surface-border)] bg-[var(--surface-card)] p-5 sm:p-6 lg:p-8">
        <div className="rounded-[16px] border border-[var(--surface-border)] bg-[var(--surface-card-strong)] p-5 sm:p-6 lg:p-8">
          <div className="mb-8 flex flex-col gap-4">
            <div className="text-left">
              <p className="font-bold uppercase tracking-[0.12em] text-[11px] sm:text-[14px] text-[var(--primary)]">
                part 3 · training ground
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h1 className="font-display text-[30px] leading-none tracking-[-0.04em] text-[var(--text)] sm:text-[40px]">
                Upload training images
              </h1>
            </div>
          </div>

          <div className="mb-8 flex items-start justify-center sm:justify-between">
            <div className="flex w-full max-w-2xl items-center justify-between gap-2 sm:gap-4">
              {steps.map((step, index) => {
                const isActive = index === 0;
                const isCompleted = index < 1;

                return (
                  <div
                    key={step.number}
                    className="flex flex-1 flex-col items-center justify-center gap-2"
                  >
                    <div
                      className={[
                        "flex h-11 w-11 items-center justify-center rounded-full border text-sm font-extrabold transition-all sm:h-14 sm:w-14 sm:text-base",
                        isActive
                          ? "border-transparent bg-[var(--primary)] text-white"
                          : isCompleted
                            ? "border-transparent bg-[var(--primary)] text-white"
                            : "border-[3px] border-[var(--surface-border)] bg-white text-[var(--muted)]",
                      ].join(" ")}
                    >
                      {isCompleted ? "✓" : step.number}
                    </div>

                    <div className="hidden text-center sm:block">
                      <p
                        className={[
                          "text-[11px] font-bold uppercase tracking-[0.08em]",
                          isActive || isCompleted
                            ? "text-[var(--text)]"
                            : "text-[var(--muted)]",
                        ].join(" ")}
                      >
                        {step.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[16px] border border-[var(--surface-border)] bg-[var(--surface-card-strong)] p-4 sm:p-6">
            <div
              onClick={addPhoto}
              className="group flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-[20px] border-[3px] border-dashed border-[var(--surface-dashed)] bg-[#f8f9ff] px-5 py-8 text-center transition-colors duration-200 hover:border-[var(--primary)] hover:bg-[#f7f8ff] focus-within:border-[var(--primary)] focus-within:bg-[#f7f8ff] sm:min-h-[300px]"
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                multiple
                className="hidden"
              />

              <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--info-bg)] text-[var(--primary)]">
                <UploadIcon />
              </div>

              <h2 className="font-display text-[22px] leading-none tracking-[-0.04em] text-[var(--text)] sm:text-[26px]">
                Upload your photos
              </h2>
              <p className="mt-3 max-w-md text-[16px] text-[var(--muted)] sm:text-[20px]">
                Drop a few cat images here to begin training.
              </p>
            </div>

            <div className="mt-6 rounded-[12px] bg-[var(--info-bg)] px-5 py-4 text-[15px] text-[var(--text)] sm:text-[16px]">
              <span className="font-extrabold text-[var(--primary)]">Tip:</span>{" "}
              Use clear, well-lit images to help the model learn faster.
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleClick}
                className="inline-flex items-center justify-center rounded-[12px] bg-[var(--primary)] px-6 py-3 text-[17px] font-extrabold text-white transition-colors hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next: Label photos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
