import { api } from "../helper/axios";
import { userEndPoints } from "../helper/endpoint";
import { UserInterface } from "../interfaces/UserInterface";


export const getUsers = async () => {
    const response = await api.get(userEndPoints.getUsers);
    console.log("ths is too much resonse", response);
    if (response.data) return response.data;
};

export const addUsers = async (users: UserInterface) => {
    const response = await api.post(userEndPoints.addUsers, users);
    if (response.status === 200) return response.data;
}