"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.CompleteConditions = exports.Task = exports.Step = void 0;
var Step = /** @class */ (function () {
    function Step() {
    }
    Step.prototype.is_complete = function () {
        if (!this.until_func)
            return true;
        return CompleteConditions[this.until_func].apply(CompleteConditions, __spreadArray([this], this.until_args));
    };
    Step.prototype.load = function (obj) {
        for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
            var key = _a[_i];
            this[key] = obj[key];
        }
    };
    return Step;
}());
exports.Step = Step;
var Task = /** @class */ (function () {
    function Task(steps) {
        this.steps = steps;
    }
    Task.prototype.load = function (obj) {
        for (var _i = 0, _a = obj['steps']; _i < _a.length; _i++) {
            var step = _a[_i];
            var obj_1 = new Step();
            obj_1.load(step);
            this.steps.push(obj_1);
        }
    };
    Task.prototype.run = function () {
        var step = this.steps[0];
        var code;
        if (step.is_complete())
            this.steps.shift();
        if (step.target_id)
            code = this.run_step_with_target(step);
        else if (step.target_pos)
            code = this.run_step_with_position(step);
        return code;
    };
    Task.prototype.is_complete = function () {
        return this.steps.length == 0;
    };
    Task.prototype.contains_target = function (target_id) {
        for (var _i = 0, _a = this.steps; _i < _a.length; _i++) {
            var step = _a[_i];
            if (step.target_id == target_id)
                return true;
        }
        return false;
    };
    Task.prototype.assign_all_steps = function (creep) {
        this.steps.forEach(function (step) { return step.assignee_id = creep.name; });
        return this;
    };
    Task.prototype.run_step_with_target = function (step) {
        var creep = Game.creeps[step.assignee_id];
        var target = Game.getObjectById(step.target_id);
        if (!creep || !target)
            return ERR_INVALID_ARGS;
        return creep[step.func_name](target);
    };
    Task.prototype.run_step_with_position = function (step) {
        var creep = Game.creeps[step.assignee_id];
        if (!creep)
            return ERR_INVALID_ARGS;
        return creep[step.func_name](step.target_pos);
    };
    return Task;
}());
exports.Task = Task;
var CompleteConditions = /** @class */ (function () {
    function CompleteConditions() {
    }
    CompleteConditions.near_target_pos = function (step, range) {
        var assignee = Game.creeps[step.assignee_id];
        return assignee.pos.getRangeTo(step.target_pos) <= range;
    };
    CompleteConditions.near_target_structure = function (step, range) {
        var assignee = Game.creeps[step.assignee_id];
        var target = Game.structures[step.target_id];
        return assignee.pos.getRangeTo(target.pos) <= range;
    };
    CompleteConditions.creep_inventory_full = function (step) {
        var assignee = Game.creeps[step.assignee_id];
        return assignee.store.getFreeCapacity(RESOURCE_ENERGY) == 0;
    };
    CompleteConditions.creep_inventory_empty = function (step) {
        var assignee = Game.creeps[step.assignee_id];
        return assignee.store.getUsedCapacity(RESOURCE_ENERGY) == 0;
    };
    return CompleteConditions;
}());
exports.CompleteConditions = CompleteConditions;
