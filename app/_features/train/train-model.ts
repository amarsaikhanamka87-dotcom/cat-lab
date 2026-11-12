import * as tf from "@tensorflow/tfjs";
import { buildModel } from "../model/build-model";
import { MODEL_KEY } from "../model/model-key";
import type { PhotoType } from "../photos/photo-type";
import { photosToTensors } from "./photos-to-tensors";

// What the screen shows after each round.
export type RoundResult = {
  round: number;
  accuracy: number; // 0 to 1
  loss: number;
  finders: string[];
  changes: number[];
  changedPercent: number;
  guesses: number[]; // 1 = cat, 0 = not cat, one per photo
};

export const trainModel = async ({
  photos,
  rounds,
  onRound,
}: {
  photos: PhotoType[];
  rounds: number;
  onRound: (result: RoundResult) => void;
}) => {
  const { xs, ys } = await photosToTensors(photos);
  const model = buildModel();
  model.compile({
    optimizer: "adam",
    loss: "binaryCrossentropy",
    metrics: ["accuracy"],
  });

  let accuracy = 0;
  try {
    await model.fit(xs, ys, {
      epochs: rounds, // how many rounds the student picked
      shuffle: true, // mix the cards each round
      callbacks: {
        // TensorFlow calls this after every round.
        onEpochEnd: (epoch, logs) => {
          accuracy = (logs?.acc as number) ?? 0;

          // The model's guess for every photo right now: 1 = cat, 0 = not cat.
          const output = model.predict(xs) as tf.Tensor;
          const guesses = Array.from(output.dataSync(), (value) =>
            value > 0.5 ? 1 : 0,
          );
          output.dispose();

          onRound({
            round: epoch + 1,
            accuracy,
            loss: (logs?.loss as number) ?? 0,
            finders: [],
            changes: [],
            changedPercent: 0,
            guesses,
          });
        },
      },
    });

    await model.save(MODEL_KEY); // keep it for the Test step
    return accuracy;
  } finally {
    xs.dispose();
    ys.dispose();
    model.dispose();
  }
};
