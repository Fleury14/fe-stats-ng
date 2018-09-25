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
    for (let key in race) {
      const racer = {
        name: race[key].displayName,
        place: race[key].place,
        time: race[key].time,
        message: race[key].message,
        statetext: race[key].statetext,
        twitch: race[key].twitch,
        trueskill: race[key].trueskill
      }
      racerList.push(racer);
    }
    return racerList;
  }

}
