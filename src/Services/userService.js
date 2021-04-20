import axiosInstance from "./tokenInterceptor";
import config from '../Constants/configServer'


class _endpoint {
    static Users = 'users/';
    static ChangePassword = 'users/forgotPassword/'
}

export default class UserService {

    static async getUsers() {
        try{
            const result = await axiosInstance.get(`${config.URL}${_endpoint.Users}`);

            return result.data
        } catch (e) {
            console.log(e)
        }
    }
    static async getSingleUsers(id) {
        try{
            const result = await axiosInstance.get(`${config.URL}${_endpoint.Users}${id}`);

            return result.data
        } catch (e) {
            console.log(e)
        }
    }

    static async changePassword(body) {
        try{
            const result = await axiosInstance.patch(`${config.URL}${_endpoint.ChangePassword}`, body);

            return result.data
        } catch (e) {
            console.log(e)
        }
    }

    static async postUsers(body) {
        try{
            const result = await axiosInstance.post(`${config.URL}${_endpoint.Users}`, body);

            return result.data
        } catch (e) {
            console.log(e)
        }
    }

    static async editUser(body,id) {
        try{
            console.log(body)
            const result = await axiosInstance.put(`${config.URL}${_endpoint.Users}${id}`, body);


            return result.data
        } catch (e) {
            console.log(e)
        }
    }


}
