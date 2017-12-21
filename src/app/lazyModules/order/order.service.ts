import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { LoadingService } from '@shared/providers/loading.service';
import { environment } from '@env';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators/map';
import { merge } from 'rxjs/operators/merge';
import { scan } from 'rxjs/operators/scan';
import { publishBehavior } from 'rxjs/operators/publishBehavior';
import { refCount } from 'rxjs/operators/refCount';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { tap } from 'rxjs/operators/tap';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { switchMap } from 'rxjs/operators/switchMap';
import { TreeNode } from 'primeng/primeng';
import { nodes } from './data';

enum ACTION {
    INIT = 'INIT',
    SEARCH = 'SEARCH',
    MATERIAL_SELECT = 'MATERIAL_SELECT',
    MATERIAL_ASSIGN = 'MATERIAL_ASSIGN',
    NODE_SELECT = 'NODE_SELECT',
    NODE_ADD = 'NODE_ADD',
    NODE_REMOVE = 'NODE_REMOVE'
}

export interface IMaterial {
    AssetFamily: string;
    AssetValue: string;
    CaseGroup: string;
    DailyTarget: number;
    DefaultMultiplier: number;
    DefaultQuantity: number;
    ID: number;
    IsRequired: boolean;
    IsSet: boolean;
    LoanerTarget: number;
    Material: string;
    MaterialType: string;
    MonthlyTarget: string;
    Name: string;
    QuarterlyTarget: number;
    Required: boolean;
    SetGroup: string;
}

export interface IState {
    action: IAction;
    filteredMaterials: Array<IMaterial> | null;
    materialSelected: IMaterial | null;
    nodes: TreeNode[];
    nodeSelected: TreeNode | null;
}

type IAction = IActionInit | IActionSearch | IActionMaterialSelect | IActionMaterialAssign | IActionNodeSelect | IActionNodeAdd | IActionNodeRemove;

interface IActionInit {
    type: ACTION;
}

interface IActionSearch {
    type: ACTION;
    materials: Array<IMaterial> | null;
}

interface IActionMaterialSelect {
    type: ACTION;
    materialSelected: IMaterial | null;
}

interface IActionMaterialAssign {
    type: ACTION;
}

interface IActionNodeSelect {
    type: ACTION;
    nodeSelected: TreeNode | null;
}

interface IActionNodeAdd {
    type: ACTION;
    nodeName: string;
}

interface IActionNodeRemove {
    type: ACTION;
    nodeToRemove: TreeNode;    
}


@Injectable()
export class OrderService {
    constructor(
        private _http: HttpClient,
        private _loadingService: LoadingService,
    ) {
        this.state$.subscribe(state => console.log('Order state', state));
        this._initializeReducers();
        this._actionInit();
    }

    inputCtrl = new FormControl();
    private _reducers = new Map<ACTION, (state: IState, action: any) => void>();
    private _actionSubject$ = new Subject<IAction>();
    private _inputCtrl$: Observable<IActionSearch> = this.inputCtrl.valueChanges.pipe(
        debounceTime(environment.debounceTime),
        map((term: string) => term.trim()),
        distinctUntilChanged(),
        tap(() => this._loadingService.on()),
        switchMap((term: string) => term.length >= environment.minCharForHttpSearch ?
            this._http.get<Array<IMaterial> | null>(`http://sdaccdv01.nuvasive.com/admin/hierarchy/findmaterials?term=${term}&_=1513090456090`) :
            Observable.of(null)
        ),
        map((materials: Array<IMaterial> | null) => ({ type: ACTION.SEARCH, materials })),
        tap(() => this._loadingService.off()));


    // USERS STATE STORE
    state$: Observable<IState> = this._actionSubject$.pipe(
        merge(this._inputCtrl$),
        scan((state: IState, action: Readonly<IAction>) => this._reducer(state, action), this._initializeState()),
        publishBehavior(this._initializeState()),
        refCount());



    // REDUCER HANDLER
    private _reducer(state: IState, action: Readonly<IAction>): IState {
        this._reducers.get(action.type)!(state, action);
        state.action = action;
        return state;
    }





    private _initializeReducers() {
        this._reducers.set(ACTION.INIT, (state: IState, action: Readonly<IActionInit>) => {
            // state.users = action.users;
            // state.tenants = action.tenants;
            // state.claims = action.claims;
            // state.filteredMaterials = action.materials;
            // state.user = null;
        });


        this._reducers.set(ACTION.SEARCH, (state: IState, action: Readonly<IActionSearch>) => {
            state.filteredMaterials = action.materials;
        });

        this._reducers.set(ACTION.MATERIAL_SELECT, (state: IState, action: Readonly<IActionMaterialSelect>) => {
            state.materialSelected = action.materialSelected;
        });

        this._reducers.set(ACTION.MATERIAL_ASSIGN, (state: IState, action: Readonly<IActionMaterialAssign>) => {
            if (state.nodeSelected && state.nodeSelected.children) {
                state.nodeSelected.children.push({
                    "data": {
                        "name": state.materialSelected!.Material,
                        "size": "55kb",
                        "type": "Folder"
                    }
                });
            }
        });

        this._reducers.set(ACTION.NODE_SELECT, (state: IState, action: Readonly<IActionNodeSelect>) => {
            state.nodeSelected = action.nodeSelected;
        });

        this._reducers.set(ACTION.NODE_ADD, (state: IState, action: Readonly<IActionNodeAdd>) => {
        });

        this._reducers.set(ACTION.NODE_REMOVE, (state: IState, action: Readonly<IActionNodeRemove>) => {
            if (action.nodeToRemove){
                state.nodeSelected = action.nodeToRemove;
            }
            if (state.nodeSelected && state.nodeSelected.parent && state.nodeSelected.parent.children) {
                state.nodeSelected.parent.children = state.nodeSelected.parent.children.filter(n => n.data !== state.nodeSelected!.data);
            }
        });
    }


    private _initializeState(): IState {
        return {
            action: {} as IAction,
            filteredMaterials: [],
            materialSelected: null,
            nodes: nodes,
            nodeSelected: null
        };
    }


    // REDUX ACTIONS
    private _actionInit() {
    }

    actionMaterialSelect(materialSelected: IMaterial) {
        this._actionSubject$.next({ type: ACTION.MATERIAL_SELECT, materialSelected });
    }

    actionNodeSelect(nodeSelected: TreeNode) {
        this._actionSubject$.next({ type: ACTION.NODE_SELECT, nodeSelected });
    }

    actionMaterialAssign() {
        this._actionSubject$.next({ type: ACTION.MATERIAL_ASSIGN });
    }

    actionNodeAdd(nodeName: string) {
        this._actionSubject$.next({ type: ACTION.NODE_ADD, nodeName });
    }

    actionNodeRemove(nodeToRemove?: TreeNode) {
        console.log(nodeToRemove);
        this._actionSubject$.next({ type: ACTION.NODE_REMOVE, nodeToRemove });
    }
}
