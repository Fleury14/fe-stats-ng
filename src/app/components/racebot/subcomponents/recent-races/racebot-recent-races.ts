import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'fes-racebot-recent',
    templateUrl: './racebot-recent-races.html',
    styleUrls: ['./racebot-recent-races.scss']
})

export class RacebotRecentRacesComponent {
    private NO_OF_RECENT_RACES = 10;
    public recentRaces: any[] = [];
    @Input() data: any;
    selected: Number;

    ngOnInit() {
        for (let i = 0; i < this.NO_OF_RECENT_RACES; i++) {
            this.recentRaces.push(this.data[i]);
        }

        for (let race of this.recentRaces) {
            this.sortFinishersByPlacement(race.details.finishers)
        }
        console.log('recent races', this.recentRaces);
    }

    public selectRace(num: Number) {
        this.selected = num;
    }

    private sortFinishersByPlacement(finishers: any[]) {
        return finishers.sort((finisher1, finisher2) => finisher1.placement - finisher2.placement);
    }

}
