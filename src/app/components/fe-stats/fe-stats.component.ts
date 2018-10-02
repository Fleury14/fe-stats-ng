import { Component, OnInit } from '@angular/core';
import { RaceService } from '../../services/race.service';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'fes-fe-stats',
  templateUrl: './fe-stats.component.html',
  styleUrls: ['./fe-stats.component.scss']
})
export class FeStatsComponent implements OnInit {

  public stats;
  public allRaces;
  public racetypes = {
    qual: [],
    ro32: [],
    ro16: [],
    community: []
  };
  public numCount = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(private _race: RaceService, public time: TimeService) { }

  ngOnInit() {
    this._race.getStats().subscribe(resp => {
      this.stats = resp;
    });
    this._race.getAllRaces().subscribe(resp => {
      this.allRaces = resp['pastraces'];
      this.allRaces.forEach(race => {
        if (race.goal.indexOf('J2KC2T4S3BF2NE3$X2Y2GWZ') !== -1) this.racetypes.qual.push(race);
        if (race.goal.indexOf('JK2PCT3S2BF2NE3X2Y2GZ') !== -1) this.racetypes.ro32.push(race);
        if (race.goal.indexOf('JK2PC3T3S2BF2NE3X2Y2GZ') !== -1) this.racetypes.ro16.push(race);
        if (race.goal.indexOf('Community') !== -1) this.racetypes.community.push(race);
        this._race.addZScore(race);
      });
      this.racetypes.qual.sort(this.winningTimeCmp);
      this.racetypes.ro32.sort(this.winningTimeCmp);
      this.racetypes.ro16.sort(this.winningTimeCmp);
    })
  }

  private winningTimeCmp(race1, race2) {
    
      let race1Time = null;
      let race2Time = null;
      race1.results.forEach(result => {
        if (result.place === 1) race1Time = result.time;
      });
      race2.results.forEach(result => {
        if (result.place === 1) race2Time = result.time;
      });
      
      race1Time = race1Time !== -1 ? race1Time : 99999;
      race2Time = race2Time !== -1 ? race2Time : 99999;

      return race1Time - race2Time;
  
  }

}
