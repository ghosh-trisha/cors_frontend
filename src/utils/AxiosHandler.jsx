
import axios from 'axios'

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:3000/api/v1/cors',
    baseURL: 'https://cors-backend-bn7d.onrender.com/api/v1/cors',
    timeout: 60*1000*2, // 10 second
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    withCredentials: true
});

const AxiosHandler = async ( method, url, data = {}, config = {} )=>{
    try{
        const response = await axiosInstance({
            method,
            url,
            data, // body
            ...config // options
        });
        return response.data;
    }
    catch(error){
        console.log('error = ', error);
        return {
            success: false,
            message: error.message
        }
    }
}

export default AxiosHandler