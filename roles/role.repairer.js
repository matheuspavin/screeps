var structureService = require('structureService');
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
        // First work to fortified my walls
	    if(creep.memory.repairing) {
	        var closestDamagedStructure;
	        var closestDamagedWall50 = creep.pos.findClosestByPath(FIND_STRUCTURES, {
	            filter: (structure) => structure.hits < 50000 && structure.structureType == STRUCTURE_WALL
            // filter: (structure) => structure.hits < structure.hitsMax && structure.structureType == STRUCTURE_CONTAINER
            });
            var closestDamagedWall100 = creep.pos.findClosestByPath(FIND_STRUCTURES, {
	            filter: (structure) => structure.hits < 100000 && structure.structureType == STRUCTURE_WALL
            // filter: (structure) => structure.hits < structure.hitsMax && structure.structureType == STRUCTURE_CONTAINER
            });
            var closestDamagedWall300 = creep.pos.findClosestByPath(FIND_STRUCTURES, {
	            filter: (structure) => structure.hits < 300000 && structure.structureType == STRUCTURE_WALL
            // filter: (structure) => structure.hits < structure.hitsMax && structure.structureType == STRUCTURE_CONTAINER
            });
            var closestDamagedTower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
	            filter: (structure) => structure.hits < 3000 && structure.structureType == STRUCTURE_TOWER
            // filter: (structure) => structure.hits < structure.hitsMax && structure.structureType == STRUCTURE_CONTAINER
            });
            if (closestDamagedWall300) {closestDamagedStructure = closestDamagedWall300};
            if (closestDamagedWall100) {closestDamagedStructure = closestDamagedWall100};
            if (closestDamagedWall50) {closestDamagedStructure = closestDamagedWall50};
            if (closestDamagedTower) {closestDamagedStructure = closestDamagedTower};
            
            
            if(closestDamagedStructure) {
                if(creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE)
                creep.moveTo(closestDamagedStructure, {visualizePathStyle: {stroke: '#ffffff'}});
            }  
            
        }
        else {
            let containers = creep.room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                i.store[RESOURCE_ENERGY] > 0
            });
// 	        if (containers.length) {
//                     creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#e60000'}});
// 				    structureService.transferContainerEnergy(containers[0], creep);
// 			} else {
                var sources = creep.room.find(FIND_SOURCES);
    	        if (sources.length){
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#e60000'}});
				    }
    	        }
// 			}
        }
	}
};

module.exports = roleUpgrader;