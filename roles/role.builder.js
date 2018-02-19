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
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
	        var extension = _.filter(targets, (target) => target.structureType == 'extension');
	         var container = _.filter(targets, (target) => target.structureType == 'container');
	        if(container.length) {
	           buildStructure(container[0], creep);
	        }else if (extension.length) {
                buildStructure(extension[0], creep);
	        }else if(targets.length) {
                buildStructure(targets[0], creep);
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
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