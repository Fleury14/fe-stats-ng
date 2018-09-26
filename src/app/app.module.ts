import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';

import { AppRoutingModule, routingComponents } from './app.routing.module';

import { RaceService } from './services/race.service';
import { PlayerService } from './services/player.service';
import { TimeService } from './services/time.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    routingComponents,
    FooterComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, NgbModule, FormsModule
  ],
  providers: [RaceService, PlayerService, TimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
