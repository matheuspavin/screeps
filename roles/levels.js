var levels = function (lvl) {
    console.log(lvl)
    const level1 = {
            builders : 5,
            harvesters : 3,
            upgraders : 2,
            maintainers : 1,
            energy: 300,
            maxCreeps : 10,
            basicProperties : [WORK, CARRY, MOVE],
    };
    
    const level2 = {
            builders : level1.builders * lvl,
            harvesters : level1.harvesters * lvl,
            upgraders : level1.upgraders * lvl,
            maintainers : level1.maintainers * lvl,
            maxCreeps : 20,
            energy: 500,
            basicProperties : [WORK, CARRY, MOVE],
            advancedProperties : [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],
            advancedHarvester : [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
            warrior: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, RANGED_ATTACK]
    };
    
    if (lvl === 1) {
        return level1;
    }
        
    if (lvl === 2) {
        return level2;
    }
    
    
    if (lvl > 2 ) {
        return { builders : level2.builders,
                 harvesters : level2.builders,
                 upgraders : level2.upgraders,
                 maintainers : level2.maintainers,
                 maxCreeps : level2.maxCreeps + (lvl * 4),
                 energy: 600,
                 basicProperties : [WORK, CARRY, MOVE],
                 advancedProperties : [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                 advancedHarvester : [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
                 warrior: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, RANGED_ATTACK]
                //  advancedProperties : level2.advancedProperties.push(WORK, CARRY, MOVE),
                //  advancedHarvester : level2.advancedProperties.push(WORK, MOVE, MOVE),
                //  warrior: level2.warrior.push(MOVE)
        }
    };
};

var getControllerLevel = () => {
    var structures = _.filter(Game.structures, (structure) => structure.structureType == 'controller');
       return structures[0].level;
};
module.exports = {
        levels,
        getControllerLevel
};