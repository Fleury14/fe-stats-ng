import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class PlayerService {

    constructor (private _http: HttpClient) {}

    public getPlayerBaseStats(player: string) {
        return this._http.get(`http://api.speedrunslive.com/stat?player=${player}&game=ff4hacks&page=1`);
    }

    public getRaceHistory(player:string) {
        return this._http.get(`http://api.speedrunslive.com/pastraces?player=${player}&game=ff4hacks&page=1&pageSize=500`);
    }

}