/**
 * Real In-Browser TensorFlow.js COCO-SSD Object Detection Loader
 */
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

let modelPromise = null;

export async function loadDetectionModel() {
  if (!modelPromise) {
    // Ensure TF backend is ready
    await tf.ready();
    modelPromise = cocoSsd.load({ base: 'lite_mobilenet_v2' });
  }
  return await modelPromise;
}

export async function detectObjects(imageOrVideoElement) {
  try {
    const model = await loadDetectionModel();
    const predictions = await model.detect(imageOrVideoElement);
    return predictions;
  } catch (error) {
    console.error('TF.js Detection Error:', error);
    return [];
  }
}
