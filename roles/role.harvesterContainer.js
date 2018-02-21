var roleHarvesterContainer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#009999'}});
            }
        }
        else {
           var targets = creep.room.find(FIND_STRUCTURES, 
                {filter: {structureType: STRUCTURE_CONTAINER}});
                
            if(targets.length > 0) {
                targets = sortContainersByLoad(targets);
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#009999'}});
                }
            }
        }
	}
};

var sortContainersByLoad = function (containers) {
    return containers.sort((a, b) => a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY]);
}

module.exports = roleHarvesterContainer;