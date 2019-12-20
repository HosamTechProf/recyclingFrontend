import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { SERVER_URL } from '../serverUrl';

@Injectable()
export class AdsProvider {
    server: string = SERVER_URL;
	constructor(public http: HttpClient) { }

    addSellerAd(info, file) {
        return this.http.post(this.server + file, info).map(res => res);
    }

    getAds(file) {
        return this.http.get(this.server + file).map(res => res);
    }

    getMyAds(file) {
        return this.http.get(this.server + file).map(res => res);
    }
}
