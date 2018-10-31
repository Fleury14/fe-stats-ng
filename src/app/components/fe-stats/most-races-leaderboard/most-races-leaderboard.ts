import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'fes-most-races',
    templateUrl: './most-races-leaderboard.html',
    styleUrls: [ './most-races-leaderboard.scss' ]
})

export class MostRacesLeaderboard implements OnInit {
    selected: string = 'lastWeek'
    @Input() data: any;
    
    ngOnInit() {
        console.log('data recieved', this.data);
    }

    public switchActive(flag: string) {
        this.selected = flag;
    }
    
}