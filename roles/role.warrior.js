var roleWarrior = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.attacking && creep.carry.energy == 0) {
            creep.memory.attacking = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.attacking && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.attacking = true;
	        creep.say('⚡ attack');
	    }

	    if(creep.memory.attacking) {
	        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                if(creep.rangedAttack(closestHostile) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestHostile, {visualizePathStyle: {stroke: '#ff0000'}});
                }
            } else {
               creep.moveTo(Game.flags['Flag1'], {visualizePathStyle: {stroke: '#ff0000'}});
           }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
    	        if (sources.length){
                    if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#e60000'}});
				    }
    	        }
        }
	}
};

module.exports = roleWarrior;