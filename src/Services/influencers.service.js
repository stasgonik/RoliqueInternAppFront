import axiosInstance from "./tokenInterceptor";
import config from '../Constants/configServer'


class _endpoint {
    static Influencers = 'influencers/';
}

export default class InfluencersService {

    static async getInfluencers(queryReq) {
        try{
            const result = await axiosInstance.get(`${config.URL}${_endpoint.Influencers}`,{
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
            const result = await axiosInstance.get(`${config.URL}${_endpoint.Influencers}${id}`);

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
            const result = await axiosInstance.put(`${config.URL}${_endpoint.Influencers}${id}`, body);


            return result.data
        } catch (e) {
            console.log(e)
        }
    }


    static getInfluencerId() {
        return localStorage.getItem(config.influencer_id);
    }

    // static async getSingleUsers(id) {
    //     try{
    //         const result = await axiosInstance.get(`${config.URL}${_endpoint.Users}${id}`);
    //
    //         if(result.status === 200) {
    //             return result.data
    //         }
    //     } catch (e) {
    //         console.log(e)
    //         return e
    //     }
    // }


    // static async postUsers(body) {
    //     try{
    //         const result = await axiosInstance.post(`${config.URL}${_endpoint.Users}`, body);
    //
    //         if(result.status === 200) {
    //             return result.data
    //         }
    //     } catch (e) {
    //         console.log(e)
    //         return e
    //     }
    // }




}
