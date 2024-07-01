import axios, { AxiosResponse } from 'axios';


const StartCourse = async(data: any) => {
    try{
        const response: AxiosResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user-course/start-course`, data);
        return response.data;
    }catch {
        throw new Error('Error get all courses');
    }
}

const UpdateUserCourse = async() => {
    try{
        const response: AxiosResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user-course/update-progress`);
        return response.data;
    }catch {
        throw new Error('Error get all courses');
    }
}
 
export default {
    StartCourse,
    UpdateUserCourse
}