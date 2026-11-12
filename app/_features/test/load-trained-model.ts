import * as tf from "@tensorflow/tfjs";
import { MODEL_KEY } from "../model/model-key";

// Load the model the Train step saved in this browser.
export const loadTrainedModel = async () => {
  try {
    return await tf.loadLayersModel(MODEL_KEY);
  } catch {
    throw new Error("No trained model found. Go back and train one first.");
  }
};
