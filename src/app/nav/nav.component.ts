import { Component, OnInit } from '@angular/core';
import { NavItems } from '../classes/nav-items';
import { INavItem } from '../interfaces/nav-item';

@Component({
  selector: 'fes-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  private navItems:NavItems = new NavItems();
  public navList:INavItem[];

  constructor() { }

  ngOnInit() {
    this.navList = this.navItems.getItems();
  }

}
