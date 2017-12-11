import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
// import { LoadingService } from '@shared/providers/loading.service';

@Component({
    selector: 'atlas-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
    constructor(
        // private _http: HttpClient,
        // private _loadingService: LoadingService,
    ) { }

    ngOnInit() {

        // const payload = {
        //     filters: [
        //         { join: 'AND', name: 'ShipDate', type: 'IN RANGE', value: '2017-10-01T07:00:00.000Z', range: '2017-10-31T07:00:00.000Z' },
        //         { join: 'AND', name: 'ReturnDate', type: 'IN RANGE', value: '2017-10-31T07:00:00.000Z', range: '2017-11-30T07:00:00.000Z' }
        //     ],
        //     sorting: [{ property: 'shipDate', direction: 0 }, { property: 'key', direction: 1 }]
        // };
    }
}
