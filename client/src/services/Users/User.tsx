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

export default {
    ResetPass,
    StatusAuth,
    axiosJWT
}
