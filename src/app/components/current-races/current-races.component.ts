import { Component, OnInit } from '@angular/core';
import { RaceService } from '../../services/race.service';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'fes-current-races',
  templateUrl: './current-races.component.html',
  styleUrls: ['./current-races.component.scss']
})
export class CurrentRacesComponent implements OnInit {

  currentRace: any[] = []; // TODO: consider creating a type for race, even if its awfully big
  // racerList: any[] = [];
  objectKeys = Object.keys;

  constructor(private _race: RaceService, public time: TimeService) { }

  ngOnInit() {
    this._race.getCurrentRaces().subscribe(resp => {
      this.currentRace = this._filterFF4Races(resp['races']);
      this._prepareRaceData(this.currentRace);
      // console.log(this.currentRace);

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

      // set clock
      let timeElapsed = Math.floor(Date.now() / 1000) - parseInt(race.time);
      race['timeElapsed'] = timeElapsed;
      setInterval( () => {
        race.timeElapsed++;
      }, 1000)
      
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
      if ( flags.indexOf('S') !== -1 && flags.indexOf('S2') === -1 && flags.indexOf('S3') === -1 && flags.indexOf('S4') === -1 && flags.indexOf('S5') === -1) race.badges.push({class: 'warning', text: 'Shops shuffled with bias'});
      if ( flags.indexOf('S2') !== -1 ) race.badges.push({class: 'warning', text: 'Shops randomized with bias'});
      if ( flags.indexOf('S3') !== -1 ) race.badges.push({class: 'warning', text: 'Shops randomized without location bias'});
      if ( flags.indexOf('S4') !== -1 ) race.badges.push({class: 'success', text: 'Shops contain anything'});
      if ( flags.indexOf('S5') !== -1 ) race.badges.push({class: 'danger', text: 'Cabinfest 2018'});
      if ( flags.indexOf('T') !== -1 && flags.indexOf('T2') === -1 && flags.indexOf('T3') === -1 && flags.indexOf('T4') === -1 && flags.indexOf('T5') === -1) race.badges.push({class: 'warning', text: 'Chests shuffled with bias'});
      if ( flags.indexOf('T2') !== -1 ) race.badges.push({class: 'warning', text: 'Chests randomized with bias'});
      if ( flags.indexOf('T3') !== -1 ) race.badges.push({class: 'warning', text: 'Chests randomized without location bias'});
      if ( flags.indexOf('T4') !== -1 ) race.badges.push({class: 'success', text: 'Chests contain anything'});
      if ( flags.indexOf('T5') !== -1 ) race.badges.push({class: 'danger', text: 'Untrapped chests are all empty'});
      if ( flags.indexOf('$3') !== -1 ) race.badges.push({class: 'success', text: 'Everything in shops are free'});


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

  public toggleResults(e) {
    e.target.nextSibling.classList.toggle('hide-results');
  }

  public getPlaceFinish(race, place) {
    let name = null;
    for (let entrant in race.entrants) {
      if (race.entrants[entrant].place == place) name = race.entrants[entrant].displayname;
    };
    return name;
  }

  public getTimeFinish(race, place) {
    let time = null;
    for (let entrant in race.entrants) {
      if (race.entrants[entrant].place == place) time = race.entrants[entrant].time;
    };
    return time;
  }

}
