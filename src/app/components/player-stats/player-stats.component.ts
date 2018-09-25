import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TimeService } from '../../services/time.service';

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

  constructor(private _playerSvc: PlayerService, private _actRoute: ActivatedRoute, public time: TimeService) { }

  ngOnInit() {

    // get playername from params
    this._actRoute.paramMap.subscribe(route => {
      this.playerName = route.get('player');
      // then grab stats for player
      if (this.playerName) {
        this._getStats(this.playerName);
        this._getHistory(this.playerName);
        this._parseHistory(this.playerHistory);
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
    });
  }

  public roundTo1Place(percent) {
    return Math.floor(percent * 1000) / 10;
  }

  private _parseHistory(history) {
    this.past7Days = this.past14Days = this.past30Days = 0;
    history.pastRaces.forEach(race => {
      if(Date.now() - race.date < 604800) this.past7Days++;
      if(Date.now() - race.date < 1209600) this.past14Days++;
      if(Date.now() - race.date < 2592000) this.past30Days++;
    });

  }

}
