import axios from 'axios';

const BANNER_API_BASE_URL="http://localhost:8080/api/v1/banners/";

class BannerService{

    getAllBanners(){

        return axios.get(BANNER_API_BASE_URL);
        
    }

    getBannerById(bannerId){

        return axios.get(BANNER_API_BASE_URL + bannerId);
    }

    createBanner(banner){

        return axios.post(BANNER_API_BASE_URL + "post", banner);
    }

    updateBanner(banner, bannerId){
        
        return axios.put(BANNER_API_BASE_URL + 'update/' + bannerId, banner);
    }

    deleteBanner(bannerId){

        return axios.delete(BANNER_API_BASE_URL + 'delete/' + bannerId);
        
    }


}
export default new BannerService()