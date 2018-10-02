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

    public getRecents() {
        return this._http.get('http://api.speedrunslive.com/pastraces?game=ff4hacks&season=0&page=1&pageSize=20');
    }

    public getAllRaces() {
        return this._http.get('http://api.speedrunslive.com/pastraces?game=ff4hacks&season=0&page=1&pageSize=5000');
    }

    public getStats() {
        return this._http.get('http://api.speedrunslive.com/stat?game=ff4hacks&season=0');
    }

    public addZScore(race) {
        // This function takes in a race and assigns a standard mean, standard deviation for the race and a z-score for each individual playeer
    
        const raceTimes = [];
        const raceLongTime = this._getLongestTime(race);
        const forfeitPenalty = 60 * 5;
        // put all times into one array
        race.results.forEach(result => {
            if (result.time === -1) {
                raceTimes.unshift(raceLongTime + forfeitPenalty);
            } else {
                raceTimes.unshift(result.time);
            }
        });

        // calculate mean
        let standaredMean = raceTimes.reduce((a, b) => a + b, 0) / raceTimes.length;
        race['stdMean'] = standaredMean;

        const sqrdDiff = [];
        // populate array of squared differences
        raceTimes.forEach(time => {
            if (time === -1) time = raceLongTime + forfeitPenalty;
            sqrdDiff.unshift(Math.pow(time - standaredMean, 2));
        });
        
        // get the mean of squred differences
        let sqrdMean = sqrdDiff.reduce((a, b) => a + b, 0) / sqrdDiff.length;
        // and from that get std dev and assign it to race
        let stdDev = Math.sqrt(sqrdMean);
        race['stdDev'] = stdDev;

        // assign each calculated z-score to the respective result
        race.results.forEach(result => {
            result['zScore'] = ((result.time === -1 ? raceLongTime + forfeitPenalty : result.time) - race.stdMean) / race.stdDev;
        });
    }

    private _getLongestTime(race) {
        let longestTime = 0;
        race.results.forEach(result => {
            if (result.time > longestTime) longestTime = result.time;
        });
        return longestTime;
      }
}