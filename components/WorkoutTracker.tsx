
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPoseLandmarker, drawPose } from '../services/poseDetectionService';
import { PoseLandmarker } from '@mediapipe/tasks-vision';
import { processPose, getInitialExerciseState, ExerciseState } from '../utils/exerciseLogic';

interface WorkoutTrackerProps {
  workoutTitle: string;
  onEndWorkout: () => void;
}

const CALORIES_PER_REP: { [key: string]: number } = {
    'Squat Race': 0.32,
    'Jump Wars': 0.2,
    'Plank Duel': 0, // Calories for plank are based on time
};
const CALORIES_PER_SECOND_PLANK = 0.08;

const WorkoutTracker: React.FC<WorkoutTrackerProps> = ({ workoutTitle, onEndWorkout }) => {
  const [reps, setReps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [formFeedback, setFormFeedback] = useState("Initializing...");
  const [timer, setTimer] = useState(0);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // FIX: Initialize useRef with an explicit undefined value to satisfy strict checkers expecting one argument.
  const requestRef = useRef<number | undefined>(undefined);
  const poseLandmarkerRef = useRef<PoseLandmarker | null>(null);
  const exerciseStateRef = useRef<ExerciseState>(getInitialExerciseState(workoutTitle));

  const predictWebcam = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || !poseLandmarkerRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const poseLandmarker = poseLandmarkerRef.current;

    if (video.readyState < 2) {
      requestRef.current = requestAnimationFrame(predictWebcam);
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const canvasCtx = canvas.getContext('2d');
    if (!canvasCtx) return;
    
    const startTimeMs = performance.now();
    const results = poseLandmarker.detectForVideo(video, startTimeMs);

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    if (results.landmarks && results.landmarks.length > 0) {
      const landmarks = results.landmarks[0];
      drawPose(canvasCtx, landmarks);

      const newState = processPose(workoutTitle, landmarks, exerciseStateRef.current);
      if (newState.reps !== exerciseStateRef.current.reps) {
        setReps(newState.reps);
      }
      if(newState.feedback !== exerciseStateRef.current.feedback) {
          setFormFeedback(newState.feedback);
      }
      exerciseStateRef.current = newState;
    }
    
    canvasCtx.restore();
    requestRef.current = requestAnimationFrame(predictWebcam);
  }, [workoutTitle]);

  useEffect(() => {
    const timerInterval = setInterval(() => setTimer(prev => prev + 1), 1000);

    const setup = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
              createPoseLandmarker()
                .then(landmarker => {
                  poseLandmarkerRef.current = landmarker;
                  setFormFeedback(getInitialExerciseState(workoutTitle).feedback);
                  setIsLoading(false);
                  requestRef.current = requestAnimationFrame(predictWebcam);
                })
                .catch(err => {
                  console.error("Error creating pose landmarker:", err);
                  setCameraError("Failed to load AI model. Please refresh and try again.");
                  setIsLoading(false);
                });
            };
          }
        } else {
            setCameraError("Your browser does not support webcam access.");
            setIsLoading(false);
        }
      } catch (err: any) {
        console.error("Error accessing webcam: ", err);
        if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
          setCameraError("No webcam found.");
        } else if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          setCameraError("Webcam access denied. Please allow camera access in your browser settings.");
        } else {
          setCameraError("Could not access webcam.");
        }
        setIsLoading(false);
      }
    };

    setup();

    return () => {
      clearInterval(timerInterval);
      // FIX: Improved check for requestRef.current to prevent issues if the animation frame ID is 0.
      if (typeof requestRef.current === 'number') {
        cancelAnimationFrame(requestRef.current);
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [predictWebcam, workoutTitle]);

  useEffect(() => {
      const repCalories = (CALORIES_PER_REP[workoutTitle] || 0) * reps;
      const timeCalories = workoutTitle === 'Plank Duel' ? timer * CALORIES_PER_SECOND_PLANK : 0;
      setCalories(Math.round(repCalories + timeCalories));
  }, [reps, timer, workoutTitle]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="bg-white dark:bg-zinc-800/50 p-6 rounded-2xl shadow-lg animate-fade-in flex flex-col lg:flex-row gap-8">
      {/* Video Feed and Overlay */}
      <div className="flex-grow lg:w-2/3 relative aspect-video bg-zinc-900 rounded-lg overflow-hidden flex items-center justify-center">
        {cameraError ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-center text-white p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <h3 className="text-xl font-bold">Webcam Error</h3>
            <p>{cameraError}</p>
          </div>
        ) : (
          <>
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform scale-x-[-1] absolute"></video>
            <canvas ref={canvasRef} className="w-full h-full absolute transform scale-x-[-1]"></canvas>
            {isLoading && (
              <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-zinc-900/80 text-white z-10">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
                <p className="mt-4 text-lg">Loading AI Coach...</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Stats and Controls */}
      <div className="lg:w-1/3 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-4">{workoutTitle}</h2>
          <div className="grid grid-cols-2 gap-4 text-center mb-6">
            <div className="bg-zinc-100 dark:bg-zinc-700 p-4 rounded-lg">
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">REPS</p>
              <p className="text-4xl font-bold">{reps}</p>
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-700 p-4 rounded-lg">
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">CALORIES</p>
              <p className="text-4xl font-bold">{calories}</p>
            </div>
          </div>
          <div className="bg-accent/20 border-l-4 border-accent text-accent-dark dark:text-accent p-4 rounded-r-lg mb-6 min-h-[80px]">
            <h4 className="font-bold">Form Feedback</h4>
            <p>{formFeedback}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
            <p className="text-6xl font-mono font-bold mb-4">{formatTime(timer)}</p>
            <button
            onClick={onEndWorkout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
            End Workout
            </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutTracker;
