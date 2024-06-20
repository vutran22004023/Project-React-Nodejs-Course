import axios, { AxiosResponse } from 'axios';


const GetAllCourses = async() => {
    try{
        const response: AxiosResponse = await axios.get(`api/course/all-courses`);
        return response.data;
    }catch {
        throw new Error('Error login');
    }
}

export default {
    GetAllCourses
}