"use strict";
exports.__esModule = true;
function default_1(spawner, task_pool) {
    var creeps = spawner.room.find(FIND_MY_CREEPS);
    if (creeps.length == 0)
        return spawner.spawnCreep([WORK, CARRY, MOVE], '' + Game.time);
    // TODO upgrade creep body
    if (task_pool.unassigned.length != 0)
        return spawner.spawnCreep([WORK, CARRY, MOVE], '' + Game.time);
}
exports["default"] = default_1;
