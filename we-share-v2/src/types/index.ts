export interface Question {
    question: string;
    options: string[];
    correctAnswer: number;
}
export interface QuestionStateType {
    question: string | null;
    options: string[] | null;
    correctAnswer: number | null;
    // questionNo: number | null;
    activeQuesIndex?: number | null;
    questions?: Question[] | null;
}
export enum CustomError {
    webCamError,
    audioError,
}
