import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';

import { AppRoutingModule, routingComponents } from './app.routing.module';

import { RaceService } from './services/race.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    routingComponents,
    FooterComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule
  ],
  providers: [RaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
