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
