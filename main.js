"use strict";
exports.__esModule = true;
exports.loop = void 0;
var TaskBuilder_1 = require("./TaskBuilder");
var TaskPool_1 = require("./TaskPool");
// DEBUG
function runOnce(taskPool) {
    if (!Memory['debug'])
        Memory['debug'] = {};
    if (Memory['debug']['ran'])
        return;
    taskPool.add_unassigned(new TaskBuilder_1.TaskBuilder()
        .func('moveTo')
        .target(Game.rooms.sim.controller.id)
        .until('near_target_structure:2')
        .build());
    Memory['debug']['ran'] = true;
}
function log(data) {
    if (typeof data == 'object')
        console.log(JSON.stringify(data));
    else
        console.log(data);
}
function loop() {
    var taskPool = new TaskPool_1.TaskPool();
    taskPool.load(Memory['task_pool']);
    runOnce(taskPool);
    taskPool.assign_tasks();
    taskPool.run();
    Memory['task_pool'] = taskPool;
}
exports.loop = loop;
