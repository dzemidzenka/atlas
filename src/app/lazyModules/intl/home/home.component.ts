import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../../../shared/providers/loading.service';

@Component({
    selector: 'atlas-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
    constructor(
        private _http: HttpClient,
        private _loadingService: LoadingService,
    ) { }

    ngOnInit() {
        this._loadingService.off();
        // const headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

        // const payload = {
        //     filters: [
        //         { join: 'AND', name: 'ShipDate', type: 'IN RANGE', value: '2017-10-01T07:00:00.000Z', range: '2017-10-31T07:00:00.000Z' },
        //         { join: 'AND', name: 'ReturnDate', type: 'IN RANGE', value: '2017-10-31T07:00:00.000Z', range: '2017-11-30T07:00:00.000Z' }
        //     ],
        //     sorting: [{ property: 'shipDate', direction: 0 }, { property: 'key', direction: 1 }]
        // };

        return this._http
            .get(
            // 'http://de.atlasglobal-dev.nuvasive.com/api/V1/en-us/users',
            // 'http://de.atlasglobal-dev.nuvasive.com/api/V1/en-us/users/tenants?q=names',
            'http://de.atlasglobal-dev.nuvasive.com/api/V1/en-us/users/claims?q=[claimtypes,rolenames]',
            // JSON.stringify(payload)
            // { headers: headers }
        )
            .do(json => console.log(json))
            .subscribe();
    }
}
