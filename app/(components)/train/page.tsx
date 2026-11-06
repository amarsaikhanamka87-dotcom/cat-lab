"use client";

import { useRouter } from "next/navigation";
import {
  StepShell,
  primaryBtn,
  secondaryBtn,
} from "../../_components/step-shell";

const TrainPage = () => {
  const router = useRouter();

  return (
    <StepShell current={2} title="Train the model">
      <div className="rounded-[16px] bg-[var(--info-bg)] px-5 py-6 text-[16px] text-[var(--text)]">
        Training will use your labeled photos to teach the model what a cat
        looks like.
      </div>

      <div className="mt-8 flex justify-between gap-3">
        <button
          type="button"
          onClick={() => router.push("/label")}
          className={secondaryBtn}
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => router.push("/test")}
          className={primaryBtn}
        >
          Continue
        </button>
      </div>
    </StepShell>
  );
};

export default TrainPage;
