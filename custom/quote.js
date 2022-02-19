const { FoodRequestPresentation} = require('../base.js');

customQuote = function(foodpresentationarray) {
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
    // QUINUA
    food = new FoodRequestPresentation();
    food.name = 'QUINUA';
    food.presentation = 1;
    food.ceil = true;
    food.presentationName = ' QUINUA 1 Kg';
    foodpresentationarray.push(food);    
    // HARINA EXTRUIDA DE MAIZ
    food = new FoodRequestPresentation();
    food.name = 'HARINA EXTRUIDA DE MAIZ';
    food.presentation = 1;
    food.ceil = true;
    food.presentationName = 'HARINA EXTRUIDA DE MAIZ 1 Kg';
    foodpresentationarray.push(food);
    // HARINA EXTRUIDA DE TRIGO
    food = new FoodRequestPresentation();
    food.name = 'HARINA EXTRUIDA DE TRIGO';
    food.presentation = 1;
    food.ceil = true;
    food.presentationName = 'HARINA EXTRUIDA DE TRIGO 1 Kg';
    foodpresentationarray.push(food);
    // HARINA EXTRUIDA DE QUINUA
    food = new FoodRequestPresentation();
    food.name = 'HARINA EXTRUIDA DE QUINUA';
    food.presentation = 1;
    food.ceil = true;
    food.presentationName = 'HARINA EXTRUIDA DE QUINUA 1 Kg';
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

  module.exports = {customQuote}
