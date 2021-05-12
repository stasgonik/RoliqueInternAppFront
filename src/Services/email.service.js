import axiosInstance from "./tokenInterceptor";
import configServer from '../Constants/configServer'

class _endpoint {
    static sendMail = 'email/forgotPassword/';
}

export default class EmailService {
    static async sendForgotPasswordEmail(body) {
        try{
            const result = await axiosInstance.post(`${configServer.URL}${_endpoint.sendMail}`, body);

            return result
        } catch (e) {
            return e
        }
    }
}
