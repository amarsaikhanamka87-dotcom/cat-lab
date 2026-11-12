import * as tf from "@tensorflow/tfjs";
import { loadImage, toNumbers } from "../../_components/pixel-view";

export type Guess = { guess: "CAT" | "NOT_CAT"; score: number };

// Ask the model about one photo.
export const guessPhoto = async (
  model: tf.LayersModel,
  url: string,
): Promise<Guess> => {
  const img = await loadImage(url);
  const score = tf.tidy(() => {
    const input = toNumbers(img).expandDims(0); // a pile with just 1 photo
    const output = model.predict(input) as tf.Tensor;
    return output.dataSync()[0]; // 0 to 1
  });
  return { guess: score > 0.5 ? "CAT" : "NOT_CAT", score };
};
