var towerController =  function(tower) {
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        
        // If i go further, i will priorize some structures for repair
        var closestContainerDamaged = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax && structure.structureType === STRUCTURE_CONTAINER
        });
        if (closestContainerDamaged) {
            tower.repair(closestContainerDamaged);
        } else {
            tower.repair(closestDamagedStructure);
        }
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
};

module.exports = {
    towerController
}