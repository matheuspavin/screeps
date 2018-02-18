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
	        console.log(extension.length);
            if(targets.length) {
                if (extension.length) {
                    if(creep.build(extension[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(extension[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    console.log('entrou');
                    console.log(targets[0].structureType)
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
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

module.exports = roleBuilder;