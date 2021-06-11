import axiosInstance from "./tokenInterceptor";
import configServer from '../Constants/configServer'

const _endpoint = {
    SEND_MAIL : 'email/forgotPassword/'
}

export default class EmailService {
    static async sendForgotPasswordEmail(body) {
        try{
            const result = await axiosInstance.post(`${configServer.URL}${_endpoint.SEND_MAIL}`, body);

            return result
        } catch (e) {
            return e
        }
    }
}
