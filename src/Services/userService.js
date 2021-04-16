import axiosInstance from "./tokenInterceptor";
import config from '../Constants/configServer'


class _endpoint {
    static Users = 'users';
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
    static async postUsers(body) {
        try{
            const result = await axiosInstance.post(`${config.URL}${_endpoint.Users}`, body);

            return result.data
        } catch (e) {
            console.log(e)
        }
    }


}
