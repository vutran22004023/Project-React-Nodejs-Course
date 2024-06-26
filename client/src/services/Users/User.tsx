import axios, { AxiosResponse } from 'axios';
const axiosJWT = axios.create()
import {User,Registers, LoginProps,EmailProps, ResetPassProps, StatusAuthProps} from '@/types/index'

const ResetPass = async(data : ResetPassProps): Promise<ResetPassProps> => {
    try{
        const response: AxiosResponse<ResetPassProps> = await axios.post(`api/reset-password`, data,{
            headers: {
                token: `Bearer ${data.token}`,
            }
        });
        return response.data;
    }catch {
        throw new Error('Error login');
    }
}

const StatusAuth = async(data : StatusAuthProps): Promise<StatusAuthProps> => {
    try{
        const response: AxiosResponse<ResetPassProps> = await axios.post(`api/authenticate-user`, data,{
            headers: {
                token: `Bearer ${data.token}`,
            }
        });
        return response.data;
    }catch {
        throw new Error('Error login');
    }
}

const GetAllUsers = async (token: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/user/get-all-users`,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch {
    throw new Error('Error get users');
  }
};

const CreateUser = async (
  token: string,
  data: Omit<User, 'confirmPassword'>
) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/user/create-user`,
      data,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch {
    throw new Error('Error create user');
  }
};

const UpdateUser = async (
  id: string,
  token: string,
  data: Partial<Pick<User, 'password'>> & Omit<User, 'confirmPassword'>
) => {
  try {
    const response: AxiosResponse = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/api/user/update-user/${id}`,
      data,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch {
    throw new Error('Error update user');
  }
};

const DeleteUser = async (id: string, token: string) => {
  try {
    const response: AxiosResponse = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/api/user/delete-user/${id}`,
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch {
    throw new Error('Error delete user');
  }
};

const DeleteManyUser = async (ids: Array<string>) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/user/delete-many-user`,
      ids
    );
    return response.data;
  } catch {
    throw new Error('Error delete many user');
  }
};

export default {
    ResetPass,
    StatusAuth,
    axiosJWT,
    GetAllUsers,
    CreateUser,
    UpdateUser,
    DeleteUser,
    DeleteManyUser
}
