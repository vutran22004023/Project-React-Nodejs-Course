import axios, { AxiosResponse } from 'axios';

const GetDetailBlog = async (slug: any) => {
    try {
      const response: AxiosResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/blog/detail-post/${slug}`);
      return response.data;
    } catch {
      throw new Error('Error create courses');
    }
};

const GetAllBlog = async () => {
    try {
      const response: AxiosResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/blog/all-posts`);
      return response.data;
    } catch {
      throw new Error('Error create courses');
    }
};

const CreateBlog = async (data: any, access_Token: any) => {
    try {
      const response: AxiosResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/blog/create-post`, data,{
        headers: {
            token: `Bearer ${access_Token}`,
        }
    });
      return response.data;
    } catch {
      throw new Error('Error create courses');
    }
};

const UpdateBlog = async (id:any,data: any, access_Token: any) => {
    try {
      const response: AxiosResponse = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/blog/update-post/${id}`, data,{
        headers: {
            token: `Bearer ${access_Token}`,
        }
    });
      return response.data;
    } catch {
      throw new Error('Error create courses');
    }
};

const DeleteBlog = async (id:any, access_Token: any) => {
    try {
      const response: AxiosResponse = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/blog/delete-post/${id}`,{
        headers: {
            token: `Bearer ${access_Token}`,
        }
    });
      return response.data;
    } catch {
      throw new Error('Error create courses');
    }
};

export default {
    GetAllBlog,
    CreateBlog,
    UpdateBlog,
    DeleteBlog,
    GetDetailBlog
}