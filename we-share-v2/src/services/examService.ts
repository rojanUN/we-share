import { api } from '../helper/axios';
import { examEndpoints } from '../helper/endpont';

export const handleSingleQuestionFetch = async (value: string) => {
    const URL = examEndpoints.getSingleQuestoin;
    const data = { slug: value };
    const response = await api.post(URL, data);
    return response;
};
