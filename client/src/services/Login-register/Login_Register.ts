    import axios, { AxiosResponse } from 'axios';

    import {User,Registers, LoginProps} from '@/types/index'
    const Login = async( data:LoginProps): Promise<LoginProps> => {
        try{
            const response: AxiosResponse<LoginProps> = await axios.post(`api/login-in`, data);
            return response.data;
        }catch {
            throw new Error('Error login');
        }
    }

    const Register = async (data: Registers): Promise<Registers> => {
        try {
          const response: AxiosResponse<Registers> = await axios.post(`api/register`, data);
          return response.data;
        } catch {
          throw new Error('Error registering');
        }
      };

    const LoginOut = async(): Promise<User> => {
        try{
            const response: AxiosResponse<User> = await axios.post(`api/register`);
            return response.data;
        }catch {
            throw new Error('Error login');
        }
    }

    export default {
        Login,
        Register,
        LoginOut
    }
