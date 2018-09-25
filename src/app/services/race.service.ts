import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class RaceService {

    constructor (private _http: HttpClient) {}

    public getCurrentRaces() {
        return this._http.get('http://api.speedrunslive.com/races');
    }

}