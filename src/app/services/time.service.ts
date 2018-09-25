import { Injectable } from '@angular/core';

@Injectable()

export class TimeService {

    public formatTotalTime(timeInSecs:number) {
        let timeBuffer = timeInSecs;
        let daysPlayed = null;
        let hoursPlayed = null;
        let minsPlayed = null;
        let secPlayed = null;
        if (timeBuffer > 86400) {
            daysPlayed = Math.floor( timeBuffer / 86400 );
            timeBuffer = timeBuffer % 86400;
        }

        if (timeBuffer > 3600) {
            hoursPlayed = Math.floor( timeBuffer / 3600);
            timeBuffer = timeBuffer % 3600;
        }

        if (timeBuffer > 60) {
            minsPlayed = Math.floor( timeBuffer / 60);
            timeBuffer = timeBuffer % 60;
        }

        secPlayed = timeBuffer;
        return {
            days: daysPlayed,
            hours: hoursPlayed,
            minutes: minsPlayed,
            seconds: secPlayed
        };

    }
}