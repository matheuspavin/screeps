var levels =  require('levels');
var structuresService = require('structures');

var creepsMap = new Map();
// var lvl = Room;
var gameLevelCreep = levels.levels(levels.getControllerLevel());

var createCreeps =  {
    run: function(creeps) {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        
    //I should think about kill creeps, just before the limit time, of each, is about to end. To save time.

        
        if (!Object.keys(creeps).length) {
            Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1', { memory: { role: 'harvester', level: 1 } } );
        }
        
        let harvesters = countCreeps(creeps, 'harvester');
        let builders = countCreeps(creeps, 'builder');
        let upgraders = countCreeps(creeps, 'upgrader');
        let healers = countCreeps(creeps, 'healer');
        if (Game.spawns['Spawn1'].energy >= 300) {!createCreep(defineCreepToCreate());}
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


//It's a basic controller of creation 
var defineCreepToCreate = function () {
    var gameSize = 1;
    //this way I do not create a crowd, around the only starting resource.
    if ( levels.getControllerLevel() === 1 && Game.spawns['Spawn1'].energyCapacity === 300 && _.size(Game.creeps) < 8) {
        if (countCreeps(Game.creeps, 'harvester') <= 1) { 
            return 'harvester';
        } else if (countCreeps(Game.creeps, 'upgrader') <= 1) {
            return 'upgrader';
        }else {
            return 'builder'; 
        }
    } else if (structuresService.findContainer().length && _.size(Game.creeps) < gameLevelCreep.maxCreeps) {
        
        if (((26 * Game.gcl.level) > _.size(Game.creeps)) && (_.size(Game.creeps) >= 6)) {
            gameSize = 1 + levels.getControllerLevel();
        } else if (((39 * Game.gcl.level) > _.size(Game.creeps)) && (_.size(Game.creeps) >= 26)) {
            gameSize = 2 + levels.getControllerLevel();
        } else if (((52 * Game.gcl.level) > _.size(Game.creeps)) && (_.size(Game.creeps) >= 39)) {
            gameSize = 3 + levels.getControllerLevel();
        } else if (((65 * Game.gcl.level) > _.size(Game.creeps)) && (_.size(Game.creeps) >= 52)) {
            gameSize = 4 + levels.getControllerLevel();
        }  else {
            gameSize = 1;
        }
        
        //I have to create, after having the first container, some harvester specific for that, and some upgrader.
        // if (countCreeps(Game.creeps, 'repairer') < (1)) { return 'repairer';}
        // if (countCreeps(Game.creeps, 'harvesterContainer') < 2) { return 'harvesterContainer';}
        //  if (countCreeps(Game.creeps, 'builder') < 1) { return 'builder';}
        
        // Continue to create (first round)
        if (countCreeps(Game.creeps, 'repairer') < 1) { return 'repairer';}
        if (countCreeps(Game.creeps, 'warrior') < 1) { return 'warrior';}
        if (countCreeps(Game.creeps, 'harvester') <= 2) { return 'harvester';}
        if (countCreeps(Game.creeps, 'harvesterContainer') <= 3) { return 'harvesterContainer';}
        if (countCreeps(Game.creeps, 'builder') <= 1) { return 'builder';}
        if (countCreeps(Game.creeps, 'upgrader') <= 2) { return 'upgrader';}
        if (countCreeps(Game.creeps, 'harvesterContainer') <= 2) { return 'harvesterContainer';}
        if (countCreeps(Game.creeps, 'upgrader') <= 2) { return 'upgrader';}

        
        // Continue to create (second round)
        if (countCreeps(Game.creeps, 'harvesterContainer') < (3* gameSize)) { return 'harvesterContainer';}
        if (countCreeps(Game.creeps, 'upgrader') < (3 * gameSize)) { return 'upgrader';}
        if (countCreeps(Game.creeps, 'builder') < (2 * gameSize)) { return 'builder';}
        if (countCreeps(Game.creeps, 'repairer') < (1 * gameSize)) { return 'repairer';}
        if (countCreeps(Game.creeps, 'warrior') < (1 * gameSize)) { return 'warrior';}
    } else {
        return;
    }
}

module.exports =  createCreeps;