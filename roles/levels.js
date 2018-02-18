var level = function (lvl) {
    
    const level1 = {
            builders : 5,
            harvesters : 3,
            upgraders : 2,
            maintainers : 1,
            harvester : [WORK, CARRY, MOVE],
            builder : [WORK, CARRY, MOVE],
            upgrader : [WORK, CARRY, MOVE],
            maintainer : [WORK, CARRY, MOVE]
    };
    
    const level2 = {
            builders : level1.builders * lvl,
            harvesters : level1.harvesters * lvl,
            upgraders : level1.upgraders * lvl,
            maintainers : level1.maintainers * lvl,
            harvester : [WORK, WORK, WORK, CARRY, CARRY, MOVE],
            builder : [WORK, WORK, WORK, CARRY, CARRY, MOVE],
            upgrader : [WORK, WORK, WORK, CARRY, CARRY, MOVE],
            maintainer : [WORK, WORK, WORK, CARRY, CARRY, MOVE]
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
                 harvester : level2.harvester.push(WORK, CARRY, MOVE),
                 builder : level2.builder.push(WORK, CARRY, MOVE),
                 upgrader : level2.upgrader.push(WORK, CARRY, MOVE),
                 maintainer : level2.maintainer.push(WORK, CARRY, MOVE)
        }
    };
}
module.exports = {
        level
};