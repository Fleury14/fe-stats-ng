import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TimeService } from '../../services/time.service';
import { RaceService } from '../../services/race.service';

@Component({
  selector: 'fes-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})
export class PlayerStatsComponent implements OnInit {

  public defaultName = 'Fleury14';
  public playerName: string;
  public playerStats;
  public playerHistory;
  public past7Days:number;
  public past14Days:number;
  public past30Days:number;
  public opponentWinLoss: any[] = [];

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

  private _getStats(player: string) {
    this._playerSvc.getPlayerBaseStats(player).subscribe(resp => {
      this.playerStats = resp;
      console.log('stats', this.playerStats);
    })
  }

  private _getHistory(player: string) {
    this._playerSvc.getRaceHistory(player).subscribe(resp => {
      this.playerHistory = resp;
      console.log('history', this.playerHistory);
      this._parseHistory(this.playerHistory);
    });
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
      // console.log(this.playerName);
      race.results.forEach(result => {
        if ((result.player.toLowerCase() !== this.playerName.toLowerCase()) && (result.time !== -1 && myTime !== null ))  {
          // check if opponent exists
          // console.log(this.opponentWinLoss.filter(record => {record.name.toLowerCase() == result.player.toLowerCase()}));
          if (this.opponentWinLoss.filter(record => {
            return record.name.toLowerCase() == result.player.toLowerCase();
          }).length === 0) {
            console.log('opponent doesnt exist');
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
    });
    this.opponentWinLoss.sort(this.compareTotalGamesPlayed);
    console.log(this.opponentWinLoss);

    

  }

}
