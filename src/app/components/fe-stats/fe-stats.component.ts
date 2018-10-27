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
    community: [],
    zScoreHigh: {
      lastWeek: [],
      lastMonth: [],
      allTime: []
    }
  };
  public zScoreLeaders = {
    lastWeek: [],
    lastMonth: [],
    allTime: [],
  }
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
        if (race.goal.indexOf('HTTZZ') !== -1 || race.goal.indexOf('League Match') !== -1 || (race.goal.indexOf('League') !== -1 && race.goal.indexOf('BYOB') === -1)) {
          if (race.date < 1532482670 ) this.racetypes.qual.push(race) // aacount for HTTZZ quals
          else if (race.date < 1536708121 ) this.racetypes.ro32.push(race) // and ro.32 and play in
          else this.racetypes.ro16.push(race);

        };
        this._race.addZScore(race);
        this._parseRaceFlags(race);
        // to change the number of entrants needed to qualify for z-score board, change the below number
        if (race.numentrants >= 10) {
          if((Date.now() - race.date * 1000) / 1000 < 604800) this.racetypes.zScoreHigh.lastWeek.push(race);
          if((Date.now() - race.date * 1000) / 1000 < 2592000) this.racetypes.zScoreHigh.lastMonth.push(race);
          this.racetypes.zScoreHigh.allTime.push(race);
        }
        
      });
      this._parseZScoreLeaderboard('lastWeek');
      this._parseZScoreLeaderboard('lastMonth');
      this._parseZScoreLeaderboard('allTime');
      this.racetypes.qual.sort(this.winningTimeCmp);
      this.racetypes.ro32.sort(this.winningTimeCmp);
      this.racetypes.ro16.sort(this.winningTimeCmp);
      // console.log('flags:', this.raceFlags);

    });
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
    if (flags_pos != -1 ) {
        goal_flags = race.goal.slice( flags_pos + 7, seed_pos);
    }
  
    if (goal_flags) { 
      if ( goal_flags.indexOf('J') > -1 && goal_flags.indexOf('J2') === -1 ) { this.raceFlags.flags['J']['1']++; this.raceFlags.flags['J']['count']++; }
      if ( goal_flags.indexOf('J2') > -1 ) { this.raceFlags.flags['J']['2']++; this.raceFlags.flags['J']['count']++; }
      if ( goal_flags.indexOf('J') === -1 ) { this.raceFlags.flags['J']['0']++; this.raceFlags.flags['J']['count']++; }
      if ( goal_flags.indexOf('K') > -1 && goal_flags.indexOf('K2') === -1 && goal_flags.indexOf('K3') === -1 && goal_flags.indexOf('K4') === -1 ) { this.raceFlags.flags['K'][1]++; this.raceFlags.flags['K']['count']++; }
      if ( goal_flags.indexOf('K2') > -1 ) { this.raceFlags.flags['K'][2]++; this.raceFlags.flags['K']['count']++; }
      if ( goal_flags.indexOf('K3') > -1 ) { this.raceFlags.flags['K'][3]++; this.raceFlags.flags['K']['count']++; }
      if ( goal_flags.indexOf('K4') > -1 ) { this.raceFlags.flags['K'][4]++; this.raceFlags.flags['K']['count']++; }
      if ( goal_flags.indexOf('K') === -1 ) { this.raceFlags.flags['K'][0]++; this.raceFlags.flags['K']['count']++; }
      if ( goal_flags.indexOf('C') > -1 && goal_flags.indexOf('C2') === -1 && goal_flags.indexOf('C3') === -1 ) { this.raceFlags.flags['C'][1]++; this.raceFlags.flags['C']['count']++; }
      if ( goal_flags.indexOf('C2') > -1 ) { this.raceFlags.flags['C'][2]++; this.raceFlags.flags['C']['count']++; }
      if ( goal_flags.indexOf('C3') > -1 ) { this.raceFlags.flags['C'][3]++; this.raceFlags.flags['C']['count']++; }
      if ( goal_flags.indexOf('C') === -1 ) { this.raceFlags.flags['C'][0]++; this.raceFlags.flags['C']['count']++; }
      if ( goal_flags.indexOf('P') > -1 && goal_flags.indexOf('P2') === -1 ) { this.raceFlags.flags['P'][1]++; this.raceFlags.flags['P']['count']++; }
      if ( goal_flags.indexOf('P2') > -1 ) { this.raceFlags.flags['P'][2]++; this.raceFlags.flags['P']['count']++; }
      if ( goal_flags.indexOf('P') === -1 ) { this.raceFlags.flags['P'][0]++; this.raceFlags.flags['P']['count']++; }
      if ( goal_flags.indexOf('T') > -1 && goal_flags.indexOf('T2') === -1 && goal_flags.indexOf('T3') === -1 && goal_flags.indexOf('T4') === -1 && goal_flags.indexOf('T5') === -1 ) { this.raceFlags.flags['T'][1]++; this.raceFlags.flags['T']['count']++; }
      if ( goal_flags.indexOf('T2') > -1 ) { this.raceFlags.flags['T'][2]++; this.raceFlags.flags['T']['count']++; }
      if ( goal_flags.indexOf('T3') > -1 ) { this.raceFlags.flags['T'][3]++; this.raceFlags.flags['T']['count']++; }
      if ( goal_flags.indexOf('T4') > -1 ) { this.raceFlags.flags['T'][4]++; this.raceFlags.flags['T']['count']++; }
      if ( goal_flags.indexOf('T5') > -1 ) { this.raceFlags.flags['T'][5]++; this.raceFlags.flags['T']['count']++; }
      if ( goal_flags.indexOf('S') > -1 && goal_flags.indexOf('S2') === -1 && goal_flags.indexOf('S3') === -1 && goal_flags.indexOf('S4') === -1 && goal_flags.indexOf('S5') === -1 ) { this.raceFlags.flags['S'][1]++; this.raceFlags.flags['S']['count']++; }
      if ( goal_flags.indexOf('S2') > -1 ) { this.raceFlags.flags['S'][2]++; this.raceFlags.flags['S']['count']++; }
      if ( goal_flags.indexOf('S3') > -1 ) { this.raceFlags.flags['S'][3]++; this.raceFlags.flags['S']['count']++; }
      if ( goal_flags.indexOf('S4') > -1 ) { this.raceFlags.flags['S'][4]++; this.raceFlags.flags['S']['count']++; }
      if ( goal_flags.indexOf('S5') > -1 ) { this.raceFlags.flags['S'][5]++; this.raceFlags.flags['S']['count']++; }
      if ( goal_flags.indexOf('B') > -1 && goal_flags.indexOf('B2') === -1 ) { this.raceFlags.flags['B'][1]++; this.raceFlags.flags['B']['count']++; }
      if ( goal_flags.indexOf('B2') > -1 ) { this.raceFlags.flags['B'][2]++; this.raceFlags.flags['B']['count']++; }
      if ( goal_flags.indexOf('B') === -1 ) { this.raceFlags.flags['B'][0]++; this.raceFlags.flags['B']['count']++; }
      if ( goal_flags.indexOf('F') > -1 && goal_flags.indexOf('F2') === -1 ) { this.raceFlags.flags['F'][1]++; this.raceFlags.flags['F']['count']++; }
      if ( goal_flags.indexOf('F2') > -1 ) { this.raceFlags.flags['F'][2]++; this.raceFlags.flags['F']['count']++; }
      if ( goal_flags.indexOf('F') === -1 ) { this.raceFlags.flags['F'][0]++; this.raceFlags.flags['F']['count']++; }
      if ( goal_flags.indexOf('N') > -1 && goal_flags.indexOf('N2') === -1 ) { this.raceFlags.flags['N'][1]++; this.raceFlags.flags['N']['count']++; }
      if ( goal_flags.indexOf('N2') > -1 ) { this.raceFlags.flags['N'][2]++; this.raceFlags.flags['N']['count']++; }
      if ( goal_flags.indexOf('N') === -1 ) { this.raceFlags.flags['N'][0]++; this.raceFlags.flags['N']['count']++; }
      if ( goal_flags.indexOf('E') > -1 && goal_flags.indexOf('E2') === -1 && goal_flags.indexOf('E3') === -1 && goal_flags.indexOf('E4') === -1 ) { this.raceFlags.flags['E'][1]++; this.raceFlags.flags['E']['count']++; }
      if ( goal_flags.indexOf('E2') > -1 ) { this.raceFlags.flags['E'][2]++; this.raceFlags.flags['E']['count']++; }
      if ( goal_flags.indexOf('E3') > -1 ) { this.raceFlags.flags['E'][3]++; this.raceFlags.flags['E']['count']++; }
      if ( goal_flags.indexOf('E4') > -1 ) { this.raceFlags.flags['E'][4]++; this.raceFlags.flags['E']['count']++; }
      if ( goal_flags.indexOf('E') === -1 ) { this.raceFlags.flags['E'][0]++; this.raceFlags.flags['E']['count']++; }
      if ( goal_flags.indexOf('$') > -1 && goal_flags.indexOf('$2') === -1 && goal_flags.indexOf('$3') === -1 ) { this.raceFlags.flags['$'][1]++; this.raceFlags.flags['$']['count']++; }
      if ( goal_flags.indexOf('$2') > -1 ) { this.raceFlags.flags['$'][2]++; this.raceFlags.flags['$']['count']++; }
      if ( goal_flags.indexOf('$3') > -1 ) { this.raceFlags.flags['$'][3]++; this.raceFlags.flags['$']['count']++; }
      if ( goal_flags.indexOf('$') === -1 ) { this.raceFlags.flags['$'][0]++; this.raceFlags.flags['$']['count']++; }
      if ( goal_flags.indexOf('X') > -1 && goal_flags.indexOf('X2') === -1 ) { this.raceFlags.flags['X'][1]++; this.raceFlags.flags['X']['count']++; }
      if ( goal_flags.indexOf('X2') > -1 ) { this.raceFlags.flags['X'][2]++; this.raceFlags.flags['X']['count']++; }
      if ( goal_flags.indexOf('X') === -1 ) { this.raceFlags.flags['X'][0]++; this.raceFlags.flags['X']['count']++; }
      if ( goal_flags.indexOf('Y') > -1 && goal_flags.indexOf('Y2') === -1 ) { this.raceFlags.flags['Y'][1]++; this.raceFlags.flags['Y']['count']++; }
      if ( goal_flags.indexOf('Y2') > -1 ) { this.raceFlags.flags['Y'][2]++; this.raceFlags.flags['Y']['count']++; }
      if ( goal_flags.indexOf('Y') === -1 ) { this.raceFlags.flags['Y'][0]++; this.raceFlags.flags['Y']['count']++; }
      if ( goal_flags.indexOf('G') > -1 && goal_flags.indexOf('G2') === -1 ) { this.raceFlags.flags['G'][1]++; this.raceFlags.flags['G']['count']++; }
      if ( goal_flags.indexOf('G') === -1 ) { this.raceFlags.flags['G'][0]++; this.raceFlags.flags['G']['count']++; }
      if ( goal_flags.indexOf('W') > -1 && goal_flags.indexOf('W2') === -1 ) { this.raceFlags.flags['W'][1]++; this.raceFlags.flags['W']['count']++; }
      if ( goal_flags.indexOf('W2') > -1 ) { this.raceFlags.flags['W'][2]++; this.raceFlags.flags['W']['count']++; }
      if ( goal_flags.indexOf('W') === -1 ) { this.raceFlags.flags['W'][0]++; this.raceFlags.flags['W']['count']++; }
      if ( goal_flags.indexOf('Z') > -1 && goal_flags.indexOf('Z2') === -1 ) { this.raceFlags.flags['Z'][1]++; this.raceFlags.flags['Z']['count']++; }
      if ( goal_flags.indexOf('Z') === -1 ) { this.raceFlags.flags['Z'][0]++; this.raceFlags.flags['Z']['count']++; }    
    }
  }

  private _parseZScoreLeaderboard(field) {
    this.racetypes.zScoreHigh[field].forEach(race => {
      race.results.forEach(result => {
        if (this.zScoreLeaders[field].length < 25) {
          this.zScoreLeaders[field].push({ name: result.player, zScore: result.zScore, date: race.date });
          this._sortZScoreArray(this.zScoreLeaders[field]);
        } else {
          if(this.zScoreLeaders[field][this.zScoreLeaders.lastWeek.length - 1].zScore > result.zScore) {
            this.zScoreLeaders[field].pop();
            this.zScoreLeaders[field].push({ name: result.player, zScore: result.zScore, date: race.date });
            this._sortZScoreArray(this.zScoreLeaders[field]);
          }
        }
      })
    });
    console.log('zscore', field, this.zScoreLeaders[field]);
  }

  private _sortZScoreArray(arr) {
    arr.sort( (a, b) => a.zScore - b.zScore);
  }

}
