import axiosInstance from "./tokenInterceptor";
import configServer from '../Constants/configServer'

class _endpoint {
    static Campaigns = 'campaigns/';
}

export default class CampaignService {
    static async getCampaigns(queryReq) {
        try {
            const result = await axiosInstance.get(`${configServer.URL}${_endpoint.Campaigns}`, {
                params: queryReq
            });

            if (result.status === 200) {
                return result.data
            }
        } catch (e) {
            console.log(e)
            return e
        }
    }

    static async getSingleCampaign(id) {
        try {
            const result = await axiosInstance.get(`${configServer.URL}${_endpoint.Campaigns}${id}`);

            if (result.status === 200) {
                return result.data
            }
        } catch (e) {
            console.log(e)
            return e
        }
    }

    static async postCampaign(body) {
        try {
            const result = await axiosInstance.post(`${configServer.URL}${_endpoint.Campaigns}`, body);

            return result
        } catch (e) {
            console.log(e)
            return e
        }
    }

    static async updateCampaign(body, id) {
        try {
            const result = await axiosInstance.put(`${configServer.URL}${_endpoint.Campaigns}${id}`, body);

            return result
        } catch (e) {
            console.log(e)
            return e
        }
    }

}
