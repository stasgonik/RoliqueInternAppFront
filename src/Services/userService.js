import axiosInstance from "./tokenInterceptor";
import configServer from '../Constants/configServer'


class _endpoint {
    static Users = 'users/';
    static ChangePassword = 'users/forgotPassword/';
}

export default class UserService {

    static async getUsers(queryReq) {
        try{
            const result = await axiosInstance.get(`${configServer.URL}${_endpoint.Users}`,{
                params: queryReq
            });

            if(result.status === 200) {
                return result.data
            }
        } catch (e) {
            console.log(e)
            return e
        }
    }
    static async getSingleUsers(id) {
        try{
            const result = await axiosInstance.get(`${configServer.URL}${_endpoint.Users}${id}`);

            if(result.status === 200) {
                return result.data
            }
        } catch (e) {
            console.log(e)
            return e
        }
    }

    static async changePassword(body) {
        try{
            const result = await axiosInstance.patch(`${configServer.URL}${_endpoint.ChangePassword}`, body);

            return result
        } catch (e) {
            return e
        }
    }

    static async postUsers(body) {
        try{
            const result = await axiosInstance.post(`${configServer.URL}${_endpoint.Users}`, body);

            return result
        } catch (e) {
            return e
        }
    }

    static async editUser(body,id) {
        try{
            console.log(body)
            const result = await axiosInstance.put(`${configServer.URL}${_endpoint.Users}${id}`, body);

            return result
        } catch (e) {
            console.log(e)
            return e
        }
    }
}
