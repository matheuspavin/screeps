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
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#e60000'}});
            }
        } else {
            let targets = creep.room.find(FIND_STRUCTURES);
	        let container = _.filter(targets, (target) => target.structureType == 'container');
	        if (container.length) {
	             if(creep.harvest(container[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourcecontainers[0], {visualizePathStyle: {stroke: '#e60000'}});
				}
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

module.exports = roleUpgrader;