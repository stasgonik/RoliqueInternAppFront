import axios from 'axios';
import config from '../Constants/configServer'

class _endpoint {
    static login = 'auth/';
    static refresh = 'auth/refresh/';
    static logout = 'auth/logout/';
}

export default class AuthService {

    static async login(body) {
        try{
            const result = await axios.post(`${config.URL}${_endpoint.login}`, body, config.axios_config);

            this.setTokens(result.data)

        } catch (e) {
            console.log(e)
        }
    }


    // static async refreshToken(){
    //     try {
    //         let data_Headers = config.axios_config;
    //         data_Headers.headers.Authorization = this.getRefreshToken();
    //
    //         const result = await axios.post(`${config.URL}${_endpoint.refresh}`, {},  data_Headers);
    //
    //         this.setTokens(result.data)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }


    // ПЕРЕВІРКА НА АУТЕНТИФІКАЦІЇЇ
    // public isAuthenticated(): boolean {
    //     return !!this.getAccessToken();
    // }
    // ПЕРЕВІРКА НА АУТЕНТИФІКАЦІЇЇ



    static setAccessToken(accessToken) {
        localStorage.setItem(config.access_token, accessToken);
    }

    static setRefreshToken(refreshToken) {
        localStorage.setItem(config.refresh_token, refreshToken);
    }

    static getAccessToken() {
        return localStorage.getItem(config.access_token);
    }

    static getRefreshToken() {
        return localStorage.getItem(config.refresh_token);
    }

    static setTokens(tokens){
        const {access_token, refresh_token} = tokens;
        this.setAccessToken(access_token);
        this.setRefreshToken(refresh_token);

    }

}
