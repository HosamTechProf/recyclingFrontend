import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { SERVER_URL } from '../serverUrl';

@Injectable()

export class AuthProvider {
    server: string = SERVER_URL;
    constructor(public http: HttpClient) { }

    login(info, file) {
        return this.http.post(this.server + file, info).map(res => res);
    }

    register(info, file) {
        return this.http.post(this.server + file, info).map(res => res);
    }

    getUserData(file) {
        return this.http.get(this.server + file).map(res => res);
    }

}
