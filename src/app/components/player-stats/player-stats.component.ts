import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TimeService } from '../../services/time.service';
import { RaceService } from '../../services/race.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fes-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})
export class PlayerStatsComponent implements OnInit, OnDestroy {

  public defaultName = 'Fleury14';
  public playerName: string;
  public playerStats;
  public playerHistory;
  public past7Days:number;
  public past14Days:number;
  public past30Days:number;
  public opponentWinLoss: any[] = [];
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

  constructor(private _playerSvc: PlayerService, private _actRoute: ActivatedRoute, public time: TimeService, private _race: RaceService) { }

  ngOnInit() {

    // get playername from params
    this._actRoute.paramMap.subscribe(route => {
      this.playerName = route.get('player');
      // then grab stats for player
      if (this.playerName) {
        this._getStats(this.playerName);
        this._getHistory(this.playerName);
      }
    });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    })
  }

  private _getStats(player: string) {
    this.subs.push(this._playerSvc.getPlayerBaseStats(player).subscribe(resp => {
      this.playerStats = resp;
      console.log('stats', this.playerStats);
    }));
  }

  private _getHistory(player: string) {
    this.subs.push(this._playerSvc.getRaceHistory(player).subscribe(resp => {
      this.playerHistory = resp;
      console.log('history', this.playerHistory);
      this._parseHistory(this.playerHistory);
    }));
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
      race.results.forEach(result => {
        if ((result.player.toLowerCase() !== this.playerName.toLowerCase()) && (result.time !== -1 && myTime !== null ))  {
          // check if opponent exists
          if (this.opponentWinLoss.filter(record => {
            return record.name.toLowerCase() == result.player.toLowerCase();
          }).length === 0) {
            this.opponentWinLoss.push({
              name: result.player,
              wins: 0,
              losses: 0
            });
          }
          // increment approprate category
          if ((result.time > myTime || result.time === -1) && myTime !== null) {
						this.opponentWinLoss.forEach(opponent => {
              if(opponent.name.toLowerCase() == result.player.toLowerCase()) opponent.wins++;
            })
					} else {
						this.opponentWinLoss.forEach(opponent => {
              if(opponent.name.toLowerCase() == result.player.toLowerCase()) opponent.losses++;
            })
					}
        }
      });
      if (race.goal.includes('J2KC2T4S3BF2NE3$X2Y2GWZ')) this.racetypes.leagueQual.push(race);
      if (race.goal.includes('JK2PCT3S2BF2NE3X2Y2GZ')) this.racetypes.leagueRo32.push(race);
      if (race.goal.includes('JK2PC3T3S2BF2NE3X2Y2GZ')) this.racetypes.leagueRo16.push(race);
    });
    this.opponentWinLoss.sort(this.compareTotalGamesPlayed);
    console.log('ro16', this.racetypes.leagueRo16);
    this.racetypes.best.leagueQual = this.findBestTime(this.racetypes.leagueQual);
    this.racetypes.best.leagueRo32 = this.findBestTime(this.racetypes.leagueRo32);
    this.racetypes.best.leagueRo16 = this.findBestTime(this.racetypes.leagueRo16);
    this.racetypes.avg.leagueQual = this.getLast10Avg(this.racetypes.leagueQual);
    this.racetypes.avg.leagueRo32 = this.getLast10Avg(this.racetypes.leagueRo32);
    this.racetypes.avg.leagueRo16 = this.getLast10Avg(this.racetypes.leagueRo16);
    console.log('best qual', this.racetypes.best.leagueQual);
    // console.log(this.opponentWinLoss);

    

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
    console.log('race with best time', races[0].results.filter(result => result.player.toLowerCase() === this.playerName.toLowerCase())[0].time);
    return races[0].results.filter(result => result.player.toLowerCase() === this.playerName.toLowerCase())[0]['time'];
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

}
