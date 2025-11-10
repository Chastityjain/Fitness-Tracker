
import { PoseLandmarker, FilesetResolver, DrawingUtils, NormalizedLandmark } from "@mediapipe/tasks-vision";

let poseLandmarker: PoseLandmarker | null = null;

export const createPoseLandmarker = async (): Promise<PoseLandmarker> => {
    if (poseLandmarker) {
        return poseLandmarker;
    }
    
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
    );
    poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
            delegate: "GPU",
        },
        runningMode: "VIDEO",
        numPoses: 1,
        minPoseDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });
    return poseLandmarker;
};

export const drawPose = (
    canvasCtx: CanvasRenderingContext2D,
    landmarks: NormalizedLandmark[]
) => {
    const drawingUtils = new DrawingUtils(canvasCtx);
    drawingUtils.drawLandmarks(landmarks, {
        radius: (data) => DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1),
        color: '#4ade80', // accent
        lineWidth: 2,
    });
    drawingUtils.drawConnectors(landmarks, PoseLandmarker.POSE_CONNECTIONS, {
        color: 'white',
        lineWidth: 3,
    });
};
