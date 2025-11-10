import React, { useState, useEffect, useRef } from 'react';

interface WorkoutTrackerProps {
  workoutTitle: string;
  onEndWorkout: () => void;
}

const WorkoutTracker: React.FC<WorkoutTrackerProps> = ({ workoutTitle, onEndWorkout }) => {
  const [reps, setReps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [formFeedback, setFormFeedback] = useState("Keep your back straight!");
  const [timer, setTimer] = useState(0);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Mock data updates
    const repInterval = setInterval(() => setReps(prev => prev + 1), 3000);
    const calorieInterval = setInterval(() => setCalories(prev => prev + 2), 1000);
    const timerInterval = setInterval(() => setTimer(prev => prev + 1), 1000);
    
    // Access webcam
    const enableWebcam = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setCameraError(null);
                }
            } catch (err: any) {
                console.error("Error accessing webcam: ", err);
                if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
                    setCameraError("No webcam found. Please connect a camera and try again.");
                    setFormFeedback("No webcam found. Cannot track form.");
                } else if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
                    setCameraError("Webcam access denied. Please allow camera access in your browser settings.");
                    setFormFeedback("Webcam access denied. Cannot track form.");
                } else {
                    setCameraError("Could not access webcam. Please check your connection and browser permissions.");
                    setFormFeedback("An error occurred with the webcam.");
                }
            }
        } else {
            setCameraError("Your browser does not support webcam access.");
            setFormFeedback("Webcam not supported.");
        }
    };

    enableWebcam();

    return () => {
      clearInterval(repInterval);
      clearInterval(calorieInterval);
      clearInterval(timerInterval);
      // Clean up webcam stream
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

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
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform scale-x-[-1]"></video>
            {/* Skeletal Overlay Placeholder */}
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 480 360">
                {/* Mock skeleton */}
                <circle cx="240" cy="80" r="15" fill="none" stroke="#4ade80" strokeWidth="2" />
                <line x1="240" y1="95" x2="240" y2="180" stroke="#4ade80" strokeWidth="2" />
                <line x1="240" y1="120" x2="190" y2="160" stroke="#4ade80" strokeWidth="2" />
                <line x1="240" y1="120" x2="290" y2="160" stroke="#4ade80" strokeWidth="2" />
                <line x1="190" y1="160" x2="170" y2="220" stroke="#4ade80" strokeWidth="2" />
                <line x1="290" y1="160" x2="310" y2="220" stroke="#4ade80" strokeWidth="2" />
                <line x1="240" y1="180" x2="210" y2="260" stroke="#4ade80" strokeWidth="2" />
                <line x1="240" y1="180" x2="270" y2="260" stroke="#4ade80" strokeWidth="2" />
                <line x1="210" y1="260" x2="200" y2="330" stroke="#4ade80" strokeWidth="2" />
                <line x1="270" y1="260" x2="280" y2="330" stroke="#4ade80" strokeWidth="2" />
            </svg>
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
          <div className="bg-accent/20 border-l-4 border-accent text-accent-dark dark:text-accent p-4 rounded-r-lg mb-6">
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
