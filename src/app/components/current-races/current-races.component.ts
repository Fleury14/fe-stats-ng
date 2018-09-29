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
      console.log(this.currentRace);
    });
  }

  private _filterFF4Races(races: any[]) {
    return races.filter(race => race.game.abbrev === 'ff4hacks');
  }

  public getRacers(race) {
    const racerList = [];
    let entrants = race.entrants;
    console.log('entrants', entrants)
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
