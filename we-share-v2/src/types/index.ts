export interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
}

export type LandMark = [number, number];

export interface FacePrediction {
    topLeft: [number, number];
    bottomRight: [number, number];
    landmarks: LandMark[];
}

export interface CheckedQuestionType {
    id: number;
    selectedOption: string | null;
    selectedOptionIndex: number;
}
export interface IBlazeFaceModel {
    estimateFaces(input: any, returnTensors: boolean): Promise<any>;
    // Add any other methods or properties you need from BlazeFaceModel
}
export interface QuestionStateType {
    id: number | null;
    question: string | null;
    options: string[] | null;
    correctAnswer: number | null;
    // questionNo: number | null;
    activeQuesIndex?: number | null;
    questions?: Question[] | null;
    checkedQuestions?: CheckedQuestionType[] | null;
    showToast?: boolean | null;
}
enum CustomError {
    webCamError = 'webCamError',
    audioError = 'audioError',
}

export interface MediaDeviceInfo {
    deviceId: string;
    kind: string;
    label: string;
    groupId: string;
}


export { CustomError };
