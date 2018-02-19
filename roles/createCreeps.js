var levels =  require('levels');


var creepsMap = new Map();
// var lvl = Room;
var gameLevelCreep = levels.levels(Game.gcl.level);

var createCreeps =  {
    run: function(creeps) {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        
        if (!Object.keys(creeps).length) {
            Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1', { memory: { role: 'harvester', level: 1 } } );
        }
        
        let harvesters = countCreeps(creeps, 'harvester');
        let builders = countCreeps(creeps, 'builder');
        let upgraders = countCreeps(creeps, 'upgrader');
        let healers = countCreeps(creeps, 'healer');
        
        if (Game.spawns['Spawn1'].energy >= gameLevelCreep.energy) {!createCreep(defineCreepToCreate());}
    }
};


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
    if (!roleCreep) return;
    console.log('Spawning one ' + roleCreep + '...');
    let creepProperties = (roleCreep != 'warrior' ? gameLevelCreep.basicProperties : gameLevelCreep.warriorProperties);
    Game.spawns['Spawn1'].spawnCreep( creepProperties, roleCreep + (Game.time), { memory: { role: roleCreep, level: 1 } } );
    sayHowMuchCreeps(Game.creeps, creepsMap);
};

var defineCreepToCreate = function () {
    var gameSize = 1;
    
    if ( Game.gcl.level === 1 && Game.spawns['Spawn1'].energyCapacity === 300 && _.size(Game.creeps) < 6) {
        if (countCreeps(Game.creeps, 'harvester') < 2) { 
            return 'harvester';
        } else {
            return 'builder'; 
        }
    
        if (((26 * Game.gcl.level) > _.size(Game.creeps)) && (_.size(Game.creeps) >= 13)) {
            gameSize = 1 + Game.gcl.level;
        } else if (((39 * Game.gcl.level) > _.size(Game.creeps)) && (_.size(Game.creeps) >= 26)) {
            gameSize = 2 + Game.gcl.level;
        } else if (((52 * Game.gcl.level) > _.size(Game.creeps)) && (_.size(Game.creeps) >= 39)) {
            gameSize = 3 + Game.gcl.level;
        } else if (((65 * Game.gcl.level) > _.size(Game.creeps)) && (_.size(Game.creeps) >= 52)) {
            gameSize = 4 + Game.gcl.level;
        }  else {
            gameSize = 1;
        }
        if (countCreeps(Game.creeps, 'harvester') < ((Game.gcl.level + 2) * gameSize)) { return 'harvester';}
        if (countCreeps(Game.creeps, 'builder') < ((Game.gcl.level * 4) * gameSize)) { return 'builder';}
        if (countCreeps(Game.creeps, 'upgrader') < ((Game.gcl.level * 4) * gameSize)) { return 'upgrader';}
        if (countCreeps(Game.creeps, 'maintenance') < ((Game.gcl.level + 1) * gameSize)) { return 'maintenance';}
        // if (creepsMap.get('warrior') <= (phase - 1) && Game.gcl.level < 4) {return 'warrior';}    
        // }
    }
    
}

module.exports =  createCreeps;