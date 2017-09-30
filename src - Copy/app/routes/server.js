"use strict";
exports.__esModule = true;
var fs = require('fs');
var app_routes_1 = require("../main/app.routes");
console.log(app_routes_1.ROUTES);
// const RAW = data
//   .filter(o => o.qtyInSet > 0)
//   .slice(1)                           //delete header row
//   .map(o => {
//     o.partNumber += '';               //convert to string
//     return o;
//   })
//   .map(o => {
//     delete o.available;               //delete property
//     return o;
//   })
//   .map(o => {
//     o.lordosisOrig = o.lordosis;      //determine outliers
//     if (o.H === 14 || o.H === 16 || o.W === 40) {
//       o.lordosis = 99;
//     }
//     return o;
//   });
// const serialized = 'export const ROUTES = ' + JSON.stringify(RAW, undefined, 2);
// console.log(serialized);
// fs.writeFile(__dirname + '/routes.ts', serialized, 'utf8');
