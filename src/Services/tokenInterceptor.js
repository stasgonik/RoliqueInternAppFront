import axios from 'axios';

import configFront from "../Constants/configFront";
import configServer from '../Constants/configServer'

class _endpoint {
    static refresh = 'auth/refresh';
}

const axiosInstance = axios.create({
    baseURL: configServer.URL,
    timeout: 10000,
    headers: {
        [configServer.AUTHORIZATION]: localStorage.getItem(configServer.access_token) ? localStorage.getItem(configServer.access_token) : null,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

axiosInstance.interceptors.response.use(
    response => {
        return response
    },

    error => {
        const originalRequest = error.config;

        // Prevent infinite loops
        if (error.response.status === 401 && (originalRequest.url === `${_endpoint.refresh}`
            || originalRequest.url === originalRequest.url + `${_endpoint.refresh}`)) {
            localStorage.clear()
            window.location.href = configFront.URL;
            return Promise.reject(error);
        }

        if (error.response.data.message === "Token not valid!" &&
            error.response.status === 401)
        {
            const refreshToken = localStorage.getItem(configServer.refresh_token);

            if (refreshToken){
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                // exp date in token is expressed in seconds, while now() returns milliseconds:
                const now = Math.ceil(Date.now() / 1000);

                if (tokenParts.exp > now) {
                    axiosInstance.defaults.headers[configServer.AUTHORIZATION] = refreshToken;
                    return axiosInstance
                        .post(`${_endpoint.refresh}`, {})
                        .then((response) => {

                            localStorage.setItem(configServer.access_token, response.data.access_token);
                            localStorage.setItem(configServer.refresh_token, response.data.refresh_token);
                            localStorage.setItem(configServer.user_role, response.data.user_role);
                            localStorage.setItem(configServer.user_id, response.data.user_id);

                            axiosInstance.defaults.headers[configServer.AUTHORIZATION] = response.data.access_token;
                            originalRequest.headers[configServer.AUTHORIZATION] = response.data.access_token;

                            return axiosInstance(originalRequest);
                        })
                        .catch(err => {
                            // console.log(err)
                            if (err.status === 401) {
                                window.location.href = configFront.URL;
                            }
                            return err
                        });
                }else{
                    console.log("Refresh token is expired", tokenParts.exp, now);
                    window.location.href = configFront.URL;
                }
            }else{
                console.log("Refresh token not available.")
                window.location.href = configFront.URL;
            }
        }
        throw error.response
    }
);

export default axiosInstance;
