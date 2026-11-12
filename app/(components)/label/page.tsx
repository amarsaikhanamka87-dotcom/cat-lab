"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  StepShell,
  primaryBtn,
  secondaryBtn,
} from "../../_components/step-shell";
import { buildModel } from "../../_features/model/build-model";
import { describeModel } from "../../_features/model/describe-model";
import { savePrep } from "../../_features/prep/save-prep";

type Label = "CAT" | "NOT_CAT";

type Photo = {
  id: string;
  storagePath: string;
  imageUrl?: string;
  label: Label | null;
};

const LABEL_OPTIONS: { value: Label; text: string; active: string }[] = [
  {
    value: "CAT",
    text: "🐱 Cat",
    active: "border-green-600 bg-green-600 text-white",
  },
  {
    value: "NOT_CAT",
    text: "🚫 Not cat",
    active: "border-red-600 bg-red-600 text-white",
  },
];

const LabelPage = () => {
  const router = useRouter();
  const [photos, setPhotos] = React.useState<Photo[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [savingId, setSavingId] = React.useState<string | null>(null);

  // GET all photos
  React.useEffect(() => {
    axios
      .get<Photo[]>("/api/photos")
      .then(({ data }) => setPhotos(data))
      .catch((err) =>
        setError(
          axios.isAxiosError(err)
            ? (err.response?.data?.error ?? err.message)
            : "Could not load photos",
        ),
      )
      .finally(() => setLoading(false));
  }, []);

  // PATCH a label (click the active label again to clear it)
  const chooseLabel = async (photo: Photo, label: Label) => {
    const next = photo.label === label ? null : label;
    setSavingId(photo.id);
    setError(null);
    try {
      const { data } = await axios.patch("/api/photos", {
        id: photo.id,
        label: next,
      });
      setPhotos((prev) =>
        prev.map((p) => (p.id === photo.id ? data.photo : p)),
      );
    } catch (err) {
      setError(
        axios.isAxiosError(err)
          ? (err.response?.data?.error ?? err.message)
          : "Could not save label",
      );
    } finally {
      setSavingId(null);
    }
  };

  const labeled = photos.filter((p) => p.label).length;

  //delete req

  const deleteBtn = async (photo: Photo) => {
    console.log("deleteBtn clicked for photo:", photo);

    try {
      const { data } = await axios.delete("/api/photos", {
        data: { id: photo.id },
      });
      console.log("data from delete request:", data);
      setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    } catch (err) {
      setError(
        axios.isAxiosError(err)
          ? (err.response?.data?.error ?? err.message)
          : "Could not delete photo",
      );
    }
  };

  const modelInfo = React.useMemo(() => {
    const model = buildModel();
    const info = describeModel(model);
    model.dispose(); // free GPU memory; we only needed the summary
    return info;
  }, []);

  React.useEffect(() => {
    savePrep({
      photos: photos
        .filter((p) => p.label)
        .map((p) => ({
          url: p.imageUrl ?? p.storagePath,
          isCat: p.label === "CAT",
        })),
      finders: [],
      ...modelInfo,
    });
    console.log("modelInfo saved:", modelInfo);
  }, [photos, modelInfo]);

  return (
    <StepShell current={1} title="Tell the model what each photo is">
      {loading && <p className="text-[var(--muted)]">Loading photos…</p>}

      {error && (
        <p className="mb-4 rounded-[12px] bg-red-500/10 px-4 py-3 text-[14px] text-red-600">
          {error}
        </p>
      )}

      {!loading && photos.length === 0 && !error && (
        <p className="text-[var(--muted)]">
          No photos yet — go back and upload some.
        </p>
      )}

      {photos.length > 0 && (
        <>
          <p className="mb-3 text-[14px] font-bold text-[var(--muted)]">
            {labeled} of {photos.length} labeled
          </p>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {photos.map((photo) => (
              <li
                key={photo.id}
                className="overflow-hidden rounded-[12px] border border-[var(--surface-border)] bg-[var(--surface-card)]">
                <a
                  href={photo.imageUrl ?? photo.storagePath}
                  target="_blank"
                  rel="noreferrer">
                  <img
                    src={photo.imageUrl ?? photo.storagePath}
                    alt="Uploaded photo"
                    loading="lazy"
                    className="aspect-square w-full object-cover"
                  />
                </a>
                <button
                  type="button"
                  className="bg-red-600 px-2 text-white"
                  onClick={() => deleteBtn(photo)}>
                  X
                </button>
                <div className="grid grid-cols-2 gap-2 p-2">
                  {LABEL_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      disabled={savingId === photo.id}
                      onClick={() => chooseLabel(photo, opt.value)}
                      className={[
                        "rounded-[10px] border-2 px-2 py-2 text-[13px] font-extrabold transition-colors disabled:opacity-50",
                        photo.label === opt.value
                          ? opt.active
                          : "border-[var(--surface-border)] bg-[var(--surface-card-strong)] text-[var(--text)] hover:bg-[var(--info-bg)]",
                      ].join(" ")}>
                      {opt.text}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-8 flex justify-between gap-3">
        <button
          type="button"
          onClick={() => router.push("/upload")}
          className={secondaryBtn}>
          Back
        </button>
        <button
          type="button"
          onClick={() => router.push("/train")}
          disabled={photos.length === 0 || labeled < photos.length}
          className={primaryBtn}>
          Continue
        </button>
      </div>
    </StepShell>
  );
};

export default LabelPage;
