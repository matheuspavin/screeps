var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWarrior = require('role.warrior');
var roleHarvesterContainer = require('role.harvesterContainer');
var roleCreateCreeps = require('createCreeps');
var towerService = require('towerService');
var structureService = require('structureService');

module.exports.loop = function () {
    roleCreateCreeps.run(Game.creeps);
    
    
    //TODO'S
    //Think in a way to find the best resource, as opposed to going by the number of the array
    //Make some rules, to the repairer, divide his job, unlike going all the way to the full hits
    //Make the creeps walk in the 'path', after all the roads are done
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'harvesterContainer') {
            roleHarvesterContainer.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'warrior') {
            roleWarrior.run(creep);
        }
    }
    
    let towers = structureService.findTowers();
    for (let tower of towers) {
        towerService.towerController(tower);
    }
}