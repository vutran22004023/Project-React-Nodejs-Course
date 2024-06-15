    import axios, { AxiosResponse } from 'axios';

    import {User,Registers, LoginProps,EmailProps, ResetPassProps, StatusAuthProps} from '@/types/index'
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

    const ForgotPassword = async(data:EmailProps ):Promise<EmailProps> => {
        try{
            const response: AxiosResponse<EmailProps> = await axios.post(`api/forgot-password`, data);
            return response.data;
        }catch {
            throw new Error('Error login');
        }
    }

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

    export default {
        Login,
        Register,
        LoginOut,
        ForgotPassword,
        ResetPass,
        StatusAuth
    }
