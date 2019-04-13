import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import FakeRaceData from '../classes/fake-racebot-data';

@Injectable()

export class RaceBotService {
    constructor (private _http: HttpClient) {}

    config = {
        headers: new HttpHeaders({
            'apikey': environment.apikey
        })
    };

    public getAllRaces() {
        const httpOptions = {
            headers: new HttpHeaders({
              'apikey': environment.apikey
            })
          };
        return this._http.get('http://ec2-52-15-172-83.us-east-2.compute.amazonaws.com:8080/races?pageSize=1000', httpOptions);
    }

    public getAllRacesFake() {
        return FakeRaceData;
    }
}