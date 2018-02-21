
var levelService =  require('levelService');
var gameLevelCreep = levelService.levels(levelService.getControllerLevel());
var creepsMap = new Map();

//It's a basic controller of creation
var defineCreepToCreate = function () {
    var gameSize = 1;
    
    //this way I do not create a crowd, around the only starting resource.
    if ( levelService.getControllerLevel() === 1 && Game.spawns['Spawn1'].energyCapacity === 300 && _.size(Game.creeps) < 8) {
        if (countCreeps(Game.creeps, 'harvester') <= 1) { 
            return 'harvester';
        } else if (countCreeps(Game.creeps, 'upgrader') <= 1) {
            return 'upgrader';
        }else {
            return 'builder'; 
        }
    } else {
        // Continue to create (first round)
        if (countCreeps(Game.creeps, 'harvester') < 1) { return 'harvester';}
        if (countCreeps(Game.creeps, 'harvesterContainer') < 1) { return 'harvesterContainer';}
        if (countCreeps(Game.creeps, 'upgrader') < 1) { return 'upgrader';}
        if (countCreeps(Game.creeps, 'builder') < 1) { return 'builder';}
        if (countCreeps(Game.creeps, 'repairer') < 1) { return 'repairer';}
        if (countCreeps(Game.creeps, 'warrior') < 1) { return 'warrior';}
        
        // Continue to create (second round)
        if (countCreeps(Game.creeps, 'harvester') < 2) { return 'harvester';}
        if (countCreeps(Game.creeps, 'harvesterContainer') < 2) { return 'harvesterContainer';}
        if (countCreeps(Game.creeps, 'upgrader') < 2) { return 'upgrader';}
        if (countCreeps(Game.creeps, 'builder') < 1) { return 'builder';}
        if (countCreeps(Game.creeps, 'repairer') < 1) { return 'repairer';}
        if (countCreeps(Game.creeps, 'warrior') < 1) { return 'warrior';}

        
        // Continue to create (third round)
        if (countCreeps(Game.creeps, 'harvester') < 3) { return 'harvester';}
        if (countCreeps(Game.creeps, 'harvesterContainer') < 3) { return 'harvesterContainer';}
        if (countCreeps(Game.creeps, 'upgrader') < 3) { return 'upgrader';}
        if (countCreeps(Game.creeps, 'builder') < 2) { return 'builder';}
        if (countCreeps(Game.creeps, 'repairer') < 1) { return 'repairer';}
        if (countCreeps(Game.creeps, 'warrior') < 2) { return 'warrior';}
        
        // Continue to create (fourth round)
        if (countCreeps(Game.creeps, 'harvester') < 3) { return 'harvester';}
        if (countCreeps(Game.creeps, 'harvesterContainer') < 4) { return 'harvesterContainer';}
        if (countCreeps(Game.creeps, 'upgrader') < 4) { return 'upgrader';}
        if (countCreeps(Game.creeps, 'builder') < 2) { return 'builder';}
        if (countCreeps(Game.creeps, 'repairer') < 1) { return 'repairer';}
        if (countCreeps(Game.creeps, 'warrior') < 2) { return 'warrior';}
        
        //Without more CPU i didn't think that i should go further then fourth level.
    }
}

var countCreeps = function (creeps, role) {
    let quantity = _.filter(creeps, (creep) => creep.memory.role == role);
    creepsMap.set(role, quantity.length)
    return quantity.length;
};
module.exports = {
    defineCreepToCreate
};