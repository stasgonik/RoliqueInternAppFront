import axiosInstance from "./tokenInterceptor";
import configServer from '../Constants/configServer'

const _endpoint = {
    USERS: 'users/',
    CHANGE_PASSWORD: 'users/forgotPassword/'
}

export default class UserService {
    static async getUsers(queryReq) {
        try{
            const result = await axiosInstance.get(`${configServer.URL}${_endpoint.USERS}`,{
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

    static async getSingleUser(id) {
        try{
            const result = await axiosInstance.get(`${configServer.URL}${_endpoint.USERS}${id}`);

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
            const result = await axiosInstance.patch(`${configServer.URL}${_endpoint.CHANGE_PASSWORD}`, body);

            return result
        } catch (e) {
            return e
        }
    }

    static async postUsers(body) {
        try{
            const result = await axiosInstance.post(`${configServer.URL}${_endpoint.USERS}`, body);

            return result
        } catch (e) {
            return e
        }
    }

    static async editUser(body,id) {
        try{
            console.log(body)
            const result = await axiosInstance.put(`${configServer.URL}${_endpoint.USERS}${id}`, body);

            return result
        } catch (e) {
            console.log(e)
            return e
        }
    }
}
