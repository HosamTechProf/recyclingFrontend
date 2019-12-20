import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SERVER_URL } from '../serverUrl';

/*
  Generated class for the CodesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CodesProvider {
    server: string = SERVER_URL;
  constructor(public http: HttpClient) {}

    scan(info, file) {
        return this.http.post(this.server + file, info).map(res => res);
    }

}
