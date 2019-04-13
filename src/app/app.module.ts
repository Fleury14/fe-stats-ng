import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
// import { ZScoreLeaderboard } from './components/fe-stats/zScore-leaderboard/zScore-leaderboard';

import { AppRoutingModule, routingComponents } from './app.routing.module';
import { FeStatsModule } from './components/fe-stats/fe-stats.module';
import { RacebotModule } from './components/racebot/racebot.module';

import { RaceService } from './services/race.service';
import { PlayerService } from './services/player.service';
import { TimeService } from './services/time.service';
import { RaceBotService } from './services/racebot.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    routingComponents,
    FooterComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule, NgbModule, FormsModule, NgxChartsModule,
    FeStatsModule, RacebotModule
  ],
  providers: [RaceService, PlayerService, TimeService, RaceBotService],
  bootstrap: [AppComponent]
})
export class AppModule { }
