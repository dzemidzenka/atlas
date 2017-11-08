import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LoadingService } from '../../providers/loading.service';

@Component({
  selector: 'atlas-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
  constructor(
    private _loadingService: LoadingService,
  ) { }

  isLoading$ = this._loadingService.isLoading$;
}
