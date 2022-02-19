'use strict';
// check TURF geo
const path = require('path');
const colors = require('colors/safe');
const { FoodPresentation, FoodRequestPresentation, FoodDelivery, Food} = require('./base.js');
const fs = require('fs');
const process = require("./DeliveryProcess.js");
const quote = require("./custom/quote.js");
const presentation = require("./custom/presentation.js");

const directory = 'c:/TEMP/QW_2022-20220212T185609Z-001';
const filename = 'C:/TEMP/ABANCAY1_APURIMAC3_APURIMAC_P1.xlsx'
//const filename = 'C:/TEMP/AMARILIS2_HUANUCO1_HUANUCO_P1.xlsx'
const streamfilename = 'C:/TEMP/ABANCAY1_APURIMAC3_APURIMAC_P1.json'

//const stream = fs.createWriteStream(streamfilename, {flags: 'w'});

//stream.write('year, territorial unit, committee, item, product, presentation, unit, volumen\n');

function main() {
  
  let caretype = 'DESAYUNO';
  let delivery = 1;

  // 1. los paquetes por defecto con la especificación
  // 2. Afinar los paquetes porque ya cuentas con la información
  // 3. Se puede crear la solicitud de cotización con los datos
  // 4. Con la información afinada se crea la orden de compra

  // 0 check 1 perform
  let operation = 2;

  switch(operation) {
    case 0:
      var dirpath = path.join(directory);
      fs.readdir(dirpath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        //console.log(files);
        files.forEach(function (file) {
          let filepath = path.join(directory, file);
          fs.lstat(filepath, (err, stats) => {
            if(err)
              return console.log(err);
            if(!stats.isFile())
              return;
            process.check(filepath, 'Detalle');
          });

        });
      });
    break;
    case 1:
      process.perform(filename, 'Detalle', false, function (item) {
        processItem(item, caretype, delivery, true, true, true, true);
      });
    break;
    case 2:
      var dirpath = path.join(directory);
      fs.readdir(dirpath, function (err, files) {
        if (err) {
          return console.log('Unable to scan directory: ' + err);
        } 
        //files.forEach(function (file) {
        for(var i = 0; i < files.length; i++)
        {
          let filepath = path.join(directory, files[i]);
          let stats = fs.lstatSync(filepath);
          if(!stats.isFile())
            continue;
          // usecustompresentation : usar los datos llenados manualmente para armar los paquetes
          // archivo presentation.js
          // showpackage  : mostrar los paquetes y su contenido de alimentos
          // showshopping : mostrar la lista de compra para cubrir el requerimiento del item
          // trabaja con los alimentos especificados en quote.js
          // showextraquantity : mostrar el detalle adicional de cantidades
          process.perform(filepath, 'Detalle', false, function (item) {
            processItem(item, caretype, delivery, true, false, true, false);
          });
        };
      });
    break;
  }
}

function hasRequestPresentation(foodrequestpresentationarray, key) {
  for(let frp of foodrequestpresentationarray) {
    if(frp.name == key)
      return frp;
  }
}

function processItem(item, caretype, delivery, usecustompresentation, showpackage, showshopping, showextraquantity){
  let foodpresentationarray = new Array();
  let foodrequestpresentationarray = new Array();

  item.defaultPresentation(caretype, delivery, foodpresentationarray);

  if(usecustompresentation)
    presentation.customPresentation(foodpresentationarray);

  quote.customQuote(foodrequestpresentationarray);

  item.performBuildPackage(caretype, delivery, foodpresentationarray).then((result) => {

    if(showpackage) {
      console.log(colors.blue('Detecting package types [S:'+result.package.size+']'));

      for (const [key, value] of result.package.entries()) {
        console.log(value.detail.hash());
        console.log('modules : '+value.moduleArray);
        console.log('quantity : '+value.quantity);
        console.table(value.detail.foodDisplayArray);
      }
    }

    if(showshopping) {
      let errorcount = 0;
      let requestfoodarray = new Array();

      for (const [key, value] of result.shopping.entries()) {
        let frp = hasRequestPresentation(foodrequestpresentationarray, key);
        if(frp == null) {
          ++errorcount;
          console.log('Please enter a reference to : '+key+' '+value.food.unit);
        }
        else {
          let clonedfrp = Object.assign({}, frp);
          clonedfrp.food = value.food;
          clonedfrp.unit = value.food.unit;

          //console.log('key : '+key+' '+value.food.unit);
          //console.log('quantity : '+value.quantity);
          //console.log('volumen : '+value.volumen);

          clonedfrp.volumen = value.volumen;

          if(frp.quantity != 0) {
            if(frp.ceil || (value.quantity % frp.quantity) == 0) {
              clonedfrp.quantity = Math.ceil(value.quantity/frp.quantity);
            }
            else {
              clonedfrp.quantity = Math.floor(value.quantity/frp.quantity);
              clonedfrp.extraQuantity = value.quantity%frp.quantity;

              clonedfrp.extraQuantityText = 'Unidad(es) '+frp.presentation.toFixed(2)+' '+clonedfrp.unit;
            }

            clonedfrp.quantityText = clonedfrp.presentationName;

            //console.log('calculated quantity : '+clonedfrp.quantity);
          }
          else {
            if(frp.ceil) {
              clonedfrp.quantity = Math.ceil(value.volumen / frp.presentation);              
            }
            else {
              clonedfrp.quantity = Math.floor(value.volumen / frp.presentation);
              
              clonedfrp.extraQuantity = value.volumen%frp.presentation;
              clonedfrp.extraQuantityText = frp.presentation.toFixed(2)+' '+clonedfrp.unit;
            }

            clonedfrp.quantityText = clonedfrp.presentationName;
          }

          requestfoodarray.push(clonedfrp);
        }
      }

      if(errorcount > 0)
        console.log('Products without definition [S:'+errorcount+']');
      else {
        let columns = ['name', 'unit', 'volumen', 'ceil', 'quantity', 'quantityText'];
        
        if(showextraquantity)
          columns = columns.concat(['extraQuantity', 'extraQuantityText']);          
        
        console.table(requestfoodarray, columns);
      }
    }

  });
}

function moduleTest(item){
  // Presentación usada al formar los paquetes
  let foodpresentationarray = new Array();
  // Presentación usada al momento de realizar la Solicitud de Cotización
  let foodrequestpresentationarray = new Array();

  let caretype = 'DESAYUNO';
  let delivery = 3;
  let modularcode = '0237404';

  if(item.modularMap.has(modularcode)) {

    // specify custom food presentations
    customDeliveryPresentation(foodpresentationarray);
    customRequestPresentation(foodrequestpresentationarray);

    item.modularMap.get(modularcode).defaultPresentation(caretype, delivery, foodpresentationarray)
      
    item.modularMap.get(modularcode).performDelivery(caretype, delivery, foodpresentationarray);
  }
}

main();
