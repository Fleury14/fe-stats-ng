import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'fes-most-races',
    templateUrl: './most-races-leaderboard.html',
    styleUrls: [ './most-races-leaderboard.scss' ]
})

export class MostRacesLeaderboard implements OnInit {
    selected: string = 'lastWeek';
    page: number = 1;
    PAGELENGTH = 30;
    paginatedItems: any[] = [];
    @Input() data: any;
    
    ngOnInit() {
        this._paginateData(this.data[this.selected]);
    }

    public switchActive(flag: string) {
        this.selected = flag;
        this._paginateData(this.data[this.selected]);
    }

    public switchPage(page: number) {
        this.page = page;
    }

    private _paginateData(data: any[]) {
        this.paginatedItems = [];
        console.log(data.length / this.PAGELENGTH);
        for (let i = 0; i < Math.ceil(data.length / this.PAGELENGTH); i++) {
            this.paginatedItems.push([]);
            for (let itemIndex = this.PAGELENGTH * i; itemIndex < this.PAGELENGTH * (i + 1); itemIndex++) {
                if ( itemIndex < data.length ) {
                    console.log('item index ', itemIndex, ' going into ', i);
                    this.paginatedItems[i].push(data[itemIndex]);
                }
            }
        }
        console.log('paginated data', this.paginatedItems);
    }
    
}