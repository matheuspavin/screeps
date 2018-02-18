var levels =  require('levels');


var creepsMap = new Map();
var phase = Game.phase;
var gameLevelCreep = levels(Game.gcl.level);

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
        
        console.log(gameLevelCreep.energy);
        if (gameLevelCreep.energy >= Game.spawns['Spawn1'].energy) {createCreep(defineCreepToCreate());}
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
    console.log('Spawning one' + roleCreep + '...');
    Game.spawns['Spawn1'].spawnCreep( gameLevelCreep.roleCreep, roleCreep + (Game.time), { memory: { role: roleCreep, level: 1 } } );
    sayHowMuchCreeps(Game.creeps, creepsMap);
};

var defineCreepToCreate = function () {
    console.log ('we are on phase + ' + phase);
    if (creepsMap.get('harvester') <= (phase - 1))  { return 'harvester';}
    if (creepsMap.get('builder') <= (phase)) {return 'builder';}
    if (creepsMap.get('upgrader') <= (phase)) {
        if (phase === 1) {
            phase ++;
        }
        return 'upgrader';
    }
    if (creepsMap.get('maintenance') <= (phase - 2)) {
        phase ++;
        return ('maintenance');        
    }
    
    // if (creepsMap.get('warrior') <= (phase - 1) && Game.gcl.level < 4) {return 'warrior';}    
    // }
    
}
module.exports =  createCreeps;