var roleHarvesterContainer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
	    if(creep.carry.energy < creep.carryCapacity) {
            let sourceToMine = 0;
            let sources = creep.room.find(FIND_SOURCES);
            let quantity = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterContainer');
            quantity.indexOf(creep) < (quantity.length / 2) ? sourceToMine = 1 : sourceToMine = 0;
            if(creep.harvest(sources[sourceToMine]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[sourceToMine], {visualizePathStyle: {stroke: '#009999'}});
            }
        }
        else {
           var targets = creep.room.find(FIND_STRUCTURES, 
                {filter: {structureType: STRUCTURE_CONTAINER}});
                
            if(targets.length > 0) {
                targets = sortContainersByLoad(targets);
                if(creep.transfer(targets[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[1], {visualizePathStyle: {stroke: '#009999'}});
                }
            }
        }
	}
};

var sortContainersByLoad = function (containers) {
    return containers.sort((a, b) => a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY]);
}

module.exports = roleHarvesterContainer;