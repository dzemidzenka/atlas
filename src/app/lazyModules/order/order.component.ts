import { Component, ChangeDetectionStrategy } from '@angular/core';
import { OrderService, IMaterial } from './order.service';

@Component({
    selector: 'atlas-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent {
    constructor(
        private _orderService: OrderService,
    ) { }

    state$ = this._orderService.state$;
    inputCtrl = this._orderService.inputCtrl;

    onMaterialSelect(material: IMaterial) {
        this._orderService.actionMaterialSelect(material);
    }

    onAssignMaterial() {
        this._orderService.actionMaterialAssign();
    }

    onNodeSelect(event: any) {
        this._orderService.actionNodeSelect(event.node);
    }

    onNodeAdd(){
        this._orderService.actionNodeAdd('testNode');        
    }

    onNodeRemove(node?: any){
        this._orderService.actionNodeRemove(node);        
    }    
}
