import axiosInstance from "./tokenInterceptor";
import config from '../Constants/configServer'


class _endpoint {
    static Users = 'users/';
    static ChangePassword = 'users/forgotPassword/';
    static Influencer = 'influencers/';
}

export default class UserService {

    static async getUsers(queryReq) {
        try{
            const result = await axiosInstance.get(`${config.URL}${_endpoint.Users}`,{
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
            const result = await axiosInstance.get(`${config.URL}${_endpoint.Users}${id}`);

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
            const result = await axiosInstance.patch(`${config.URL}${_endpoint.ChangePassword}`, body);

            return result
        } catch (e) {
            return e
        }
    }

    static async postUsers(body) {
        try{
            const result = await axiosInstance.post(`${config.URL}${_endpoint.Users}`, body);

            return result
        } catch (e) {
            return e
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

    static async postInfluencer(body) {
        try{
            const result = await axiosInstance.post(`${config.URL}${_endpoint.Influencer}`, body);

            return result.data
        } catch (e) {
            console.log(e)
        }
    }

    static async editInfluencer(body,id) {
        try{
            console.log(body)
            const result = await axiosInstance.put(`${config.URL}${_endpoint.Users}${id}`, body);


            return result.data
        } catch (e) {
            console.log(e)
        }
    }


}
