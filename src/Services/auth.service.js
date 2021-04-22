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

            this.setData(result.data)

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

    static setRefreshToken(refreshToken) {localStorage.setItem(config.refresh_token, refreshToken);

    }

    static setUserRole(user_role) {
        localStorage.setItem(config.user_role, user_role);

    }

    static setUserId(user_id) {
        localStorage.setItem(config.user_id, user_id);
    }

    static setEditUserId(user_id) {
        localStorage.setItem(config.edit_id, user_id);
    }

    static getAccessToken() {
        return localStorage.getItem(config.access_token);
    }

    static getRefreshToken() {
        return localStorage.getItem(config.refresh_token);
    }

    static getUserRole() {
        return localStorage.getItem(config.user_role);
    }

    static getUserId() {
        return localStorage.getItem(config.user_id);
    }

    static getEditId() {
        return localStorage.getItem(config.edit_id);
    }

    static setData(tokens){
        const {access_token, refresh_token, user_role, user_id} = tokens;
        this.setAccessToken(access_token);
        this.setRefreshToken(refresh_token);
        this.setUserRole(user_role);
        this.setUserId(user_id)
    }

}
