const Excel = require('exceljs');
const xlsxFile = require('read-excel-file/node');
const census = require('./Census.js');
const workbook = new Excel.Workbook();
const { Coordinate, Position, Item, Modular, CareType, Delivery, FoodDelivery, Food} = require('./base.js');

const STATE = 0;
const PROVINCE = 1;
const DISTRIT = 2;
const GEO = 3;
const GEOZONE = 4;
const	POPULATED = 5;
const	FOODREGION = 6;
const	MODULARCODE	= 7;
const ANNEXED = 8;
const SCHOOL = 9;
const	ADDRESS = 10;
const LEVEL = 11;
const	USERS = 12;
const CARETYPE = 13;
const	FOOD = 14;
const UNIT = 15;
const DELIVERY = 16;
const PRESENTATION = 17;
const QUANTITY = 18;
const SCHOOLQUANTITY = 19;
const VOLUMEN = 20;

const ROWDATA = 11;
const ITEM_ROW = 7;
const ITEM_COLUMN = 4;

readDocument = async function(filename, s, parameter, callback) {
  await xlsxFile(filename, { sheet: s}).then((rows) => {
    console.log('process : '+filename+' sheet : '+s);
      callback(rows, parameter);
  });
}

readDocumentExt = async function(filename, s, parameter, callback) {
  await workbook.xlsx.readFile(filename).then(function(){
    var workSheet =  workbook.getWorksheet(s);
    var rows = workSheet.getRows(1, workSheet.rowCount);
    //console.log(rows[1].getCell(8).value);
    callback(workSheet.getRows(1, workSheet.rowCount), parameter);  
  });
}

function checkModuleData(rows, item) {
  /*for (i in rows) {
  }*/
}

check = function(filename, s) {
  try
  {
    console.log(`processing ${filename}`)
    readDocumentExt(filename, s, null, checkModuleData);
  }
  catch(error)
  {
    console.error(`Can not process ${filename}`);
  }
}

function VAL(rows, i, j){
  return rows[i].getCell(j+1).value;
}

function readModuleData(rows, item) {
  let modularitem = null;
  let caretypeitem = null;
  let deliveryitem = null;

  item.name = VAL(rows, ITEM_ROW, ITEM_COLUMN).toString(); 
  //console.log('Processing <'+item.name+'>');

  for (i in rows) {
    if(i < ROWDATA)
      continue;
    
    // modularcode
    modularcode = VAL(rows, i, MODULARCODE);
    //console.log(`modularcode : ${modularcode}`);
    if(!item.modularMap.has(modularcode)) {
      item.modularMap.set(modularcode, new Modular());
      modularitem = item.modularMap.get(modularcode);
      modularitem.code = modularcode;
      modularitem.users = VAL(rows, i, USERS);
    }
    else {
      modularitem = item.modularMap.get(modularcode);
    }
    
    // caretype
    caretype = VAL(rows, i, CARETYPE);
    //console.log(`caretype : ${caretype}`);
    if(!modularitem.careTypeMap.has(caretype)) {
      //console.log('care type : '+caretype);
      modularitem.careTypeMap.set(caretype, new CareType());
      caretypeitem = modularitem.careTypeMap.get(caretype);
    }
    else {
      caretypeitem = modularitem.careTypeMap.get(caretype);
    }

    // delivery
    delivery = VAL(rows, i, DELIVERY);
    //console.log('row : '+ i + ' mc : '+modularcode + ' delivery : '+delivery);
    if(!caretypeitem.deliveryMap.has(delivery)) {
      caretypeitem.deliveryMap.set(delivery, new Delivery());
      deliveryitem = caretypeitem.deliveryMap.get(delivery);
    }
    else {
      deliveryitem = caretypeitem.deliveryMap.get(delivery);
    }
    
    //console.log(rows[i][FOOD]);
    food = VAL(rows, i, FOOD).trim();
    if(!deliveryitem.foodDeliveryMap.has(food)) {
      deliveryitem.foodDeliveryMap.set(food, new FoodDelivery());
      fooditem = deliveryitem.foodDeliveryMap.get(food);
      fooditem.food = new Food(food, VAL(rows, i, UNIT));

      let presentation = ''+VAL(rows, i, PRESENTATION);
      fooditem.presentation = parseFloat(presentation);
      fooditem.quantity = VAL(rows, i, QUANTITY);
    }
    else {
      fooditem = deliveryitem.foodDeliveryMap.get(food);
    }
  }
}

perform = async function(filename, s, performcensus, callback) { 
  
  let item = new Item();

  item.document = filename;
  await readDocumentExt(filename, s, item, readModuleData);

  let ic = itemCensus(item.modularMap, performcensus);
    
  ic.then((map) => {
    let ip = itemProcess(map);
    ip.then((map) => {        
      callback(item);
    });
  });
}

async function itemCensus(map, pcensus)
{
  if(!pcensus)
    return map;

  for (const [key, value] of map.entries()) {
    let start = performance.now();
    censusdata = census.perform(key);
    let acd = await censusdata;
    let end = performance.now();
    console.log('census [T:'+(end-start)+')');
    value.position.coordinate.set(acd.coordinate);
  }

  return map;
}

async function itemProcess(map)
{
  return map;
}

async function itemDisplay(map)
{
  for (const [key, value] of map.entries()) {    
    console.log('modular code <'+key+'> : ' + value.position.coordinate);
    for (const [key1, value1] of value.careTypeMap) {    
      console.log('care type <'+key1+'> : '+value1.deliveryMap.size);
      dm = new Map([...value1.deliveryMap].sort());
      for (const [key2, value2] of dm) {
        console.log('delivery <'+key2+'>');
        for (const [key3, value3] of value2.foodDeliveryMap) {
          console.log('food <'+key3+'> : presentation : '+value3.presentation);
        }
      }
    }
  }

  return map;
}

module.exports = { readDocument, readDocumentExt, perform, check };
