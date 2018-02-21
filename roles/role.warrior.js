var structureService = require('structureService');
var roleWarrior = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.attacking && creep.carry.energy == 0) {
            creep.memory.attacking = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.attacking && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.attacking = true;
	        creep.say('⚡ attack');
	    }

	    if(creep.memory.attacking) {
	        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
	        let towers = structureService.findTowers();
            if(closestHostile) {
                Game.spawns['Spawn1'].room.controller.activateSafeMode();
                if(creep.rangedAttack(closestHostile) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestHostile, {visualizePathStyle: {stroke: '#ff0000'}});
                }
            } else if (towers) {
                if (towers[0].energy < towers[0].energyCapacity){
                    if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#33cc00'}});
                    }  
                }
            } else {
                creep.moveTo(Game.flags['Flag1'], {visualizePathStyle: {stroke: '#ff0000'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
    	        if (sources.length){
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#e60000'}});
				    }
    	        }
        }
	}
};

module.exports = roleWarrior;