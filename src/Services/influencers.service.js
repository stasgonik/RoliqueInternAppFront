import axiosInstance from "./tokenInterceptor";
import configServer from '../Constants/configServer'

class _endpoint {
    static Influencers = 'influencers/';
}

export default class InfluencersService {
    static async getInfluencers(queryReq) {
        try{
            const result = await axiosInstance.get(`${configServer.URL}${_endpoint.Influencers}`,{
                params: queryReq
            });

            if(result.status === 200) {
                return result.data
            }
        } catch (e) {
            console.log(e)
            return e
        }
    }

    static async getSingleInfluencer(id) {
        try{
            const result = await axiosInstance.get(`${configServer.URL}${_endpoint.Influencers}${id}`, {
            });

            if(result.status === 200) {
                return result.data
            }
        } catch (e) {
            console.log(e)
            return e
        }
    }

    static async editInfluerence(body,id) {
        try{
            const result = await axiosInstance.put(`${configServer.URL}${_endpoint.Influencers}${id}`, body);

            return result.data
        } catch (e) {
            console.log(e)
        }
    }

    static async postInfluencer(body) {
        console.log(body)
        try{
            const result = await axiosInstance.post(`${configServer.URL}${_endpoint.Influencers}`, body);

            return result.data
        } catch (e) {
            console.log(e)
        }
    }
}
