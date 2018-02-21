var findContainer = () => {
    var targets = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER );
                    }
            });
    return targets;
    
};

var findTowers= () => {
    var targets = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER );
                    }
            });
    return targets;
    
};

var transferContainerEnergy = function (container, askCreep) {
    return container.transfer(askCreep, RESOURCE_ENERGY);
}


module.exports = {
    findContainer,
    transferContainerEnergy,
    findTowers
};