import { Component, OnInit } from '@angular/core';
import { RaceService } from '../../services/race.service';
import { TimeService } from '../../services/time.service';
import { FlagStats } from '../../classes/flag-stats';

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
  public raceFlags = new FlagStats();

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

  private _parseRaceFlags(race) {
    let flags_pos = race.goal.indexOf('?flags=');
    let seed_pos = race.goal.indexOf('&amp;seed=');
    let goal_flags = null;
    if (flags_pos !== -1 ) {
        goal_flags = race.goal.slice( flags_pos + 7, seed_pos - flags_pos - 7);
    }
    
    if (goal_flags) { 
      if ( goal_flags.indexOf('J') > -1 && goal_flags.indexOf('J2') === -1 ) { this.raceFlags['J'][1]++; this.raceFlags['J']['count']++; }
      if ( goal_flags.indexOf('J2') > -1 ) { this.raceFlags['J'][2]++; this.raceFlags['J']['count']++; }
      if ( goal_flags.indexOf('J') === -1 ) { this.raceFlags['J'][0]++; this.raceFlags['J']['count']++; }
      if ( goal_flags.indexOf('K') > -1 && goal_flags.indexOf('K2') === -1 && goal_flags.indexOf('K3') === -1 && goal_flags.indexOf('K4') === -1 ) { this.raceFlags['K'][1]++; this.raceFlags['K']['count']++; }
      if ( goal_flags.indexOf('K2') > -1 ) { this.raceFlags['K'][2]++; this.raceFlags['K']['count']++; }
      if ( goal_flags.indexOf('K3') > -1 ) { this.raceFlags['K'][3]++; this.raceFlags['K']['count']++; }
      if ( goal_flags.indexOf('K4') > -1 ) { this.raceFlags['K'][4]++; this.raceFlags['K']['count']++; }
      if ( goal_flags.indexOf('K') === -1 ) { this.raceFlags['K'][0]++; this.raceFlags['K']['count']++; }
      if ( goal_flags.indexOf('C') > -1 && goal_flags.indexOf('C2') === -1 && goal_flags.indexOf('C3') === -1 ) { this.raceFlags['C'][1]++; this.raceFlags['C']['count']++; }
      if ( goal_flags.indexOf('C2') > -1 ) { this.raceFlags['C'][2]++; this.raceFlags['C']['count']++; }
      if ( goal_flags.indexOf('C3') > -1 ) { this.raceFlags['C'][3]++; this.raceFlags['C']['count']++; }
      if ( goal_flags.indexOf('C') === -1 ) { this.raceFlags['C'][0]++; this.raceFlags['C']['count']++; }
      if ( goal_flags.indexOf('P') > -1 && goal_flags.indexOf('P2') === -1 ) { this.raceFlags['P'][1]++; this.raceFlags['P']['count']++; }
      if ( goal_flags.indexOf('P2') > -1 ) { this.raceFlags['P'][2]++; this.raceFlags['P']['count']++; }
      if ( goal_flags.indexOf('P') === -1 ) { this.raceFlags['P'][0]++; this.raceFlags['P']['count']++; }
      if ( goal_flags.indexOf('T') > -1 && goal_flags.indexOf('T2') === -1 && goal_flags.indexOf('T3') === -1 && goal_flags.indexOf('T4') === -1 && goal_flags.indexOf('T5') === -1 ) { this.raceFlags['T'][1]++; this.raceFlags['T']['count']++; }
      if ( goal_flags.indexOf('T2') > -1 ) { this.raceFlags['T'][2]++; this.raceFlags['T']['count']++; }
      if ( goal_flags.indexOf('T3') > -1 ) { this.raceFlags['T'][3]++; this.raceFlags['T']['count']++; }
      if ( goal_flags.indexOf('T4') > -1 ) { this.raceFlags['T'][4]++; this.raceFlags['T']['count']++; }
      if ( goal_flags.indexOf('T5') > -1 ) { this.raceFlags['T'][5]++; this.raceFlags['T']['count']++; }
      if ( goal_flags.indexOf('S') > -1 && goal_flags.indexOf('S2') === -1 && goal_flags.indexOf('S3') === -1 && goal_flags.indexOf('S4') === -1 && goal_flags.indexOf('S5') === -1 ) { this.raceFlags['S'][1]++; this.raceFlags['S']['count']++; }
      if ( goal_flags.indexOf('S2') > -1 ) { this.raceFlags['S'][2]++; this.raceFlags['S']['count']++; }
      if ( goal_flags.indexOf('S3') > -1 ) { this.raceFlags['S'][3]++; this.raceFlags['S']['count']++; }
      if ( goal_flags.indexOf('S4') > -1 ) { this.raceFlags['S'][4]++; this.raceFlags['S']['count']++; }
      if ( goal_flags.indexOf('S5') > -1 ) { this.raceFlags['S'][5]++; this.raceFlags['S']['count']++; }
      if ( goal_flags.indexOf('B') > -1 && goal_flags.indexOf('B2') === -1 ) { this.raceFlags['B'][1]++; this.raceFlags['B']['count']++; }
      if ( goal_flags.indexOf('B2') > -1 ) { this.raceFlags['B'][2]++; this.raceFlags['B']['count']++; }
      if ( goal_flags.indexOf('B') === -1 ) { this.raceFlags['B'][0]++; this.raceFlags['B']['count']++; }
      if ( goal_flags.indexOf('F') > -1 && goal_flags.indexOf('F2') === -1 ) { this.raceFlags['F'][1]++; this.raceFlags['F']['count']++; }
      if ( goal_flags.indexOf('F2') > -1 ) { this.raceFlags['F'][2]++; this.raceFlags['F']['count']++; }
      if ( goal_flags.indexOf('F') === -1 ) { this.raceFlags['F'][0]++; this.raceFlags['F']['count']++; }
      if ( goal_flags.indexOf('N') > -1 && goal_flags.indexOf('N2') === -1 ) { this.raceFlags['N'][1]++; this.raceFlags['N']['count']++; }
      if ( goal_flags.indexOf('N2') > -1 ) { this.raceFlags['N'][2]++; this.raceFlags['N']['count']++; }
      if ( goal_flags.indexOf('N') === -1 ) { this.raceFlags['N'][0]++; this.raceFlags['N']['count']++; }
      if ( goal_flags.indexOf('E') > -1 && goal_flags.indexOf('E2') === -1 && goal_flags.indexOf('E3') === -1 && goal_flags.indexOf('E4') === -1 ) { this.raceFlags['E'][1]++; this.raceFlags['E']['count']++; }
      if ( goal_flags.indexOf('E2') > -1 ) { this.raceFlags['E'][2]++; this.raceFlags['E']['count']++; }
      if ( goal_flags.indexOf('E3') > -1 ) { this.raceFlags['E'][3]++; this.raceFlags['E']['count']++; }
      if ( goal_flags.indexOf('E4') > -1 ) { this.raceFlags['E'][4]++; this.raceFlags['E']['count']++; }
      if ( goal_flags.indexOf('E') === -1 ) { this.raceFlags['E'][0]++; this.raceFlags['E']['count']++; }
      if ( goal_flags.indexOf('$') > -1 && goal_flags.indexOf('$2') === -1 && goal_flags.indexOf('$3') === -1 ) { this.raceFlags['$'][1]++; this.raceFlags['$']['count']++; }
      if ( goal_flags.indexOf('$2') > -1 ) { this.raceFlags['$'][2]++; this.raceFlags['$']['count']++; }
      if ( goal_flags.indexOf('$3') > -1 ) { this.raceFlags['$'][3]++; this.raceFlags['$']['count']++; }
      if ( goal_flags.indexOf('$') === -1 ) { this.raceFlags['$'][0]++; this.raceFlags['$']['count']++; }
      if ( goal_flags.indexOf('X') > -1 && goal_flags.indexOf('X2') === -1 ) { this.raceFlags['X'][1]++; this.raceFlags['X']['count']++; }
      if ( goal_flags.indexOf('X2') > -1 ) { this.raceFlags['X'][2]++; this.raceFlags['X']['count']++; }
      if ( goal_flags.indexOf('X') === -1 ) { this.raceFlags['X'][0]++; this.raceFlags['X']['count']++; }
      if ( goal_flags.indexOf('Y') > -1 && goal_flags.indexOf('Y2') === -1 ) { this.raceFlags['Y'][1]++; this.raceFlags['Y']['count']++; }
      if ( goal_flags.indexOf('Y2') > -1 ) { this.raceFlags['Y'][2]++; this.raceFlags['Y']['count']++; }
      if ( goal_flags.indexOf('Y') === -1 ) { this.raceFlags['Y'][0]++; this.raceFlags['Y']['count']++; }
      if ( goal_flags.indexOf('G') > -1 && goal_flags.indexOf('G2') === -1 ) { this.raceFlags['G'][1]++; this.raceFlags['G']['count']++; }
      if ( goal_flags.indexOf('G') === -1 ) { this.raceFlags['G'][0]++; this.raceFlags['G']['count']++; }
      if ( goal_flags.indexOf('W') > -1 && goal_flags.indexOf('W2') === -1 ) { this.raceFlags['W'][1]++; this.raceFlags['W']['count']++; }
      if ( goal_flags.indexOf('W2') > -1 ) { this.raceFlags['W'][2]++; this.raceFlags['W']['count']++; }
      if ( goal_flags.indexOf('W') === -1 ) { this.raceFlags['W'][0]++; this.raceFlags['W']['count']++; }
      if ( goal_flags.indexOf('Z') > -1 && goal_flags.indexOf('Z2') === -1 ) { this.raceFlags['Z'][1]++; this.raceFlags['Z']['count']++; }
      if ( goal_flags.indexOf('Z') === -1 ) { this.raceFlags['Z'][0]++; this.raceFlags['Z']['count']++; }    
    }
  }

}
