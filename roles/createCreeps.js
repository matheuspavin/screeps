var creepsMap = new Map();
var phase = 1;
const level1 = {
    builders : 5,
    harvesters : 3,
    upgraders : 2,
    maintenance : 1,
    basicCreep : [WORK, CARRY, MOVE]
}


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
        if (builders <= (5 * Game.gcl.level) && Game.spawns['Spawn1'].energy >= 300) {
           createCreep('builder', builders);
        }
        if (upgraders <= (2 * Game.gcl.level) && Game.spawns['Spawn1'].energy >= 300) {
           createCreep('upgrader', upgraders);
        } 
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

var createCreep = function (roleCreep, quantity) {
    console.log('Spawning one' + roleCreep + '...');
    Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], roleCreep + (Game.time), { memory: { role: roleCreep, level: 1 } } );
    sayHowMuchCreeps(Game.creeps, creepsMap);
};

var defineCreepToCreate () {
    let level = 'level'+Game.gcl.level
    console.log ('we are on phase + ' + phase);
    if (creepsMap.get('harvester') <= (phase - 1) &&  { return 'harvester';}
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