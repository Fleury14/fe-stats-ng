import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TimeService } from '../../services/time.service';
import { RaceService } from '../../services/race.service';
import { Subscription } from 'rxjs';
import * as shape from 'd3-shape';

@Component({
  selector: 'fes-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})
export class PlayerStatsComponent implements OnInit, OnDestroy {

  public defaultName = 'Fleury14';
  public _NUMOFRECENTS = 20;
  public currentRecent = 0;
  public recents = [];
  public playerName: string;
  public playerStats;
  public playerHistory;
  public past7Days:number;
  public past14Days:number;
  public past30Days:number;
  public opponentWinLoss: any[] = [];
  public opponentView = 'allTime';
  public racetypes = {
    leagueQual: [],
    leagueRo32: [],
    leagueRo16: [],
    best: {
      leagueQual: null,
      leagueRo32: null,
      leagueRo16: null
    },
    avg: {
      leagueQual: null,
      leagueRo32: null,
      leagueRo16: null
    }
  };
  public subs:Subscription[] = [];

  // line chart things
  public lineData;
  public viewLine: any[] = [700, '100%'];

  // line chart options
  public showXAxisLine = true;
  public showYAxisLine = true;
  public gradientLine = false;
  public showLegendLine = true;
  public showXAxisLabelLine = true;
  public xAxisLabelLine = 'Date of Race';
  public showYAxisLabelLine = true;
  public yAxisLabelLine = 'SRL Points';
  public curveLine = shape.curveMonotoneX;
  public activeEntriesLine = [];

  public colorSchemeLine = {
    domain: ['#010059']
  };

  // bar chart options
  // options
  public barData;
  showXAxisBar = true;
  showYAxisBar = true;
  gradientBar = true;
  showLegendBar= false;
  showXAxisLabelBar = true;
  xAxisLabelBar = 'Date of Rave';
  showYAxisLabelBar = true;
  yAxisLabelBar = 'Z-Score';

  colorSchemeBar = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  public autoScaleLine = true;

  constructor(private _playerSvc: PlayerService, private _actRoute: ActivatedRoute, public time: TimeService, private _race: RaceService) { }

  ngOnInit() {

    // get playername from params
    this._actRoute.paramMap.subscribe(route => {
      this.playerName = route.get('player');
      if (!this.playerName) {
        if (localStorage.getItem('default')) this.playerName = localStorage.getItem('default');
      }
      // then grab stats for player
      if (this.playerName) {
        this._getStats(this.playerName);
        this._getHistory(this.playerName);
        this._getRecents(this.playerName);
      }
    });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    })
  }

  public setDefault() {
    localStorage.setItem('default', this.playerName);
  }

  public clearDefault() {
    localStorage.removeItem('default');
  }

  public getDefault() {
    return localStorage.getItem('default');
  }

  private _getRecents(player: string) {
    this.subs.push(this._playerSvc.getRecents(this.playerName, this._NUMOFRECENTS).subscribe(resp => {
      const races: any[] = resp['pastraces'];
      races.sort((a, b) => b.date - a.date);
      races.forEach(race => {
        this._addZScore(race);
        race.results.sort((a, b) => b.oldtrueskill - a.oldtrueskill);
        race.results.forEach( (result, index) => result['expectedFinish'] = index + 1 );
        race.results.sort((a, b) => a.place - b.place);
      });
      this.recents = races;
      // console.log('recents:', this.recents);
      this.prepareLineData(this.playerName);
      // console.log('linedata:', this.lineData);
      // console.log('barData', this.barData);
    }));
  }

  private _getStats(player: string) {
    this.subs.push(this._playerSvc.getPlayerBaseStats(player).subscribe(resp => {
      this.playerStats = resp;
      // console.log('stats', this.playerStats);
    }));
  }

  private _getHistory(player: string) {
    this.subs.push(this._playerSvc.getRaceHistory(player).subscribe(resp => {
      this.playerHistory = resp;
      // console.log('history', this.playerHistory);
      this._parseHistory(this.playerHistory);
    }));
  }

  public switchRecent(target: number) {
    // console.log(target);
    this.currentRecent = target;
  }

  // begin recent parsing functions
  private _getLongestTime(race) {
    let longestTime = 0;
    race.results.forEach(result => {
        if (result.time > longestTime) longestTime = result.time;
    });
    return longestTime;
  }

  private _addZScore(race) {
    // This function takes in a race and assigns a standard mean, standard deviation for the race and a z-score for each individual playeer

    const raceTimes = [];
    const raceLongTime = this._getLongestTime(race);
    const forfeitPenalty = 60 * 5;
    // put all times into one array
    race.results.forEach(result => {
        if (result.time === -1) {
            raceTimes.unshift(raceLongTime + forfeitPenalty);
        } else {
            raceTimes.unshift(result.time);
        }
    });
    
    // calculate mean
    let standaredMean = raceTimes.reduce((a, b) => a + b, 0) / raceTimes.length;
    race['stdMean'] = standaredMean;

    const sqrdDiff = [];
    // populate array of squared differences
    raceTimes.forEach(time => {
        if (time === -1) time = raceLongTime + forfeitPenalty;
        sqrdDiff.unshift(Math.pow(time - standaredMean, 2));
    });
    
    // get the mean of squred differences
    let sqrdMean = sqrdDiff.reduce((a, b) => a + b, 0) / sqrdDiff.length;
    // and from that get std dev and assign it to race
    let stdDev = Math.sqrt(sqrdMean);
    race['stdDev'] = stdDev;

    // assign each calculated z-score to the respective result
    race.results.forEach(result => {
        result['zScore'] = ((result.time === -1 ? raceLongTime + forfeitPenalty : result.time) - race.stdMean) / race.stdDev;
    })
    
  }

  public getRating(player:string) {
    return this._playerSvc.getRating(player);
  }

  public roundTo1Place(percent) {
    return Math.floor(percent * 1000) / 10;
  }

  private compareTotalGamesPlayed(a, b) {
    return (b.wins + b.losses) - (a.wins + a.losses);
  }

  private _parseHistory(history) {
    this.past7Days = this.past14Days = this.past30Days = 0;
    this.opponentWinLoss = [];
    history.pastraces.forEach(race => {
      if((Date.now() - race.date * 1000) / 1000 < 604800) this.past7Days++;
      if((Date.now() - race.date * 1000) / 1000 < 1209600) this.past14Days++;
      if((Date.now() - race.date * 1000) / 1000 < 2592000) this.past30Days++;
      const myTime = this._race.findMyTime(race, this.playerName);
      race.results.forEach((result, index) => {
        if ((result.player.toLowerCase() !== this.playerName.toLowerCase()) && (result.time !== -1 && myTime !== null ))  {
          // check if opponent exists
          if (this.opponentWinLoss.filter(record => {
            return record.name.toLowerCase() == result.player.toLowerCase();
          }).length === 0) {
            this.opponentWinLoss.push({
              name: result.player,
              wins: 0,
              losses: 0,
              last30Days: {
                wins: 0,
                losses: 0,
              }
            });
          }
          // increment approprate category
          if ((result.time > myTime || result.time === -1) && myTime !== null) {
						this.opponentWinLoss.forEach(opponent => {
              if(opponent.name.toLowerCase() == result.player.toLowerCase()) {
                if(Date.now() - ( parseInt(race.date) * 1000 ) < (1000 * 60 * 60 * 24 * 30)) opponent.last30Days.wins++;
                opponent.wins++;
              }
            })
					} else {
						this.opponentWinLoss.forEach(opponent => {
              if(opponent.name.toLowerCase() == result.player.toLowerCase()) {
                if(Date.now() - ( parseInt(race.date) * 1000 ) < (1000 * 60 * 60 * 24 * 30)) opponent.last30Days.losses++;
                opponent.losses++;
              }
            })
					}
        }
      });
      if (race.goal.includes('J2KC2T4S3BF2NE3$X2Y2GWZ')) this.racetypes.leagueQual.push(race);
      if (race.goal.includes('JK2PCT3S2BF2NE3X2Y2GZ')) this.racetypes.leagueRo32.push(race);
      if (race.goal.includes('JK2PC3T3S2BF2NE3X2Y2GZ')) this.racetypes.leagueRo16.push(race);
    });
    this.opponentWinLoss.sort(this.compareTotalGamesPlayed);
    this.racetypes.best.leagueQual = this.findBestTime(this.racetypes.leagueQual);
    this.racetypes.best.leagueRo32 = this.findBestTime(this.racetypes.leagueRo32);
    this.racetypes.best.leagueRo16 = this.findBestTime(this.racetypes.leagueRo16);
    this.racetypes.avg.leagueQual = this.getLast10Avg(this.racetypes.leagueQual);
    this.racetypes.avg.leagueRo32 = this.getLast10Avg(this.racetypes.leagueRo32);
    this.racetypes.avg.leagueRo16 = this.getLast10Avg(this.racetypes.leagueRo16);
    // console.log(this.opponentWinLoss);

  }

  public changeOpponentView(view: string) {
    this.opponentView = view;
  }

  public findBestTime(races: any[]) {
    races.sort((a, b) => {
      let myTimeA = 999999;
      let myTimeB = 999999;
      a.results.forEach(result => {
        if (result.player.toLowerCase() === this.playerName.toLowerCase() && result.time !== -1) myTimeA = result.time; 
      });
      b.results.forEach(result => {
        if (result.player.toLowerCase() === this.playerName.toLowerCase() && result.time !== -1) myTimeB = result.time; 
      });
      return myTimeA - myTimeB;
    });
    if (!races[0] || !races[0].results) return 0
    else return races[0].results.filter(result => result.player.toLowerCase() === this.playerName.toLowerCase())[0]['time'];
  }

  public getLast10Avg(races: any[]) {
    const NUMOFGAMESFORRECENT = 10
    // sort races by date
    races.sort((a, b) => {
      return parseInt(a.date) - parseInt(b.date);
    });
    const recent = [];
    for (let i = 0; i < NUMOFGAMESFORRECENT; i++) {
      if (i < races.length) {
        recent.push(races[i]);
      }
    }
    let timetotal = 0;
    let count = 0;
    recent.forEach(race => {
      const myTime = this._race.findMyTime(race, this.playerName);
      if (myTime) {
        timetotal += myTime;
        count++;
        // don't count forfeits
      }
    });
    return Math.floor(timetotal / count);

  }

  private prepareLineData(player: string) {
    this.lineData = [{
      name: "SRL Points",
      series: []
    }];
    this.barData = [];
    
    this.recents.forEach((race, index) => {
      let myVal = 0;
      let myLabel = '';
      race.results.forEach(result => {
        if (result.player.toLowerCase() === player.toLowerCase()) {
          myVal = result.newtrueskill;
          const d = new Date(0);
          d.setUTCSeconds(race.date);
          let dateString = `${d.getMonth() + 1}/${d.getDate()}`;
          if (race.goal.indexOf('J2KC2T4S3BF2NE3$X2Y2GWZ') >= 0) dateString += ' (LQ)';
          if (race.goal.indexOf('JK2PCT3S2BF2NE3X2Y2GZ') >= 0) dateString += ' (Ro32)';
          if (race.goal.indexOf('JK2PC3T3S2BF2NE3X2Y2GZ') >= 0) dateString += ' (Ro16)';
          if (race.goal.indexOf('Community Race') >= 0) dateString += ' (Comm.)';
          if (race.goal.indexOf('HTTZ') >= 0) dateString += ' (LEAGUE)';
          dateString = `${index + 1}: ${dateString}`;
          myLabel = dateString;
          this.barData.unshift({name: myLabel, value: result.zScore});

        }
      });
      this.lineData[0].series.unshift({name: myLabel, value: myVal});
    })
  }

}
