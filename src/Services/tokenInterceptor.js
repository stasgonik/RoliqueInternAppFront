import config from '../Constants/configServer'
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: config.URL,
    timeout: 5000,
    headers: {
        'Authorization': localStorage.getItem(config.access_token) ? localStorage.getItem(config.access_token) : null,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

axiosInstance.interceptors.response.use(
    response => {
    //     const originalRequest = response.config;
    //
    //     // Prevent infinite loops
    //     if (response.response.status === 401 && originalRequest.url === baseURL + 'refresh/') {
    //         window.location.href = '/login/';
    //         return Promise.reject(error);
    //     }
    //
    //     if (error.response.data.message === "Token not valid!" &&
    //         error.response.status === 401)
    //     {
    //         const refreshToken = authService.getRefreshToken();
    //
    //         if (refreshToken){
    //             const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
    //
    //             // exp date in token is expressed in seconds, while now() returns milliseconds:
    //             const now = Math.ceil(Date.now() / 1000);
    //             console.log(tokenParts.exp);
    //
    //             if (tokenParts.exp > now) {
    //                 return axiosInstance
    //                     .post('/auth/refresh/', {refresh: refreshToken})
    //                     .then((response) => {
    //
    //                         localStorage.setItem('access_token', response.data.access_token);
    //                         localStorage.setItem('refresh_token', response.data.refresh_token);
    //
    //                         axiosInstance.defaults.headers['Authorization'] = response.data.access_token;
    //                         originalRequest.headers['Authorization'] = response.data.access_token;
    //
    //                         return axiosInstance(originalRequest);
    //                     })
    //                     .catch(err => {
    //                         console.log(err)
    //                     });
    //             }else{
    //                 console.log("Refresh token is expired", tokenParts.exp, now);
    //                 window.location.href = '/login/';
    //             }
    //         }else{
    //             console.log("Refresh token not available.")
    //             window.location.href = '/login/';
    //         }
    //     }
    //
    //
    //     // specific error handling done elsewhere
    //     return Promise.reject(error);

        return response
    },
    error => {
        const originalRequest = error.config;

        // Prevent infinite loops
        if (error.response.status === 401 && originalRequest.url === config.URL + 'refresh/') {
            window.location.href = '/login/';
            return Promise.reject(error);
        }

        if (error.response.data.message === "Token not valid!" &&
            error.response.status === 401)
        {
            const refreshToken = localStorage.getItem(config.refresh_token);

            if (refreshToken){
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                // exp date in token is expressed in seconds, while now() returns milliseconds:
                const now = Math.ceil(Date.now() / 1000);

                if (tokenParts.exp > now) {
                    axiosInstance.defaults.headers['Authorization'] = refreshToken;
                    return axiosInstance
                        .post('/auth/refresh/', {})
                        .then((response) => {

                            localStorage.setItem('access_token', response.data.access_token);
                            localStorage.setItem('refresh_token', response.data.refresh_token);

                            axiosInstance.defaults.headers['Authorization'] = response.data.access_token;
                            originalRequest.headers['Authorization'] = response.data.access_token;

                            return axiosInstance(originalRequest);
                        })
                        .catch(err => {
                            console.log(err)
                        });
                }else{
                    console.log("Refresh token is expired", tokenParts.exp, now);
                    window.location.href = '/login/';
                }
            }else{
                console.log("Refresh token not available.")
                window.location.href = '/login/';
            }
        }


        // specific error handling done elsewhere
        return Promise.reject(error);
    }
);

export default axiosInstance;
