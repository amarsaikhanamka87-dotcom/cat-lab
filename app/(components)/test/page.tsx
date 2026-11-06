"use client";

import { useRouter } from "next/navigation";
import { StepShell, secondaryBtn } from "../../_components/step-shell";

const TestPage = () => {
  const router = useRouter();

  return (
    <StepShell current={3} title="Test the model">
      <div className="rounded-[16px] bg-[var(--info-bg)] px-5 py-6 text-[16px] text-[var(--text)]">
        Upload a new photo to see whether the model thinks it&apos;s a cat.
      </div>

      <div className="mt-8 flex justify-start">
        <button
          type="button"
          onClick={() => router.push("/train")}
          className={secondaryBtn}
        >
          Back
        </button>
      </div>
    </StepShell>
  );
};

export default TestPage;
