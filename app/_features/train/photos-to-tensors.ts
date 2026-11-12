import * as tf from "@tensorflow/tfjs";
import { loadImage, toNumbers } from "../../_components/pixel-view";
import type { PhotoType } from "../photos/photo-type";

// Turn labeled photos into the number piles TensorFlow trains on.
export const photosToTensors = async (photos: PhotoType[]) => {
  const images = await Promise.all(
    photos.map((p) => loadImage(p.imageUrl ?? p.storagePath)),
  );
  const pictures = images.map(toNumbers);
  const xs = tf.stack(pictures) as tf.Tensor4D;
  pictures.forEach((p) => p.dispose());
  const ys = tf.tensor2d(
    photos.map((p) => [p.label === "CAT" ? 1 : 0]),
    [photos.length, 1],
  );
  return { xs, ys };
};
