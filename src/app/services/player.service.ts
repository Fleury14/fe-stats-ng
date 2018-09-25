import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable()

export class PlayerService {

    constructor (private _http: HttpClient) {}

    public getPlayerBaseStats(player: string) {
        return this._http.get(`http://api.speedrunslive.com/stat?player=${player}&game=ff4hacks&page=1`);
    }

    public getRaceHistory(player:string) {
        return this._http.get(`http://api.speedrunslive.com/pastraces?player=${player}&game=ff4hacks&page=1&pageSize=500`);
    }

    public getLeaderBoard() {
        return this._http.get(`http://api.speedrunslive.com/leaderboard/ff4hacks?season=0`);
    }

    public getRating(player: string) {
        return this._http.get(`http://api.speedrunslive.com/leaderboard/ff4hacks?season=0`).pipe(
            map(response => {
                let rating = 0;
                response['leaders'].forEach(leader => {
                    if (leader['name'].toLowerCase() === player.toLowerCase()) rating = leader.trueskill;
                })
                return rating;
            })
        )
    }

}