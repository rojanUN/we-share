export interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
}
export interface CheckedQuestionType {
    id: number;
    selectedOption: string | null;
    selectedOptionIndex: number;
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
}
enum CustomError {
    webCamError = 'webCamError',
    audioError = 'audioError',
}

export { CustomError };
