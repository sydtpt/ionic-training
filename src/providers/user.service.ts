import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    endpoint:string = 'http://localhost:8081/user'
    constructor(
		private _http: HttpClient
    ) {
    }

    registerUser(user){
        return this._http.post(this.endpoint,{user:user});
    }

    getUsers(){
        return this._http.get(this.endpoint);
    }
}
