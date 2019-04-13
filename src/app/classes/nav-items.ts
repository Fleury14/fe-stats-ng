import { INavItem } from "../interfaces/nav-item";

export class NavItems {
    private list:INavItem[] = [{
        title: 'Home',
        url: 'main'
    },{
        title: 'FF4:FE Stats',
        url: 'fe-stats'
    },{
        title: 'Player Stats',
        url: 'player-stats'
    },{
        title: 'Player Rankings',
        url: 'player-rankings'
    },{
        title: 'Current Races',
        url: 'current-races'
    },{
        title: 'Race Bot',
        url: 'race-bot'
    }];

    public getItems():INavItem[] {
        return this.list;
    }
}