const baseUrl = import.meta.env.VITE_API_URL;

export const examEndpoints = {
    getSingleQuestoin: `${baseUrl}/api/problems/get/single`,
    getSubmissionId: `${baseUrl}/api/problems/submit`,
    getSubmissionDetails: `${baseUrl}/api/problems/get/submission`,
};


export const questionEndPoints = {
    addMCQQuestion: `${baseUrl}/api/questions/add/mcqquestions`,
}
