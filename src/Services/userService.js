import axios from 'axios';
import config from '../Constants/configServer'
import authService from '../Services/auth.service'

class _endpoint {
    static Users = 'users/';
}

export default class UserService {

    static async getUsers() {
        try{

            let data_Headers = config.axios_config;
            data_Headers.headers.Authorization = authService.getAccessToken();

            const result = await axios.get(`${config.URL}${_endpoint.Users}`, data_Headers);

            return result.data


        } catch (e) {
            console.log(e)
        }
    }


}
