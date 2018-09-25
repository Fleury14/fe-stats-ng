import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Router } from '@angular/router';

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

  constructor(private _playerSvc: PlayerService, private _router: Router) { }

  ngOnInit() {

    // get playername from params
  }

}
