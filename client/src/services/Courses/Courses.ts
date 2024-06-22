import axios, { AxiosResponse } from 'axios';


const GetAllCourses = async() => {
    try{
        const response: AxiosResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/course/all-courses`);
        return response.data;
    }catch {
        throw new Error('Error login');
    }
}

const CreateCourses = async (data: any) => {
    try {
      const response: AxiosResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/course/create-courses`, data);
      return response.data;
    } catch {
      throw new Error('Error registering');
    }
  };

  const UpdateCourse = async (id: any,data: any) => {
    try {
      const response: AxiosResponse = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/course/update-courses/${id}`, data);
      return response.data;
    } catch {
      throw new Error('Error registering');
    }
  };

  const DeleteCourses = async (id: any) => {
    try {
      const response: AxiosResponse = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/course/delete-courses/${id}`);
      return response.data;
    } catch {
      throw new Error('Error registering');
    }
  };

export default {
    GetAllCourses,
    CreateCourses,
    DeleteCourses,
    UpdateCourse
}