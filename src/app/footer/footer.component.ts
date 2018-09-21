import { Component, OnInit } from '@angular/core';
import { NavItems } from '../classes/nav-items';
import { INavItem } from '../interfaces/nav-item';

@Component({
  selector: 'fes-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  private navItems:NavItems = new NavItems();
  public navList:INavItem[];

  constructor() { }

  ngOnInit() {
    this.navList = this.navItems.getItems();
  }

}
