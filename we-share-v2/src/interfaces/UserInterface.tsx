export interface UserInterface {
    id: number;
    fullName: string;
    email: string;
    role?: string;
    status?: string;
}
export interface ExamInterface {
    id: number;
    examTitle: string;
    examDescription: string;
    mcqQuestionMarks: number;
    codeQuestionEasyMarks: number;
    codeQuestionMediumHardMarks?: number;
    hasCodeQuestions?: boolean;
    totalMarks?: number;
    existScheduleExam?: boolean;
}
