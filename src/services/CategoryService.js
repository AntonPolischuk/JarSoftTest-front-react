import axios from 'axios';

const CATEGORY_API_BASE_URL = "http://localhost:8080/api/v1/categories/";

class CategoryService{
    
    getAllCategories(){

        return axios.get(CATEGORY_API_BASE_URL);
    }

    getCategoryById(categoryId){

        return axios.get(CATEGORY_API_BASE_URL + categoryId);
    }

    createCategory(category){

        return axios.post(CATEGORY_API_BASE_URL + 'post', category);
    }

    updateCategory(category, categoryId){
        
        return axios.put(CATEGORY_API_BASE_URL + '/update/' + categoryId, category);
    }

    deleteCategoty(categoryId){

        return axios.delete(CATEGORY_API_BASE_URL + '/delete/' + categoryId);
        
    }


    
    

}

export default new CategoryService()