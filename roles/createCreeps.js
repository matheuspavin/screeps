var levels =  require('levels');


var creepsMap = new Map();
// var lvl = Room;
var gameLevelCreep = levels.levels(Game.gcl.level);

var createCreeps =  {
    run: function(creeps) {
    console.log(Room);
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
        if (Game.spawns['Spawn1'].energy >= gameLevelCreep.energy) {createCreep(defineCreepToCreate());}
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
    console.log('Spawning one ' + roleCreep + '...');
    let creepProperties = (roleCreep != 'warrior' ? gameLevelCreep.basicProperties : gameLevelCreep.warriorProperties);
    Game.spawns['Spawn1'].spawnCreep( creepProperties, roleCreep + (Game.time), { memory: { role: roleCreep, level: 1 } } );
    sayHowMuchCreeps(Game.creeps, creepsMap);
};

var defineCreepToCreate = function () {
    var gameSize = 1;
    // if ((_.size(Game.creeps) % 6) === 0) {
    //     if (Game.gcl.level != 1 && Game.creeps >= 12) {
    //         gameSize = _.size(Game.creeps)
    //         console.log(gameSize);
    //     }
    // }
    
    if (Game.gcl.level === 1 && 12 < _.size(Game.creeps) > 6 ) {
        gameSize = 2;
    } else if (Game.gcl.level === 1 && 18 < _.size(Game.creeps) > 12 ) {
        gameSize = 3;
    } else if (Game.gcl.level === 1 && 24 < _.size(Game.creeps) > 18 ) {
        gameSize = 4;
    } else if (Game.gcl.level === 1 && 30 < _.size(Game.creeps) > 24 ) {
        gameSize = 5;
    } 
    if (countCreeps(Game.creeps, 'harvester') < Game.gcl.level + 2 * gameSize ) { return 'harvester';}
    if (countCreeps(Game.creeps, 'builder') < Game.gcl.level * 4 * gameSize) { return 'builder';}
    if (countCreeps(Game.creeps, 'upgrader') < Game.gcl.level * 4 * gameSize) { return 'upgrader';}
    if (countCreeps(Game.creeps, 'maintenance') < Game.gcl.level + 1 * gameSize) { return 'maintenance';}
    // if (creepsMap.get('warrior') <= (phase - 1) && Game.gcl.level < 4) {return 'warrior';}    
    // }
    
}
module.exports =  createCreeps;