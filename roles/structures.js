var findContainer = () => {
    var targets = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER );
                    }
            });
    return targets;
    
};

var transferContainerEnergy = function (container, askCreep) {
    var findAndTransferToCreep = container.pos.find(FIND_CREEPS, {
         filter: (creep) => {
                        return (creep.id == askCreep.id );
                    }
    });
}
    container.transfer(findAndTransferToCreep, RESOURCE_ENERGY);


module.exports = {
    findContainer,
    transferContainerEnergy
};