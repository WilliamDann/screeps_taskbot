import { Task } from "./Task";

export class TaskPool
{
    tasks      : Task[];
    unassigned : Task[];

    constructor()
    {
        this.tasks      = [];
        this.unassigned = [];
    }

    load(obj: object)
    {
        this.tasks      = this.load_task_list(obj['tasks']);
        this.unassigned = this.load_task_list(obj['unassigned']);
    }

    private load_task_list(list_data: []): Task[]
    {
        let data = [];

        for (let task of list_data)
        {
            let obj = new Task([]);
            obj.load(task);

            data.push(obj);
        }

        return data;
    }

    add_assigned(task: Task)
    {
        this.tasks.push(task);
    }

    add_unassigned(task: Task)
    {
        this.unassigned.push(task);
    }

    run()
    {
        for (let i = 0; i < this.tasks.length; i++)
        {
            const task = this.tasks.pop();
            
            task.run();
            if (!task.is_complete())
                this.tasks.push(task)
        }
    }

    assign_tasks()
    {
        const free_creeps = Object.values(Game.creeps).filter(x => !this.creep_on_top_task(x))

        while (free_creeps.length > 0 && this.unassigned.length > 0)
        {
            const task  = this.unassigned.pop();
            const creep = free_creeps.pop();

            task.assign_all_steps(creep);
            this.tasks.push(task);
        }
    }

    private creep_on_top_task(creep: Creep): boolean
    {
        for (let task of this.tasks)
            if (task.steps[0].assignee_id == creep.name)
                return true;
        return false;
    }
}