import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'fes-racebot',
    templateUrl: './racebot.component.html',
    styleUrls: ['./racebot.component.scss'],
})

export class RaceBotComponent implements OnInit {
    ngOnInit() {
        console.log('i am the race bot componente');
    }
}