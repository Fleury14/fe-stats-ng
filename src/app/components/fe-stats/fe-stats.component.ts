import { Component, OnInit } from '@angular/core';
import { RaceService } from '../../services/race.service';

@Component({
  selector: 'fes-fe-stats',
  templateUrl: './fe-stats.component.html',
  styleUrls: ['./fe-stats.component.scss']
})
export class FeStatsComponent implements OnInit {

  public stats;

  constructor(private _race: RaceService) { }

  ngOnInit() {
    this._race.getStats().subscribe(resp => {
      this.stats = resp;
    })
  }

}
