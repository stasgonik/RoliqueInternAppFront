import axiosInstance from "./tokenInterceptor";
import configServer from '../Constants/configServer'

const _endpoint = {
    BRANDS: 'brands/'
}

export default class BrandService {
    static async getBrands(queryReq) {
        try{
            const result = await axiosInstance.get(`${configServer.URL}${_endpoint.BRANDS}`,{
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

    static async getSingleBrand(id) {
        try{
            const result = await axiosInstance.get(`${configServer.URL}${_endpoint.BRANDS}${id}`);

            if(result.status === 200) {
                return result.data
            }
        } catch (e) {
            console.log(e)
            return e
        }
    }

    static async postBrands(body) {
        try{
            const result = await axiosInstance.post(`${configServer.URL}${_endpoint.BRANDS}`, body);

            return result
        } catch (e) {
            console.log(e)
            return e
        }
    }

    static async editBrand(body,id) {
        try{
            const result = await axiosInstance.put(`${configServer.URL}${_endpoint.BRANDS}${id}`, body);

            return result
        } catch (e) {
            console.log(e)
            return e
        }
    }
}
