import * as tf from "@tensorflow/tfjs";
import { SIZE } from "../../_components/pixel-view";

// Build the small cat / not-cat model.
export const buildModel = () => {
  const model = tf.sequential();
  model.add(
    tf.layers.conv2d({
      inputShape: [SIZE, SIZE, 3],
      filters: 8,
      kernelSize: 3,
      activation: "relu",
    }),
  );
  model.add(tf.layers.maxPooling2d({ poolSize: 2 }));
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));
  return model;
};
