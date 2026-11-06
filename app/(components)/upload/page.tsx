"use client";

import { useRouter } from "next/navigation";
import React from "react";
import axios from "axios";

import { UploadIcon } from "../../_icons/uplaod-icon";
import { StepShell, primaryBtn } from "../../_components/step-shell";

type UploadItem = {
  id: string;
  name: string;
  status: "uploading" | "done" | "error";
  url?: string;
  error?: string;
};

export default function Upload() {
  const router = useRouter();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [items, setItems] = React.useState<UploadItem[]>([]);
  const [dragging, setDragging] = React.useState(false);

  const updateItem = (id: string, patch: Partial<UploadItem>) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, ...patch } : it)),
    );

  const uploadFiles = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList).filter((f) =>
      f.type.startsWith("image/"),
    );
    if (files.length === 0) return;

    const newItems: UploadItem[] = files.map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      status: "uploading",
    }));
    setItems((prev) => [...newItems, ...prev]);

    await Promise.all(
      files.map(async (file, i) => {
        const id = newItems[i].id;
        const formData = new FormData();
        formData.append("file", file);
        try {
          const { data } = await axios.post("/api/photos", formData);
          updateItem(id, {
            status: "done",
            url: data.photo.imageUrl ?? data.photo.storagePath,
          });
        } catch (err) {
          const message = axios.isAxiosError(err)
            ? (err.response?.data?.error ?? err.message)
            : "Upload failed";
          console.error("Error uploading photo:", message);
          updateItem(id, { status: "error", error: message });
        }
      }),
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) uploadFiles(event.target.files);
    event.target.value = ""; // allow re-selecting the same file
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    uploadFiles(event.dataTransfer.files);
  };

  const uploading = items.some((it) => it.status === "uploading");
  const doneCount = items.filter((it) => it.status === "done").length;

  return (
    <StepShell current={0} title="Upload training images">
      <div
        role="button"
        tabIndex={0}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={[
          "flex min-h-[240px] cursor-pointer flex-col items-center justify-center rounded-[20px] border-[3px] border-dashed px-5 py-8 text-center transition-colors sm:min-h-[280px]",
          dragging
            ? "border-[var(--primary)] bg-[var(--info-bg)]"
            : "border-[var(--surface-dashed)] bg-[var(--surface-card)] hover:border-[var(--primary)] hover:bg-[var(--info-bg)]",
        ].join(" ")}>
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
        <h2 className="font-display text-[22px] leading-none tracking-[-0.03em] text-[var(--text)] sm:text-[26px]">
          Upload your photos
        </h2>
        <p className="mt-3 max-w-md text-[15px] text-[var(--muted)] sm:text-[17px]">
          Click or drag &amp; drop cat images here to begin training.
        </p>
      </div>

      {items.length > 0 && (
        <section className="mt-6">
          <p className="mb-3 text-[14px] font-bold text-[var(--muted)]">
            {doneCount} of {items.length} uploaded
          </p>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((it) => (
              <li
                key={it.id}
                className="overflow-hidden rounded-[12px] border border-[var(--surface-border)] bg-[var(--surface-card)]">
                {it.status === "done" && it.url ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={it.url}
                      alt={it.name}
                      className="aspect-square w-full object-cover"
                    />
                    <div className="p-2">
                      <a
                        href={it.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-[10px] bg-[var(--primary)] px-4 py-2 text-center text-[14px] font-extrabold text-white hover:bg-[var(--primary-hover)]">
                        Open
                      </a>
                    </div>
                  </>
                ) : (
                  <div
                    className={[
                      "flex aspect-square items-center justify-center p-3 text-center text-[13px]",
                      it.status === "error"
                        ? "text-red-600"
                        : "text-[var(--muted)]",
                    ].join(" ")}>
                    {it.status === "error"
                      ? `${it.name}: ${it.error}`
                      : "Uploading…"}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-6 rounded-[12px] bg-[var(--info-bg)] px-5 py-4 text-[15px] text-[var(--text)]">
        <span className="font-extrabold text-[var(--primary)]">Tip:</span> Use
        clear, well-lit images to help the model learn faster.
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => router.push("/label")}
          disabled={uploading || doneCount === 0}
          className={primaryBtn}>
          {uploading ? "Uploading…" : "Next: Label photos"}
        </button>
      </div>
    </StepShell>
  );
}
