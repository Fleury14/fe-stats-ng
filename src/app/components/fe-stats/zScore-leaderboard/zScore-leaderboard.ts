import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'fes-zScore-leaderboard',
    templateUrl: './zScore-leaderboard.html',
    styleUrls: [ './zScore-leaderboard.scss' ]
})

export class ZScoreLeaderboard implements OnInit {
    selected: string = 'lastWeek';
    @Input() data: any;

    ngOnInit() {
    }
    
    public switchActive(flag: string) {
        this.selected = flag;
    }
}