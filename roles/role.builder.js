var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
	        let extension = _.filter(targets, (target) => target.structureType == 'extension');
	        let container = _.filter(targets, (target) => target.structureType == 'container');
	        if(container.length) {
	           buildStructure(container[0], creep);
	        }else if (extension.length) {
                buildStructure(extension[0], creep);
	        }else if(targets.length) {
                buildStructure(targets[0], creep);
            }
	    }
	    else {
	        let targets = creep.room.find(FIND_STRUCTURES);
	        let container = _.filter(targets, (target) => target.structureType == 'container');
	        if (container.length) {
	             if(creep.harvest(container[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourcecontainers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
				}
			}else {
    	        var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
				}
			}
	    }
	}
};

var buildStructure = function (target, creep) {
    if (creep.build(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
    }
}

module.exports = roleBuilder;