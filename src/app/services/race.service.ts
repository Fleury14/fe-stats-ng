import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class RaceService {

    constructor (private _http: HttpClient) {}

    public getCurrentRaces() {
        return this._http.get('http://api.speedrunslive.com/races');
    }

    public findMyTime(race, player_name:string) {
		let time = null;
		if (race !== null) {
            race.results.forEach(result => {
                if (result.player.toLowerCase() == player_name.toLowerCase() && result.time !== -1) time = result.time;
            });
		} 
		return time;
    }

}