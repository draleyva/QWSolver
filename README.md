https://github.com/JWally/jsLPSolver

/*
model = {
    "optimize": "capacity",
    "opType": "max",
    "constraints": {
        "plane": {"max": 44},
        "person": {"max": 512},
        "cost": {"max": 300000}
    },
    "variables": {
        "brit": {
            "capacity": 20000,
            "plane": 1,
            "person": 8,
            "cost": 5000
        },
        "yank": {
            "capacity": 30000,
            "plane": 1,
            "person": 16,
            "cost": 9000
        }
    }
*/
map = new Map();
map.set('optimize','profit');
map.set('opType','max');

volumen = new Map();
volumen.set('min', 5.5);
volumen.set('max', 5.7);
constraints = new Map();
constraints.set('volumen', Object.fromEntries(volumen));
map.set('constraints', Object.fromEntries(constraints));

item1 = new Map();
item1.set('volumen',2.5);
item1.set('profit',0.5);
item2 = new Map();
item2.set('volumen',0.6);
item2.set('profit',0.08);
item3 = new Map();
item3.set('volumen',5.5);
item3.set('profit',1.1);
variables = new Map();
variables.set('item1',Object.fromEntries(item1));
variables.set('item2',Object.fromEntries(item2));
variables.set('item3',Object.fromEntries(item3));
map.set('variables', Object.fromEntries(variables));

ints = new Map();
ints.set('item1', 1);
ints.set('item2', 1);
ints.set('item3', 1);
map.set('ints', Object.fromEntries(ints));

/*
    let volumen = new Map();
    volumen.set('min', 5.5);
    volumen.set('max', 5.7);
    let constraints = new Map();
    constraints.set('volumen', Object.fromEntries(volumen));

    let item1 = new Map();
    item1.set('volumen',2.5);
    item1.set('profit',0.5);
    let item2 = new Map();
    item2.set('volumen',0.6);
    item2.set('profit',0.08);
    let item3 = new Map();
    item3.set('volumen',15.5);
    item3.set('profit',1.1);
    let variables = new Map();
    variables.set('item1',Object.fromEntries(item1));
    variables.set('item2',Object.fromEntries(item2));
    variables.set('item3',Object.fromEntries(item3));

    let lpresult = lpsolver.perform(optimization, constraints, variables);
    console.log(lpresult);
    let f = lpresult.get('feasible');
      console.log('feasible : '+f);
    */

    
	https://www.section.io/engineering-education/google-sheets-api-in-nodejs/