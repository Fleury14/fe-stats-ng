import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { PlayerStatsComponent } from './components/player-stats/player-stats.component';
import { FeStatsComponent } from './components/fe-stats/fe-stats.component';
import { PlayerRankingsComponent } from './components/player-rankings/player-rankings.component';
import { CurrentRacesComponent } from './components/current-races/current-races.component';

const routes:Route[] = [{
    path: 'main',
    component: MainComponent
},{
    path: 'player-stats/:player',
    component: PlayerStatsComponent
}, {
    path: 'fe-stats',
    component: FeStatsComponent
}, {
    path: 'player-rankings',
    component: PlayerRankingsComponent
}, {
    path: 'current-races',
    component: CurrentRacesComponent
}, {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
}];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}

export const routingComponents = [ MainComponent, PlayerStatsComponent, FeStatsComponent, PlayerRankingsComponent, CurrentRacesComponent];