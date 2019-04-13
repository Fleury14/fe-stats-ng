import { Component, OnInit } from '@angular/core';
import { RaceBotService } from '../../services/racebot.service';
import { sortRacesByTime } from './helpers/sortRacesByTime';

@Component({
    selector: 'fes-racebot',
    templateUrl: './racebot.component.html',
    styleUrls: ['./racebot.component.scss'],
})

export class RaceBotComponent implements OnInit {
    public racebotData;

    constructor (private _racebot: RaceBotService) {}

    ngOnInit() {
        this._racebot.getAllRaces().subscribe(data => {
            this.racebotData = data;
        });
        
        // temp fake data for parsing
        // this.racebotData = this._racebot.getAllRacesFake();
        // console.log('fake racebot data', this.racebotData);
    }
    
    public timeSort(data) {
        return sortRacesByTime(data);
    }
}