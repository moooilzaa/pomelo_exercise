import HttpCore from './http.core';
import { HTTP_POST,HTTP_GET } from '../constant/http.method';
import {APIKEY} from '../constant/api.config';


class NYTimesService extends HttpCore {
    
    getPopularViews(period){
        const url = `mostpopular/v2/viewed/${period}.json?offset=0&api-key=${APIKEY}`
        console.log('url:',url)
        return this.sendRequest(url,HTTP_GET, '');
    }

    onSearchArticle(term){
        // const url = `search/v2/articlesearch.json?q=${term}&fq=document_type:("article")&sort=newest&api-key=${APIKEY}&page=1`
        const url = `search/v2/articlesearch.json?q=${term}&type=article&sort=newest&api-key=${APIKEY}`
        return this.sendRequest(url,HTTP_GET,'')
    }

    onSearchbyId(id){
        const url = `search/v2/articlesearch.json?u&fq=uri:("nyt://article/${id}")&api-key=${APIKEY}`
        console.log(url);
        return this.sendRequest(url,HTTP_GET,'')
    }
}

export default new NYTimesService();