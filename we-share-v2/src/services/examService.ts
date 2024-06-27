import { api } from '../helper/axios';
import { examEndpoints } from '../helper/endpont';
import { SubmissionResponse } from '../types/question';

export const handleSingleQuestionFetch = async (value: string) => {
    const URL = examEndpoints.getSingleQuestoin;
    const data = { slug: value };
    const response = await api.post(URL, data);
    return response;
};

export const handleQuestonSubmission = async (
    slug: string,
    code: string,
    language: string
) => {
    const URL = examEndpoints.getSubmissionId;
    const data = { slug, code, language };
    const response = await api.post(URL, data);
    return response;
};

export const handleSubmissionDetails = async (submissionId: number) => {
    const URL = examEndpoints.getSubmissionDetails;
    console.log(URL, submissionId, 'URL, submissionId?????');
    const data = { submissionId };
    const response = await api.post(URL, data);
    return response;
};

export const pollSubmissionDetails = (
    submissionId: number,
    interval = 5000,
    maxAttempts = 10
): Promise<SubmissionResponse> => {
    return new Promise((resolve, reject) => {
        let attempts = 0;

        const intervalId = setInterval(async () => {
            attempts += 1;

            try {
                const data = await handleSubmissionDetails(submissionId);
                clearInterval(intervalId);
                resolve(data.data.submissionDetails);
            } catch (error) {
                if (attempts >= maxAttempts) {
                    clearInterval(intervalId);
                    reject(
                        new Error(
                            'Failed to fetch submission details within the allowed time'
                        )
                    );
                }
            }
        }, interval);
    });
};
