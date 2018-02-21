var structureService = require('structureService');
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
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#e60000'}});
            }
        } else {
           var containers = creep.room.find(FIND_STRUCTURES, 
                {filter: {structureType: STRUCTURE_CONTAINER}});
                
	        if (containers.length) {
	            containers = sortContainersByLoadUpper(containers);
                    creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#e60000'}});
				    structureService.transferContainerEnergy(containers[0], creep);
			} else {
    	        var sources = creep.room.find(FIND_SOURCES);
    	        if (sources.length){
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#e60000'}});
				    }
    	        }
			}
	    }
	}
};


var sortContainersByLoadUpper = function (containers) {
    return containers.sort((a, b) =>  b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);
}


module.exports = roleUpgrader;