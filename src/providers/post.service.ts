import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PostService {
    endpoint:string = 'http://thfservices.totvs.com.br:8085/post'
    constructor(
		private _http: HttpClient
    ) {
    }

    postPhoto(post){
        return this._http.post(this.endpoint, post);
    }

    getPosts(){
        return this._http.get('http://thfservices.totvs.com.br:8085/posts');
    }
}
