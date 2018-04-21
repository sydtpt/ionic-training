import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {
    server:string = 'http://thfservices.totvs.com.br:8085/'
    constructor(
		private _http: HttpClient
    ) {
    }

    sendPhoto(post: Post){
        return this._http.post(this.server+'post', post);
    }

    getPosts(createdBefore?): Observable<Post[]>{

        let endpoint = this.server + 'posts';
        if(createdBefore){
            endpoint += '?createdBefore=' + createdBefore;
        }

        return this._http.get(endpoint)
        .map(res => <Post[]>res['posts']);
    }
}
