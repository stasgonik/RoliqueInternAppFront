import config from '../Constants/configServer'
import axiosInstance from "./tokenInterceptor";

class _endpoint {
    static login = 'auth/';
    static logout = 'auth/logout/';
}

export default class AuthService {

    static async login(body) {
        try{
            const result = await axiosInstance.post(`${config.URL}${_endpoint.login}`, body);

            this.setTokens(result.data)

        } catch (e) {
            console.log(e)
        }
    }

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
