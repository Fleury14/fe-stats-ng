import { Component, OnInit } from '@angular/core';
import { NavItems } from '../classes/nav-items';
import { INavItem } from '../interfaces/nav-item';
import { Router } from '@angular/router';

@Component({
  selector: 'fes-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  private navItems:NavItems = new NavItems();
  public navList:INavItem[];
  public searchText:string;

  constructor(private _router: Router) { }

  ngOnInit() {
    this.navList = this.navItems.getItems();
  }

  public playerStats(e:any) {
    console.log(this.searchText);
    this._router.navigate(['player-stats', this.searchText]);
  }

}
