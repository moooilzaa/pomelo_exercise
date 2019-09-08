import axios from 'axios';
import { HTTP_GET } from '../constant/http.method';
import {API_NYTimes} from '../constant/api.config';


export default class HttpCore {

    sendRequest(url,method = 'GET' ,data){
        let request = createRequestObject(url, data, method, API_NYTimes);
        const headers = { 'Content-Type': 'application/json' }
        request.headers = headers;

        return axios(request).then((res) => {
            const { data, headers, status } = res; 
            return { data, headers, status };
        }, (error) => {
            const { data, headers, status, statusText } = error.response;
            throw { data, headers, status, statusText };
        })
        .catch(error => {
            throw error
        })

    }

}

const createRequestObject = (url, data, method,apiUrl) => {
    url = `${apiUrl}${url}`;
    return (method === HTTP_GET) ? 
                    { url, method } : 
                    { url, method, data };
}