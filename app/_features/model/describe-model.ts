import type * as tf from "@tensorflow/tfjs";

// List the model's layers and how many numbers each one learns.
export const describeModel = (model: tf.Sequential) => ({
  layers: model.layers.map((layer) => ({
    name: layer.getClassName(),
    params: layer.countParams(),
  })),
  totalParams: model.countParams(),
});
