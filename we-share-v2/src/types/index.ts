export interface Question {
    id: number;
    question: string;
    options?: string[];
    correctAnswer?: number;
    category: string;
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
    // id: number | null;
    // question: string | null;
    // options?: string[] | null;
    // correctAnswer?: number | null;
    // category: string | null;
    // questionNo: number | null;
    selectedQuestion: Question | null;
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
