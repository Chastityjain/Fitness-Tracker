
import { NormalizedLandmark } from "@mediapipe/tasks-vision";

export type ExerciseType = 'Squat Race' | 'Plank Duel' | 'Jump Wars' | string;
type Stage = 'up' | 'down' | 'open' | 'closed' | 'correct' | 'incorrect' | 'start';

export interface ExerciseState {
    reps: number;
    stage: Stage;
    feedback: string;
}

const POSE_LANDMARKS = {
    LEFT_SHOULDER: 11,
    RIGHT_SHOULDER: 12,
    LEFT_HIP: 23,
    RIGHT_HIP: 24,
    LEFT_KNEE: 25,
    RIGHT_KNEE: 26,
    LEFT_ANKLE: 27,
    RIGHT_ANKLE: 28,
    LEFT_WRIST: 15,
    RIGHT_WRIST: 16,
};

const calculateAngle = (p1: NormalizedLandmark, p2: NormalizedLandmark, p3: NormalizedLandmark): number => {
    if(!p1 || !p2 || !p3) return 0;
    const radians = Math.atan2(p3.y - p2.y, p3.x - p2.x) - Math.atan2(p1.y - p2.y, p1.x - p2.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) {
        angle = 360 - angle;
    }
    return angle;
};

const processSquat = (landmarks: NormalizedLandmark[], state: ExerciseState): ExerciseState => {
    const { LEFT_HIP, RIGHT_HIP, LEFT_KNEE, RIGHT_KNEE, LEFT_ANKLE, RIGHT_ANKLE } = POSE_LANDMARKS;

    const leftKneeAngle = calculateAngle(landmarks[LEFT_HIP], landmarks[LEFT_KNEE], landmarks[LEFT_ANKLE]);
    const rightKneeAngle = calculateAngle(landmarks[RIGHT_HIP], landmarks[RIGHT_KNEE], landmarks[RIGHT_ANKLE]);

    let { reps, stage, feedback } = state;
    feedback = "Keep your back straight!";

    if (leftKneeAngle < 100 && rightKneeAngle < 100) {
        stage = 'down';
        feedback = "Great depth!";
    } else if (stage === 'down' && leftKneeAngle > 160 && rightKneeAngle > 160) {
        stage = 'up';
        reps += 1;
        feedback = "Excellent rep!";
    }

    return { reps, stage, feedback };
};

const processJumpingJacks = (landmarks: NormalizedLandmark[], state: ExerciseState): ExerciseState => {
    const { LEFT_WRIST, RIGHT_WRIST, LEFT_SHOULDER, RIGHT_SHOULDER, LEFT_ANKLE, RIGHT_ANKLE } = POSE_LANDMARKS;

    const leftWrist = landmarks[LEFT_WRIST];
    const rightWrist = landmarks[RIGHT_WRIST];
    const leftShoulder = landmarks[LEFT_SHOULDER];
    const rightShoulder = landmarks[RIGHT_SHOULDER];
    const leftAnkle = landmarks[LEFT_ANKLE];
    const rightAnkle = landmarks[RIGHT_ANKLE];

    const handsUp = leftWrist.y < leftShoulder.y && rightWrist.y < rightShoulder.y;
    const feetApart = Math.abs(leftAnkle.x - rightAnkle.x) > Math.abs(leftShoulder.x - rightShoulder.x) * 1.2;

    let { reps, stage, feedback } = state;
    feedback = "Keep the pace!";

    if (handsUp && feetApart) {
        stage = 'open';
    } else if (stage === 'open' && !feetApart) { // Only check feet for return to simplify
        stage = 'closed';
        reps += 1;
        feedback = "That's it!";
    }
    return { reps, stage, feedback };
};


const processPlank = (landmarks: NormalizedLandmark[], state: ExerciseState): ExerciseState => {
    const { LEFT_SHOULDER, LEFT_HIP, LEFT_ANKLE } = POSE_LANDMARKS;

    const bodyAngle = calculateAngle(landmarks[LEFT_SHOULDER], landmarks[LEFT_HIP], landmarks[LEFT_ANKLE]);
    
    let feedback = "Hold steady!";
    if (bodyAngle > 160 && bodyAngle < 195) {
        feedback = "Perfect form! Keep holding.";
    } else if (bodyAngle <= 160) {
        feedback = "Hips are too low. Raise them up!";
    } else {
        feedback = "Hips are too high. Lower them.";
    }
    
    return { ...state, feedback };
};

export const processPose = (
    exercise: ExerciseType,
    landmarks: NormalizedLandmark[],
    state: ExerciseState
): ExerciseState => {
    if (!landmarks || landmarks.length === 0) return state;

    try {
        switch (exercise) {
            case 'Squat Race':
                return processSquat(landmarks, state);
            case 'Jump Wars':
                return processJumpingJacks(landmarks, state);
            case 'Plank Duel':
                return processPlank(landmarks, state);
            default:
                return { ...state, feedback: "Tracking active."};
        }
    } catch (error) {
        console.error("Error processing pose:", error);
        return state;
    }
};

export const getInitialExerciseState = (exercise: ExerciseType): ExerciseState => {
    switch(exercise) {
        case 'Squat Race':
            return { reps: 0, stage: 'up', feedback: "Start your first squat!"};
        case 'Jump Wars':
            return { reps: 0, stage: 'closed', feedback: "Start your first jumping jack!"};
        case 'Plank Duel':
            return { reps: 0, stage: 'start', feedback: "Get into plank position."};
        default:
            return { reps: 0, stage: 'start', feedback: "Let's begin!"};
    }
}
