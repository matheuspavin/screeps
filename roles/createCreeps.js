var levelService =  require('levelService');
var creepService = require('creepService');

var creepsMap = new Map();
var gameLevelCreep = levelService.levels(levelService.getControllerLevel());

var createCreeps =  {
    run: function(creeps) {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    //TODO  
    //I should think about kill creeps, just before the limit time, of each, is about to end. To save time.

        
        if (!Object.keys(creeps).length) {
            Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1', { memory: { role: 'harvester', level: 1 } } );
        }
        //Here i can improve, to start producing creeps before the spawn is full, but for now, its ok!
        if (Game.spawns['Spawn1'].energy >= 300) {!createCreep(creepService.defineCreepToCreate());}
    }
};


//Check if i have energy to build the better creep
var energyLevel = function () {
    let energyCapacityAvailable;
     for(var name in Game.rooms) {
       energyCapacityAvailable = Game.rooms[name].energyCapacityAvailable;
    }
    if (energyCapacityAvailable >= gameLevelCreep.energy && gameLevelCreep.energy > 300) {
        return 'advanced';
    } else {
        return 'basic';
    }
};

var energyCapacity = function () {
    let energy;
    for(var name in Game.rooms) {
       energy = Game.rooms[name].energyCapacityAvailable;
    }
    return energy;
}

var energyNow = function () {
    let energy;
    for(var name in Game.rooms) {
       energy = Game.rooms[name].energyAvailable;
    }
    return energy;
}

var countCreeps = function (creeps, role) {
    let quantity = _.filter(creeps, (creep) => creep.memory.role == role);
    creepsMap.set(role, quantity.length)
    return quantity.length;
};

var sayHowMuchCreeps = function (creeps, roleCreepsMap) {
    roleCreepsMap.forEach( function(quantity, role) {
        console.log('Sir, we have ' + quantity + ' ' + role + 'creeps');
    });
};

var createCreep = function (roleCreep) {
    let creepProperties
    if(energyLevel() === 'advanced' && energyCapacity() > energyNow() && energyNow() < gameLevelCreep.energy) {
        return;
    } else if (energyLevel() === 'basic') {
        creepProperties = gameLevelCreep.basicProperties;
    } else {
        if (roleCreep === 'warrior'){
            creepProperties = gameLevelCreep.warrior;
        } else {
            creepProperties = gameLevelCreep.advancedProperties;
        }
    }
    if (!roleCreep) return;
    console.log('Spawning one ' + roleCreep + '...' + energyLevel());
    // let creepProperties = (roleCreep != 'warrior' ? gameLevelCreep.basicProperties : gameLevelCreep.warriorProperties);
    Game.spawns['Spawn1'].spawnCreep( creepProperties, roleCreep + (Game.time), { memory: { role: roleCreep, level: 1 } } );
    sayHowMuchCreeps(Game.creeps, creepsMap);
};

module.exports =  createCreeps;