import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/providers/notification.service';
import { LoadingService } from '../../shared/providers/loading.service';

@Component({
    selector: 'atlas-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    constructor(
        private _notificationService: NotificationService,
        private _loadingService: LoadingService
    ) { }

    ngOnInit() {
        this._loadingService.off();
    }

    onClick() {
        this._notificationService.notify([{ message: 'New notification ' + Date.now() }]);
    }
}
