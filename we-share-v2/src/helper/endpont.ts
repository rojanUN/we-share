const baseUrl = import.meta.env.VITE_API_URL;

export const examEndpoints = {
    getSingleQuestoin: `${baseUrl}/api/problems/get/single`,
    getQuestionSubmission: `${baseUrl}/api/problems/get/submission`,
};
