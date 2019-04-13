import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class RaceBotService {
    constructor (private _http: HttpClient) {}

    config = {
        headers: {
            apiKey: environment.apikey
        }
    }

    public getAllRaces() {
        return this._http.get('http://ec2-52-15-172-83.us-east-2.compute.amazonaws.com:8080?pageSize=1000', this.config);
    }
}