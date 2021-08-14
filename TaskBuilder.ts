import { Step, Task } from "./Task";

export class TaskBuilder
{
    private _step  : Step;
    private _steps : Step[];

    constructor() 
    {
        this._step  = new Step();
        this._steps = [];
    }

    target(target_id: string)
    {
        this._step.target_id = target_id;
        return this;
    }

    pos(pos: RoomPosition)
    {
        this._step.target_pos = pos;
        return this;
    }

    func(func_name: string)
    {
        this._step.func_name = func_name
        return this;
    }

    until(until_func: string)
    {
        let func_name   = until_func.split(':')[0];
        let args: any[] = until_func.split(':')[1].split(',');

        for (let i = 0; i < args.length; i++)
        {
            let num = parseInt(args[i])
            if (num != NaN)
                args[i] = num;
        }

        this._step.until_func = func_name;
        this._step.until_args = args;

        return this;
    }

    assign(creep: Creep)
    {
        this._step.assignee_id = creep.name;
        return this;
    }

    assign_all_steps(creep: Creep)
    {
        this._step.assignee_id = creep.id;
        this._steps.forEach(step => step.assignee_id = creep.name);
        return this;
    }

    step()
    {
        this._steps.push(this._step);
        this._step = new Step();

        return this;
    }

    build()
    {
        this.step();
        return new Task(this._steps)
    }
}