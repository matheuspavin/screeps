var levels = function (lvl) {
    
    const level1 = {
            builders : 5,
            harvesters : 3,
            upgraders : 2,
            maintainers : 1,
            energy: 300,
            maxCreeps : 20,
            basicProperties : [WORK, CARRY, MOVE],
    };
    
    const level2 = {
            builders : level1.builders * lvl,
            harvesters : level1.harvesters * lvl,
            upgraders : level1.upgraders * lvl,
            maintainers : level1.maintainers * lvl,
            maxCreeps : 40,
            energy: 550,
            basicProperties : [WORK, WORK, WORK, CARRY, CARRY, MOVE],
    };
    
    if (lvl = 1) {
        return level1;
    }
        
    if (lvl = 2) {
        return level2;
    }
    
    
    if (lvl > 2 ) {
        return { builders : level2.builders,
                 harvesters : level2.builders,
                 upgraders : level2.upgraders,
                 maintainers : level2.maintainers,
                 maxCreeps : (40 + 2 * lvl),
                 energy: level2.energy + 150,
                 basicProperties : level2.basicProperties.push(WORK, CARRY, MOVE),
        }
    };
};

var getControllerLevel = () => {
    var structures = _.filter(Game.structures, (structure) => structure.structureType == 'controller');
       return structures[0].level;
};
module.exports = {
        levels
};