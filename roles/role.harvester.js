var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // I have to use a memory, like the builders, to keep them filling the structures before going to refuel
        //Now i know that set the source by the number in array, is bad, i have to think in a way to atuomatize the selection
        if(creep.memory.transfering && creep.carry.energy == 0) {
            creep.memory.transfering = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.transfering && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.transfering = true;
	        creep.say('🚧 transfer');
	    }
	    
	    if (creep.memory.transfering){
	        var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets) {
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#33cc00'}});
                }
            }
	    } else {
	        let sourceToMine = 0;
            let sources = creep.room.find(FIND_SOURCES);
            // TODO
            //This code was duplicated in harvesterContainer, move it to creepServer
            let quantity = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            quantity.indexOf(creep) < (quantity.length / 2) ? sourceToMine = 1 : sourceToMine = 0;
            if(creep.harvest(sources[sourceToMine]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[sourceToMine], {visualizePathStyle: {stroke: '#33cc00'}});
            }
        }
	}
};

module.exports = roleHarvester;