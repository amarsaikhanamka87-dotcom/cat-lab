"use client";

import React from "react";
import type * as tf from "@tensorflow/tfjs";
import { useRouter } from "next/navigation";
import { StepShell, secondaryBtn } from "../../_components/step-shell";
import { usePhotos } from "../../_features/photos/use-photos";
import { guessPhoto, type Guess } from "../../_features/test/guess-photo";
import { loadTrainedModel } from "../../_features/test/load-trained-model";

import { ResultLine } from "../../_components/result-line";
import { UploadIcon } from "@/app/_icons/uplaod-icon";

const TestPage = () => {
  const router = useRouter();
  const { photos, isLoading, error: loadError } = usePhotos("testing");
  const [model, setModel] = React.useState<tf.LayersModel | null>(null);
  const [results, setResults] = React.useState<Record<string, Guess>>({});
  const [own, setOwn] = React.useState<{ url: string; result?: Guess } | null>(
    null,
  );
  const [error, setError] = React.useState<string | null>(null);

  // Only test photos with a label can be checked (we need the right answer).
  const labeled = React.useMemo(() => photos.filter((p) => p.label), [photos]);

  // Load the trained model once; free it when leaving the page.
  React.useEffect(() => {
    let loaded: tf.LayersModel | null = null;
    let cancelled = false;
    loadTrainedModel()
      .then((m) => {
        if (cancelled) return m.dispose();
        loaded = m;
        setModel(m);
      })
      .catch((err) => !cancelled && setError((err as Error).message));
    return () => {
      cancelled = true;
      loaded?.dispose();
    };
  }, []);

  // Guess every hidden test photo, one by one.
  React.useEffect(() => {
    if (!model) return;
    let cancelled = false;
    (async () => {
      for (const photo of labeled) {
        try {
          const result = await guessPhoto(
            model,
            photo.imageUrl ?? photo.storagePath,
          );
          if (cancelled) return;
          setResults((old) => ({ ...old, [photo.id]: result }));
        } catch (err) {
          console.error("[test]", photo.id, err);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [model, labeled]);

  // Try a photo from your own computer (not saved anywhere).
  const tryOwnPhoto = async (file: File | undefined) => {
    if (!file || !model) return;
    if (own) URL.revokeObjectURL(own.url);
    const url = URL.createObjectURL(file);
    setOwn({ url });
    try {
      setOwn({ url, result: await guessPhoto(model, url) });
    } catch {
      setError("Could not read that photo. Try another one.");
    }
  };

  const checked = labeled.filter((p) => results[p.id]);
  const correct = checked.filter((p) => results[p.id].guess === p.label);

  return (
    <StepShell current={3} title="Test the model">
      {(loadError || error) && (
        <p className="mt-4 rounded-[12px] bg-red-500/10 px-4 py-3 text-[14px] text-red-600">
          {loadError ?? error}
        </p>
      )}

      {isLoading && <p className="mt-4 text-[var(--muted)]">Loading photos…</p>}

      {!isLoading && !loadError && labeled.length === 0 && (
        <p className="mt-4 text-[var(--muted)]">
          No labeled test photos yet. About 1 in 5 uploads is kept for testing,
          so upload and label a few more.
        </p>
      )}

      {labeled.length > 0 && model && (
        <>
          <p className="mt-6 mb-3 text-[16px] font-extrabold text-[var(--text)]">
            {correct.length} of {checked.length} correct
            {checked.length > 0 &&
              ` (${Math.round((correct.length / checked.length) * 100)}%)`}
            {checked.length < labeled.length && " — checking…"}
          </p>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {labeled.map((photo) => (
              <li
                key={photo.id}
                className="overflow-hidden rounded-[12px] border border-[var(--surface-border)] bg-[var(--surface-card)]">
                <img
                  src={photo.imageUrl ?? photo.storagePath}
                  alt="Test photo"
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
                <ResultLine result={results[photo.id]} answer={photo.label} />
              </li>
            ))}
          </ul>
        </>
      )}

      {model && (
        <div className="mt-8 rounded-[12px] border border-[var(--surface-border)] bg-[var(--surface-card)] p-4">
          <label className="text-[14px] font-bold text-[var(--text)] flex flex-col items-center gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => tryOwnPhoto(e.target.files?.[0])}
              className="text-[14px]"
            />
            <UploadIcon />
          </label>
          {own && (
            <div className="mt-3 w-40 overflow-hidden rounded-[12px] border border-[var(--surface-border)]">
              <img
                src={own.url}
                alt="Your photo"
                className="aspect-square w-full object-cover"
              />
              <ResultLine result={own.result} />
            </div>
          )}
        </div>
      )}

      <div className="mt-8 flex justify-start">
        <button
          type="button"
          onClick={() => router.push("/train")}
          className={secondaryBtn}>
          Back
        </button>
      </div>
      <ResultLine result={own?.result} />
    </StepShell>
  );
};

export default TestPage;
