import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SERVER_URL } from '../serverUrl';

/*
  Generated class for the BuyingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BuyingProvider {
    server: string = SERVER_URL;
  constructor(public http: HttpClient) {}

    request(info, file) {
        return this.http.post(this.server + file, info).map(res => res);
    }
    getRequest(file) {
        return this.http.get(this.server + file).map(res => res);
    }
}
