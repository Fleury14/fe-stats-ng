import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './components/main/main.component';
import { PlayerStatsComponent } from './components/player-stats/player-stats.component';
import { PlayerRankingsComponent } from './components/player-rankings/player-rankings.component';
import { FeStatsComponent } from './components/fe-stats/fe-stats.component';
import { CurrentRacesComponent } from './components/current-races/current-races.component';

import { AppRoutingModule, routingComponents } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    routingComponents
  ],
  imports: [
    BrowserModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
