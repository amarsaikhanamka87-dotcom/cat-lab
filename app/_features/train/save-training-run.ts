import axios from "axios";

// Save the result in the database (POST /api/training).
export const saveTrainingRun = async (rounds: number, accuracy: number) => {
  try {
    const response = await axios.post("/api/training", {
      rounds,
      accuracy,
    });
    console.log("[train/saveTrainingRun] response:", response.data);
  } catch (err) {
    console.error("[train/saveTrainingRun]", err);
    throw new Error(
      axios.isAxiosError(err)
        ? (err.response?.data?.error ?? err.message)
        : "Could not save training run",
    );
  }
};
