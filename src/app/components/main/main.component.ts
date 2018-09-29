import { Component, OnInit } from '@angular/core';
import { RaceService } from '../../services/race.service';

@Component({
  selector: 'fes-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public numOfRaces: number;
  private ff4Races;

  constructor(private _race: RaceService) { }

  ngOnInit() {
    this._race.getCurrentRaces().subscribe(resp => {
      this.ff4Races = resp['races'].filter(race => race.game.abbrev === 'ff4hacks');
      this.numOfRaces = this.ff4Races.length;
    })
  }

}
