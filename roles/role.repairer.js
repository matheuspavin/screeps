var structures = require('structures');
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	        creep.say('⚡ repair');
	    }

	    if(creep.memory.repairing) {
	        var closestDamagedStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
	            filter: (structure) => structure.hits < 5000 && structure.structureType == STRUCTURE_WALL
            // filter: (structure) => structure.hits < structure.hitsMax
            });
            
            if(closestDamagedStructure) {
                if(creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE)
                creep.moveTo(closestDamagedStructure, {visualizePathStyle: {stroke: '#ffffff'}});
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

module.exports = roleUpgrader;