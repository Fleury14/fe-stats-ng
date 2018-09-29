import { Component, OnInit } from '@angular/core';
import { RaceService } from '../../services/race.service';

@Component({
  selector: 'fes-current-races',
  templateUrl: './current-races.component.html',
  styleUrls: ['./current-races.component.scss']
})
export class CurrentRacesComponent implements OnInit {

  currentRace: any[] = []; // TODO: consider creating a type for race, even if its awfully big
  // racerList: any[] = [];

  constructor(private _race: RaceService) { }

  ngOnInit() {
    this._race.getCurrentRaces().subscribe(resp => {
      this.currentRace = this._filterFF4Races(resp['races']);
      this._prepareRaceData(this.currentRace);
      console.log(this.currentRace);

    });
  }

  private _filterFF4Races(races: any[]) {
    return races.filter(race => race.game.abbrev === 'ff4hacks');
  }

  private _prepareRaceData(races: any[]) {
    races.forEach(race => {
      const entrants = race.entrants;
      let totalSkill = 0;
      for (let key in entrants) {
        totalSkill += parseInt(entrants[key].trueskill);
      }
      race['totalSkill'] = totalSkill;

      const flagsPos = race.goal.indexOf('flags=');
      const endFlagsPos = race.goal.indexOf('&amp');
      let flags = race.goal.slice(flagsPos + 6, endFlagsPos);
      if (flags.indexOf('J2KC2T4S3BF2NE3$X2Y2GWZ') !== -1) { flags += ' (League Qualifier)'; }
      else if (flags.indexOf('JK2PCT3S2BF2NE3X2Y2GZ') !== -1) { flags += ' (League Ro.32)'; }
      else if (flags.indexOf('JK2PC3T3S2BF2NE3X2Y2GZ') !== -1) { flags += ' (League Ro.16'; }
      race['parsedFlags'] = flags;
      
      // flag badge parsing
      race['badges'] = [];

      if ( flags.indexOf('V') !== -1 && flags.indexOf('V2') === -1) race.badges.push({class: 'info', text: 'Forge The Crystal'});
      if ( flags.indexOf('V2') !== -1 ) race.badges.push({class: 'info', text: 'Giant%'});
      if ( flags.indexOf('J') === -1 ) race.badges.push({class: 'danger', text: 'No J-Items or Cmds'});
      if ( flags.indexOf('J') !== -1 && flags.indexOf('J2') === -1) race.badges.push({class: 'warning', text: 'J-Items Only'});
      if ( flags.indexOf('J2') !== -1 ) race.badges.push({class: 'success', text: 'J-Items & Cmds'});
      if ( flags.indexOf('K2') !== -1 || flags.indexOf('K3') !== -1 || flags.indexOf('K4') !== -1 ) race.badges.push({class: 'warning', text: 'Key Items at Summon/Lunar Bosses'});
      if ( flags.indexOf('K3') !== -1 || flags.indexOf('K4') !== -1 ) race.badges.push({class: 'danger', text: 'Key Items in Trapped Chests'});
      if ( flags.indexOf('K4') !== -1 ) race.badges.push({class: 'danger', text: 'Possible Moon before Underground'});
      if ( flags.indexOf('P') === -1 ) race.badges.push({class: 'success', text: 'Pass in a Shop'});
      if ( flags.indexOf('P') !== -1 && flags.indexOf('P2') === -1) race.badges.push({class: 'warning', text: 'Pass is a Key Item'});
      if ( flags.indexOf('P2') !== -1 ) race.badges.push({class: 'danger', text: 'Pass in 3 non-moon chests'});
      if ( flags.indexOf('C3') !== -1 ) race.badges.push({class: 'danger', text: 'Only 5 character available'});
      if ( flags.indexOf('W') === -1 ) race.badges.push({class: 'danger', text: 'WHY BURN?!'});
      if ( flags.indexOf('W') !== -1 && flags.indexOf('W2') === -1) race.badges.push({class: 'success', text: 'Why Burn disabled'});
      if ( flags.indexOf('W2') !== -1 ) race.badges.push({class: 'warning', text: 'Why Burn Replaced'});
      if ( flags.indexOf('G') === -1 ) race.badges.push({class: 'danger', text: 'Major Glitches Allowed'})
        else { race.badges.push({class: 'success', text: 'Major Glitches Disabled'})};
      if ( flags.indexOf('N') === -1 ) race.badges.push({class: 'success', text: 'Free Lunch'});
      if ( flags.indexOf('N') !== -1 ) race.badges.push({class: 'warning', text: 'Rydias Mom / Mist Dragon in play'}, {class: 'warning', text: 'No Free Lunch Recruitments'});
      if ( flags.indexOf('N2') !== -1 ) race.badges.push({class: 'danger', text: 'No Free Bosses'});

        //   if (strpos($flags, 'V') !== false && strpos($flags, 'V2') === false){
        //     ?><span class="badge badge-info mr-3 mb-3">Forge The Crystal</span><?php
        // }
        // if (strpos($flags, 'V2') !== false) {
        //     ?><span class="badge badge-info mr-3 mb-3">Giant%</span><?php
        // }
        // if (strpos($flags, 'J') === false){
        //     ?><span class="badge badge-danger mr-3 mb-3">No J-Items or Cmds</span><?php
        // }
        // if (strpos($flags, 'J') !== false && strpos($flags, 'J2') === false) {
        //     ?><span class="badge badge-warning mr-3 mb-3">J-Items Only</span><?php
        // }
        // if (strpos($flags, 'J2') !== false) {
        //     ?><span class="badge badge-success mr-3 mb-3">J Items & Cmds</span><?php
        // }
        // if (strpos($flags, 'K2') !== false || strpos($flags, 'K3') !== false || strpos($flags, 'K4') !== false) {
        //     ?><span class="badge badge-warning mr-3 mb-3">Key Items at Summon/Lunar Bosses</span><?php
        // }
        // if (strpos($flags, 'K3') !== false || strpos($flags, 'K4') !== false) {
        //     ?><span class="badge badge-danger mr-3 mb-3">Key Items in Trapped Chests</span><?php
        // }
        // if (strpos($flags, 'K4') !== false) {
        //     ?><span class="badge badge-danger mr-3 mb-3">Possible Moon before Underground</span><?php
        // }
        // if (strpos($flags, 'P') === false) {
        //     ?><span class="badge badge-success mr-3 mb-3">Pass in a shop</span><?php
        // }
        // if (strpos($flags, 'P') !== false && strpos($flags, 'P2') === false) {
        //     ?><span class="badge badge-warning mr-3 mb-3">Pass mixed with key items</span><?php
        // }
        // if (strpos($flags, 'P2') !== false) {
        //     ?><span class="badge badge-danger mr-3 mb-3">Pass in 3 random non-moon chests</span><?php
        // }
        // if (strpos($flags, 'C3') !== false) {
        //     ?><span class="badge badge-danger mr-3 mb-3">Only 5 characters available</span><?php
        // }
        // if (strpos($flags, 'W') === false) {
        //     ?><span class="badge badge-danger mr-3 mb-3">WHY BURN?</span><?php
        // }
        // if (strpos($flags, 'W') !== false && strpos($flags, 'W2') === false) {
        //     ?><span class="badge badge-success mr-3 mb-3">Whyburn disabled</span><?php
        // }
        // if (strpos($flags, 'W2') !== false) {
        //     ?><span class="badge badge-danger mr-3 mb-3">Whyburn replaced</span><?php
        // }
        // if (strpos($flags, 'G') === false) {
        //     ?><span class="badge badge-warning mr-3 mb-3">Major Glitches Allowed</span><?php
        // } else {
        //     ?><span class="badge badge-success mr-3 mb-3">Major Glitches Disabled</span><?php
        // }
        // if (strpos($flags, 'N') === false) {
        //     ?><span class="badge badge-success mr-3 mb-3">Free Lunch</span><?php
        // }
        // if (strpos($flags, 'N') !== false) {
        //     ?><span class="badge badge-warning mr-3 mb-3">Rydia's Mom / Mist Dragon in play</span><span class="badge badge-warning mr-3 mb-3">No Free Lunch Recruitments</span><?php
        // }
        // if (strpos($flags, 'N2') !== false) {
        //     ?><span class="badge badge-danger mr-3 mb-3">No Free Bosses</span><?php
        // }
        // if (strpos($flags, 'S') !== false && strpos($flags, 'S2') === false && strpos($flags, 'S3') === false && strpos($flags, 'S4') === false && strpos($flags, 'S5') === false ) {
        //     ?><span class="badge badge-warning mr-3 mb-3">Shop shuffled with bias</span><?php
        // }
        // if (strpos($flags, 'S2') !== false) {
        //     ?><span class="badge badge-warning mr-3 mb-3">Shops randomized with bias</span><?php
        // }
        // if (strpos($flags, 'S3') !== false) {
        //     ?><span class="badge badge-warning mr-3 mb-3">Shops randomized without location bias</span><?php
        // }
        // if (strpos($flags, 'S4') !== false) {
        //     ?><span class="badge badge-success mr-3 mb-3">Shops contain anything</span><?php
        // }
        // if (strpos($flags, 'S5') !== false) {
        //     ?><span class="badge badge-danger mr-3 mb-3">CabinFest 2018</span><?php
        // }
        // if (strpos($flags, 'T') !== false && strpos($flags, 'T2') === false && strpos($flags, 'T3') === false && strpos($flags, 'T4') === false && strpos($flags, 'T5') === false ) {
        //     ?><span class="badge badge-warning mr-3 mb-3">Untrapped chests shuffled with bias</span><span class="badge badge-warning mr-3 mb-3">Trapped chests shuffles with Summons/Lunar Bosses</span><?php
        // }
        // if (strpos($flags, 'T2') !== false  ) {
        //     ?><span class="badge badge-warning mr-3 mb-3">Untrapped chests randomized with bias</span><?php
        // }
        // if (strpos($flags, 'T3') !== false  ) {
        //     ?><span class="badge badge-warning mr-3 mb-3">Untrapped chests randomized without location bias</span><?php
        // }
        // if (strpos($flags, 'T4') !== false  ) {
        //     ?><span class="badge badge-success mr-3 mb-3">Untrapped chests contain anything</span><?php
        // }
        // if (strpos($flags, 'T5') !== false  ) {
        //     ?><span class="badge badge-danger mr-3 mb-3">Untrapped chests empty</span><?php
        // }

    });

  } 

  public getRacers(race) {
    const racerList = [];
    let entrants = race.entrants;
    for (let key in entrants) {
      const racer = {
        name: entrants[key].displayname,
        place: entrants[key].place,
        time: entrants[key].time,
        message: entrants[key].message,
        statetext: entrants[key].statetext,
        twitch: entrants[key].twitch,
        trueskill: entrants[key].trueskill
      }
      racerList.push(racer);
    }
    return racerList;
  }

}
