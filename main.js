'use strict';
// check TURF geo
const colors = require('colors/safe');
const { FoodPresentation, FoodRequestPresentation, FoodDelivery, Food} = require('./base.js');
const fs = require('fs');
const process = require("./DeliveryProcess.js");
const filename = 'C:/TEMP/ABANCAY1_APURIMAC3_APURIMAC_P1.xlsx'
//const filename = 'C:/TEMP/AMARILIS2_HUANUCO1_HUANUCO_P1.xlsx'
const streamfilename = 'C:/TEMP/ABANCAY1_APURIMAC3_APURIMAC_P1.json'

//const stream = fs.createWriteStream(streamfilename, {flags: 'w'});

//stream.write('year, territorial unit, committee, item, product, presentation, unit, volumen\n');

function customDeliveryPresentation(foodpresentationarray) {
   // presentation
   var arrozp1 = new FoodPresentation();
   arrozp1.name = 'ARROZ';
   arrozp1.presentation = 0.5;
   arrozp1.presentationName = 'ARROZ VALESKA (0.5)';
   arrozp1.default = false;
   foodpresentationarray.push(arrozp1);
  
   var arrozp2 = new FoodPresentation();
   arrozp2.name = 'ARROZ';
   arrozp2.presentation = 0.25;
   arrozp2.presentationName = 'ARROZ JOAQUIN (0.25)';
   arrozp2.default = false;
   foodpresentationarray.push(arrozp2);
   
   var arrozp3 = new FoodPresentation();
   arrozp3.name = 'ARROZ FORTIFICADO';
   arrozp3.presentation = 0.5;
   arrozp3.presentationName = 'ARROZ VALESKA FORTIFICADO (0.5)';
   arrozp3.default = false;
   foodpresentationarray.push(arrozp3);

   var lechep2 = new FoodPresentation();
   lechep2.name = 'LECHE EVAPORADA ENTERA';
   lechep2.presentation = 0.8;
   lechep2.presentationName = 'La Vaca Lola';
   lechep2.default = false;
   foodpresentationarray.push(lechep2);
}

function requestQuote(foodpresentationarray) {
  // ACEITE VEGETAL
  var food = new FoodRequestPresentation();
  food.name = 'ACEITE VEGETAL';
  food.presentation = 1;
  food.ceil = true;
  food.presentationName = '1 L';
  foodpresentationarray.push(food);
  // FIDEOS
  food = new FoodRequestPresentation();
  food.name = 'FIDEOS';
  food.presentation = 100;
  food.ceil = true;
  food.presentationName = '100 Kg';
  foodpresentationarray.push(food);
  // ARROZ
  food = new FoodRequestPresentation();
  food.name = 'ARROZ';
  food.presentation = 100;
  food.ceil = true;
  food.presentationName = '100 Kg';
  foodpresentationarray.push(food);
  // ARROZ FORTIFICADO
  food = new FoodRequestPresentation();
  food.name = 'ARROZ FORTIFICADO';
  food.presentation = 100;
  food.ceil = true;
  food.presentationName = '100 Kg';
  foodpresentationarray.push(food);
  // AZUCAR RUBIA
  food = new FoodRequestPresentation();
  food.name = 'AZUCAR RUBIA';
  food.presentation = 50;
  food.ceil = true;
  food.presentationName = '50 Kg';
  foodpresentationarray.push(food);
  // CONSERVA DE BOFE DE RES
  food = new FoodRequestPresentation();
  food.name = 'CONSERVA DE BOFE DE RES';
  food.quantity = 48;
  food.ceil = true;
  food.presentation = 0.17;
  food.presentationName = 'CAJA DE 48 x 0.17 Kg';
  foodpresentationarray.push(food);
  // CONSERVA DE CARNE DE POLLO O GALLINA
  food = new FoodRequestPresentation();
  food.name = 'CONSERVA DE CARNE DE POLLO O GALLINA';
  food.ceil = true;
  food.presentation = 0.17;
  food.presentationName = 'CAJA DE 48 x 0.17 Kg';
  foodpresentationarray.push(food);
  // CONSERVA DE PESCADO EN ACEITE VEGETAL
  food = new FoodRequestPresentation();
  food.name = 'CONSERVA DE PESCADO EN ACEITE VEGETAL';
  food.presentation = 0.17;
  food.quantity = 20;
  food.ceil = true;
  food.presentationName = 'CONSERVA 0.17 Kg';
  foodpresentationarray.push(food);
  // HARINA EXTRUIDA DE QUINUA
  food = new FoodRequestPresentation();
  food.name = 'HARINA EXTRUIDA DE QUINUA';
  food.presentation = 1;
  food.ceil = true;
  food.presentationName = 'HARINA 1 Kg';
  foodpresentationarray.push(food);
  // HOJUELAS DE AVENA CON MACA
  food = new FoodRequestPresentation();
  food.name = 'HOJUELAS DE AVENA CON MACA';
  food.presentation = 1;
  food.ceil = true;
  food.presentationName = 'AVENA 1 Kg';
  foodpresentationarray.push(food);
  // HOJUELAS DE AVENA CON QUINUA
  food = new FoodRequestPresentation();
  food.name = 'HOJUELAS DE AVENA CON QUINUA';
  food.presentation = 1;
  food.ceil = true;
  food.presentationName = 'AVENA 1 Kg';
  foodpresentationarray.push(food);
  // LECHE EVAPORADA ENTERA
  food = new FoodRequestPresentation();
  food.name = 'LECHE EVAPORADA ENTERA';
  food.quantity = 40;
  food.presentation = 0.4;
  food.ceil = true;
  food.presentationName = 'Caja con 40 latas de 0.4 Kg';
  foodpresentationarray.push(food);  
}

function main() {
  
  let caretype = 'DESAYUNO';
  let delivery = 1;

  // 1. los paquetes por defecto con la especificación
  // 2. Afinar los paquetes porque ya cuentas con la información
  // 3. Se puede crear la solicitud de cotización con los datos
  // 4. Con la información afinada se crea la orden de compra

  process.perform(filename, 'Detalle', false, function (item) {
    processItem(item, caretype, delivery, true, true, true, true);
  });
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
    customDeliveryPresentation(foodpresentationarray);

  requestQuote(foodrequestpresentationarray);

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
