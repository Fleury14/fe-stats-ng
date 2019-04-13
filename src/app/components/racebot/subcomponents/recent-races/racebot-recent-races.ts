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

    ngOnInit() {
        for (let i = 0; i < this.NO_OF_RECENT_RACES; i++) {
            this.recentRaces.push(this.data[i]);
        }
        console.log('recent races', this.recentRaces);
    }

}
