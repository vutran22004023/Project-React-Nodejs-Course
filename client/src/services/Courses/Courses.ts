import axios, { AxiosResponse } from 'axios';


const GetAllCourses = async() => {
    try{
        const response: AxiosResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/course/all-courses`);
        return response.data;
    }catch {
        throw new Error('Error get all courses');
    }
}

const GetSearchCourses = async(search: string) => {
  try{
      const response: AxiosResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/course/all-courses?filter=name:${search}`);
      return response.data;
  }catch {
      throw new Error('Error get all courses');
  }
}

const GetDetailCourses = async(slug: StringConstructor) => {
  try{
      const response: AxiosResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/course/detail-courses/${slug}`);
      return response.data;
  }catch {
      throw new Error('Error login detail course');
  }
}

const CreateCourses = async (data: any, access_Token: any) => {
    try {
      const response: AxiosResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/course/create-courses`, data,{
        headers: {
            token: `Bearer ${access_Token}`,
        }
    });
      return response.data;
    } catch {
      throw new Error('Error create courses');
    }
  };

  const UpdateCourse = async (id: any,data: any, access_Token: any) => {
    try {
      const response: AxiosResponse = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/course/update-courses/${id}`, data,{
        headers: {
            token: `Bearer ${access_Token}`,
        }
    });
      return response.data;
    } catch {
      throw new Error('Error update coutses');
    }
  };

  const DeleteCourses = async (id: any, access_Token: any) => {
    try {
      const response: AxiosResponse = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/course/delete-courses/${id}`,{
        headers: {
            token: `Bearer ${access_Token}`,
        }
    });
      return response.data;
    } catch {
      throw new Error('Error delete coutse');
    }
  };

export default {
    GetAllCourses,
    CreateCourses,
    DeleteCourses,
    UpdateCourse,
    GetDetailCourses,
    GetSearchCourses
}