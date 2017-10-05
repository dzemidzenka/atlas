// import { Component, ChangeDetectionStrategy } from '@angular/core';
// import { TreeModel, Ng2TreeSettings } from 'ng2-tree';
// import { ReduxService } from '../../providers/redux.service';
// import { IMenuModel } from '../../models/models';


// // import { TreeModule } from 'ng2-tree';

// @Component({
//   selector: 'atlas-tree',
//   templateUrl: './tree.component.html',
//   styleUrls: ['./tree.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class TreeComponent {

//   constructor(
//     private _reduxService: ReduxService,
//   ) { }

//   treeSettings: Ng2TreeSettings = {
//     rootIsVisible: true
//   };


//   tree$ = this._reduxService.state$.map(state => {
//     const tree: TreeModel = {
//       value: 'Atlas',
//       settings: {
//         'static': true,
//         'templates': {
//           'node': '<i class="material-icons">&#xE2C8;</i>',
//           // 'leaf': '<i class="fa fa-file-o fa-lg"></i>',
//         }
//       },
//       children: []
//     };

//     // forEach(country => tree.children.push(
//     //   {
//     //     value: country,
//     //     children: []
//     //   }
//     // ));

//     // state.menu.forEach(menuItem => tree.children.push(this.createNode(menuItem)));
//     return tree;
//   });


//   // {
//   //   value: 'Object-oriented programming',
//   //   children: [
//   //     { value: 'Java' },
//   //     { value: 'C++' },
//   //     { value: 'C#' }
//   //   ]
//   // },



//   // createNode(menuItem: IMenuModel): TreeModel {
//   //   const node: TreeModel = {
//   //     value: menuItem.tcode,
//   //     children: [this.createNode(menuItem)]
//   //   };
//   //   return node;
//   // }




//   onNodeSelected(event) {
//     console.log(event);
//   }

// }
