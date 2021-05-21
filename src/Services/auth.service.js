import axiosInstance from "./tokenInterceptor";
import configFront from "../Constants/configFront";
import configServer from '../Constants/configServer'

class _endpoint {
    static login = 'auth/';
    static logout = 'auth/logout/';
    static refresh = 'auth/refresh';
}

export default class AuthService {
    static async login(body) {
        try {
            const result = await axiosInstance.post(`${configServer.URL}${_endpoint.login}`, body)

            this.setTokens(result.data)

            return result;
        } catch (e) {
            return e
        }
    }

    static async refresh() {
        try {
            axiosInstance.defaults.headers[configServer.AUTHORIZATION] = this.getRefreshToken();
            const result = await axiosInstance.post(`${configServer.URL}${_endpoint.refresh}`)

            this.setTokens(result.data)
            axiosInstance.defaults.headers[configServer.AUTHORIZATION] = this.getAccessToken();

            return result;
        } catch (e) {
            axiosInstance.defaults.headers[configServer.AUTHORIZATION] = this.getAccessToken();
            return e
        }
    }

    static async logout() {
        try {
            const result = await axiosInstance.get(`${configServer.URL}${_endpoint.logout}`)

            if (result && result.status === 200) {
                localStorage.clear()

                window.location.href = configFront.URL
            }
        } catch (e) {
            localStorage.clear()
            console.log(e)
            return e
        }
    }

    // ПЕРЕВІРКА НА АУТЕНТИФІКАЦІЇЇ
    // public isAuthenticated(): boolean {
    //     return !!this.getAccessToken();
    // }
    // ПЕРЕВІРКА НА АУТЕНТИФІКАЦІЇЇ

    static setAccessToken(accessToken) {
        localStorage.setItem(configServer.access_token, accessToken);
    }

    static setUserId(user_id) {
        localStorage.setItem(configServer.user_id, user_id);
    }

    static setRefreshToken(refreshToken) {
        localStorage.setItem(configServer.refresh_token, refreshToken);
    }

    static getUserId() {
        return localStorage.getItem(configServer.user_id);
    }

    static getAccessToken() {
        return localStorage.getItem(configServer.access_token);
    }

    static getRefreshToken() {
        return localStorage.getItem(configServer.refresh_token);
    }

    static setUserRole(user_role) {
        localStorage.setItem(configServer.user_role, user_role);
    }


    static getUserRole() {
        return localStorage.getItem(configServer.user_role);
    }

    static setTokens(tokens) {
        const {access_token, refresh_token, user_id, user_role} = tokens;
        this.setAccessToken(access_token);
        this.setRefreshToken(refresh_token);
        this.setUserId(user_id);
        this.setUserRole(user_role);
    }
}
