import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    ComponentFactoryResolver,
    Injector,
    ApplicationRef,
    ViewChild,
    ElementRef,
    ComponentFactory,
    ComponentRef
} from '@angular/core';

import { TestComponent } from './test/test.component';

@Component({
    selector: 'atlas-demo1',
    templateUrl: './demo1.component.html',
    styleUrls: ['./demo1.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Demo1Component implements OnInit {
    constructor(
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _applicationRef: ApplicationRef,
        private _injector: Injector
    ) { }

    isOpen = false;
    componentOutlet = TestComponent;

    private _componentRef: ComponentRef<TestComponent>;
    @ViewChild('test') test: ElementRef;

    ngOnInit() {
        const componentFactory: ComponentFactory<any> = this._componentFactoryResolver.resolveComponentFactory(TestComponent);
        this._componentRef = componentFactory.create(this._injector, [], this.test.nativeElement);
        this._applicationRef.attachView(this._componentRef.hostView);
    }
}
