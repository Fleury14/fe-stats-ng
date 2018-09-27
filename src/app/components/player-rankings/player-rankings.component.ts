import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'fes-player-rankings',
  templateUrl: './player-rankings.component.html',
  styleUrls: ['./player-rankings.component.scss']
})
export class PlayerRankingsComponent implements OnInit {

  public leaderboard;
  public categories = {
    champion: [],
    lunarian: [],
    grandMaster: [],
    master: [],
    gold: [],
    silver: [],
    bronze: []
  }

  public rankIndexes = {
    champion: 1,
    lunarian: 0,
    grandMaster: 0,
    master: 0,
    gold: 0,
    silver: 0,
    bronze: 0
  }

  constructor(private _player:PlayerService) { }

  ngOnInit() {
    this._player.getLeaderBoard().subscribe(resp => {
      this.leaderboard = resp;
      this._parseLeaderboard(this.leaderboard);
    })
  }

  private _parseLeaderboard(leaderboard) {
    const total = leaderboard.leadersCount;
    this.rankIndexes.bronze = total;
    this.rankIndexes.silver = total - ( Math.floor(total * .45) ) - 1;
    this.rankIndexes.gold = total - ( Math.floor(total * .72) ) - 1;
    this.rankIndexes.master = total - ( Math.floor(total * .875) ) - 1;
    this.rankIndexes.grandMaster = total - ( Math.floor(total * .935) ) - 1;
    this.rankIndexes.lunarian = total - ( Math.floor(total * .97) ) - 1;

    this.leaderboard.leaders.sort( (a, b) => {
      return a.rank - b.rank;
    })

    this.categories.champion.push(this.leaderboard.leaders[0]);
    for (let i = 1; i < this.rankIndexes.lunarian; i++) {
      this.categories.lunarian.push(this.leaderboard.leaders[i]);
    }
    for (let i = this.rankIndexes.lunarian; i < this.rankIndexes.grandMaster; i++) {
      this.categories.grandMaster.push(this.leaderboard.leaders[i]);
    }
    for (let i = this.rankIndexes.grandMaster; i < this.rankIndexes.master; i++) {
      this.categories.master.push(this.leaderboard.leaders[i]);
    }
    for (let i = this.rankIndexes.master; i < this.rankIndexes.gold; i++) {
      this.categories.gold.push(this.leaderboard.leaders[i]);
    }
    for (let i = this.rankIndexes.gold; i < this.rankIndexes.silver; i++) {
      this.categories.silver.push(this.leaderboard.leaders[i]);
    }
    for (let i = this.rankIndexes.silver; i < this.rankIndexes.bronze; i++) {
      this.categories.bronze.push(this.leaderboard.leaders[i]);
    }

     // create index tiers
    //  $bronze_place_end = $total_players;
    //  $bronze_place_start = $total_players - ( floor($total_players * .45) ); // bronze = bottom 45%
    //  $silver_place_end = $bronze_place_start - 1;
    //  $silver_place_start = $total_players - ( floor($total_players * .72) ); // silver = from 45% -> 72%
    //  $gold_place_end = $silver_place_start - 1;
    //  $gold_place_start = $total_players - ( floor($total_players * .875) ); // gold = 72% -> 87.5;
    //  $master_place_end = $gold_place_start - 1;
    //  $master_place_start = $total_players - ( floor($total_players * .935) ); // master = 87.5% -> 93.5%;
    //  $gm_place_end = $master_place_start - 1;
    //  $gm_place_start = $total_players - ( floor($total_players * .97) ); // GM = 93.5% -> 97%;
    //  $lunarian_place_start = 2;
    //  $lunarian_place_end = $gm_place_start - 1;
  }

}
