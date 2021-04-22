import axiosInstance from "./tokenInterceptor";
import config from '../Constants/configServer'


class _endpoint {
    static sendMail = 'email/forgotPassword/';
}

export default class EmailService {

    static async sendForgotPasswordEmail(body) {
        try{
            const result = await axiosInstance.post(`${config.URL}${_endpoint.sendMail}`, body);

            return result
        } catch (e) {
            console.log(e)
            return e
        }
    }


}
