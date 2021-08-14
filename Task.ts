import Loadable from './Loadable';

export class Step implements Loadable
{
    assignee_id : string;
    
    target_id   : string;
    target_pos  : RoomPosition;

    until_func  : string;
    until_args  : any[];

    func_name   : string;

    is_complete(): boolean
    {
        if (!this.until_func)
            return true;
        return CompleteConditions[this.until_func](this, ...this.until_args);
    }

    load(obj: object)
    {
        for (let key of Object.keys(obj))
            this[key] = obj[key];
    }
}

export class Task implements Loadable
{
    steps: Step[];

    constructor(steps: Step[])
    {
        this.steps = steps;
    }

    load(obj: object)
    {
        for (let step of obj['steps'])
        {
            let obj = new Step();
            obj.load(step);
            
            this.steps.push(obj);
        }
    }

    run(): ScreepsReturnCode
    {
        const step = this.steps[0];
        let   code;

        if (step.is_complete())
            this.steps.shift();

        if (step.target_id)
            code = this.run_step_with_target(step);
        else if (step.target_pos)
            code =  this.run_step_with_position(step);

        return code;
    }

    is_complete(): boolean
    {
        return this.steps.length == 0;
    }

    contains_target(target_id: string)
    {
        for (let step of this.steps)
            if (step.target_id == target_id) return true;
        return false;
    }

    assign_all_steps(creep: Creep)
    {
        this.steps.forEach(step => step.assignee_id = creep.name);
        return this;
    }

    private run_step_with_target(step: Step): ScreepsReturnCode
    {
        const creep  = Game.creeps[step.assignee_id];
        const target = Game.getObjectById(step.target_id);

        if (!creep || !target)
            return ERR_INVALID_ARGS;

        return creep[step.func_name](target);
    }

    private run_step_with_position(step: Step): ScreepsReturnCode
    {
        const creep = Game.creeps[step.assignee_id];

        if (!creep)
            return ERR_INVALID_ARGS;

        return creep[step.func_name](step.target_pos);
    }
}

export class CompleteConditions
{
    static near_target_pos(step: Step, range: number): boolean
    {
        const assignee = Game.creeps[step.assignee_id];
    
        return assignee.pos.getRangeTo(step.target_pos) <= range;
    }
    
    static near_target_structure(step: Step, range: number): boolean
    {
        const assignee = Game.creeps[step.assignee_id];
        const target   = Game.structures[step.target_id];

        return assignee.pos.getRangeTo(target.pos) <= range;
    }

    static creep_inventory_full(step: Step): boolean
    {
        const assignee = Game.creeps[step.assignee_id];

        return assignee.store.getFreeCapacity(RESOURCE_ENERGY) == 0;
    }

    static creep_inventory_empty(step: Step): boolean
    {
        const assignee = Game.creeps[step.assignee_id];
        return assignee.store.getUsedCapacity(RESOURCE_ENERGY) == 0;
    }
}