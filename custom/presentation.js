const { FoodPresentation} = require('../base.js');

customPresentation = function(foodpresentationarray) {
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

 module.exports = {customPresentation}