import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './components/main/main.component';
import { PlayerStatsComponent } from './components/player-stats/player-stats.component';
import { PlayerRankingsComponent } from './components/player-rankings/player-rankings.component';
import { FeStatsComponent } from './components/fe-stats/fe-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MainComponent,
    PlayerStatsComponent,
    PlayerRankingsComponent,
    FeStatsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
