const baseUrl = import.meta.env.VITE_API_URL;

export const examEndpoints = {
    getSingleQuestoin: `${baseUrl}/api/problems/get/single`,
    getSubmissionId: `${baseUrl}/api/problems/submit`,
    getSubmissionDetails: `${baseUrl}/api/problems/get/submission`,
    getMultipleQuestions: `${baseUrl}/api/problems/get/multiple`,
};

export const questionEndPoints = {
    addMCQQuestion: `${baseUrl}/api/questions/add/mcqquestions`,
    addCodeQuestion: `${baseUrl}/api/questions/add/codequestions`,
};
