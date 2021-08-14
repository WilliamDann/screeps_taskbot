"use strict";
exports.__esModule = true;
var TaskBuilder_1 = require("./TaskBuilder");
function manageUpgrades(room, task_pool) {
    var upgradeTasks = task_pool.tasks.filter(function (x) { return x.contains_target(room.controller.id); }).length;
    if (upgradeTasks == 0) {
        var source = room.find(FIND_SOURCES_ACTIVE)[0];
        var upgradeTask = new TaskBuilder_1.TaskBuilder()
            .func('moveTo')
            .target(source.id)
            .until(TaskBuilder_1.CompleteConditions.near_target_structure(1))
            .step()
            .func('harvest')
            .target(source.id)
            .until(TaskBuilder_1.CompleteConditions.creep_inventory_full())
            .step()
            .func('moveTo')
            .target(room.controller.id)
            .until(TaskBuilder_1.CompleteConditions.near_target_structure(3))
            .step()
            .func('upgradeController')
            .target(room.controller.id)
            .until(TaskBuilder_1.CompleteConditions.creep_inventory_empty())
            .step()
            // TODO get free creep
            // .assignAllSteps()
            .build();
        // TODO commit task
    }
}
function default_1(room, task_pool) {
    manageUpgrades(room, task_pool);
}
exports["default"] = default_1;
