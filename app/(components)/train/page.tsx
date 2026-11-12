"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  StepShell,
  primaryBtn,
  secondaryBtn,
} from "../../_components/step-shell";
import { usePhotos } from "../../_features/photos/use-photos";
import { saveTrainingRun } from "../../_features/train/save-training-run";
import { trainModel, type RoundResult } from "../../_features/train/train-model";

import { AccuracyChart } from "../../_components/accuracy-chart";

type Status = "idle" | "training" | "done";

const TrainPage = () => {
  const router = useRouter();
  const { photos, isLoading, error: loadError } = usePhotos("training");
  const [rounds, setRounds] = React.useState(10);
  const [status, setStatus] = React.useState<Status>("idle");
  const [points, setPoints] = React.useState<number[]>([]); // accuracy per round
  const [latest, setLatest] = React.useState<RoundResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // Only photos with a label can teach the model.
  const labeled = photos.filter((p) => p.label);
  const canTrain = labeled.length >= 2 && status !== "training";

  const startTraining = async () => {
    setError(null);
    setPoints([]);
    setLatest(null);
    setStatus("training");
    try {
      const accuracy = await trainModel({
        photos: labeled,
        rounds,
        onRound: (result) => {
          setPoints((old) => [...old, result.accuracy]);
          setLatest(result);
        },
      });
      await saveTrainingRun(rounds, accuracy);
      setStatus("done");
    } catch (err) {
      console.error("[train]", err);
      setError((err as Error).message || "Training failed. Try again.");
      setStatus("idle");
    }
  };

  return (
    <StepShell current={2} title="Train the model">
      <div className="rounded-[16px] bg-[var(--info-bg)] px-5 py-6 text-[16px] text-[var(--text)]">
        Training will use your labeled photos to teach the model what a cat
        looks like.
      </div>

      {isLoading && <p className="mt-4 text-[var(--muted)]">Loading photos…</p>}

      {(loadError || error) && (
        <p className="mt-4 rounded-[12px] bg-red-500/10 px-4 py-3 text-[14px] text-red-600">
          {loadError ?? error}
        </p>
      )}

      {!isLoading && !loadError && (
        <div className="mt-6 flex flex-col gap-4">
          <p className="text-[14px] font-bold text-[var(--muted)]">
            {labeled.length} labeled training photos
            {labeled.length < 2 && " (label at least 2 to train)"}
          </p>

          <label className="flex items-center gap-3 text-[14px] text-[var(--text)]">
            Rounds: <strong className="w-8">{rounds}</strong>
            <input
              type="range"
              min={1}
              max={50}
              value={rounds}
              disabled={status === "training"}
              onChange={(e) => setRounds(Number(e.target.value))}
              className="flex-1"
            />
          </label>

          <button
            type="button"
            onClick={startTraining}
            disabled={!canTrain}
            className={primaryBtn}>
            {status === "training" ? "Training…" : "Start training"}
          </button>

          {points.length > 0 && <AccuracyChart points={points} />}

          {latest && (
            <p className="text-[14px] text-[var(--text)]">
              Round {latest.round} of {rounds}: accuracy{" "}
              <strong>{Math.round(latest.accuracy * 100)}%</strong>, loss{" "}
              {latest.loss.toFixed(3)}
            </p>
          )}

          {status === "done" && (
            <p className="text-[14px] font-bold text-green-600">
              Done! The model is saved. Continue to test it.
            </p>
          )}
        </div>
      )}

      <div className="mt-8 flex justify-between gap-3">
        <button
          type="button"
          onClick={() => router.push("/label")}
          className={secondaryBtn}>
          Back
        </button>
        <button
          type="button"
          onClick={() => router.push("/test")}
          disabled={status !== "done"}
          className={primaryBtn}>
          Continue
        </button>
      </div>
    </StepShell>
  );
};

export default TrainPage;
