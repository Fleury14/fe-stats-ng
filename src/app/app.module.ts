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
import { ZScoreLeaderboard } from './components/fe-stats/zScore-leaderboard/zScore-leaderboard';

import { AppRoutingModule, routingComponents } from './app.routing.module';

import { RaceService } from './services/race.service';
import { PlayerService } from './services/player.service';
import { TimeService } from './services/time.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    routingComponents,
    FooterComponent,
    ZScoreLeaderboard
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule, NgbModule, FormsModule, NgxChartsModule
  ],
  providers: [RaceService, PlayerService, TimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
