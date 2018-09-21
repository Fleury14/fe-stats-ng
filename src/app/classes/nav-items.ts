import { INavItem } from "../interfaces/nav-item";

export class NavItems {
    private list:INavItem[] = [{
        title: 'Home',
        url: ''
    },{
        title: 'Game Ststa',
        url: ''
    },{
        title: 'Player Stats',
        url: ''
    },{
        title: 'Player Rankings',
        url: ''
    }];

    public getItems():INavItem[] {
        return this.list;
    }
}