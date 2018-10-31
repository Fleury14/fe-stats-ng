import { NgModule } from '@angular/core';
import { ZScoreLeaderboard } from './zScore-leaderboard/zScore-leaderboard';
import { MostRacesLeaderboard } from './most-races-leaderboard/most-races-leaderboard';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ MostRacesLeaderboard, ZScoreLeaderboard ],
    exports: [ MostRacesLeaderboard, ZScoreLeaderboard ],
    imports: [ CommonModule ]
})

export class FeStatsModule {}
