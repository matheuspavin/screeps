var structures = require('structures');
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
           var storages = creep.pos.find(FIND_STRUCTURES,
                {filter: {structureType: STRUCTURE_CONTAINER}});
           if(storages > 0) {
                let storage = storages.sort((a, b) => a - b)
                if(creep.withdraw(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage[0], {visualizePathStyle: {stroke: '#ffffff'}});
                } 
            }
        }
	}
};

module.exports = roleUpgrader;