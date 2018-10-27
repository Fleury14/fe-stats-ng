import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'fes-zScore-leaderboard',
    templateUrl: './zScore-leaderboard.html',
    styleUrls: [ './zScore-leaderboard.scss' ]
})

export class ZScoreLeaderboard implements OnInit {
    @Input() data: any[];

    ngOnInit() {
        console.log('data recieved', this.data);
    }
    
}