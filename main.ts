import { TaskBuilder } from "./TaskBuilder";
import { TaskPool }    from "./TaskPool";

// DEBUG
function runOnce(taskPool: TaskPool)
{
    if (!Memory['debug']) Memory['debug'] = {}
    if (Memory['debug']['ran']) return;

    taskPool.add_unassigned(
        new TaskBuilder()
            .func('moveTo')
            .target(Game.rooms.sim.controller.id)
            .until('near_target_structure:2')
            .build()
    )
    
    Memory['debug']['ran'] = true;
}

function log(data)
{
    if (typeof data == 'object')
        console.log(JSON.stringify(data))
    else
        console.log(data);
}

export function loop()
{
    let taskPool = new TaskPool();
    taskPool.load(Memory['task_pool']);

    runOnce(taskPool);

    taskPool.assign_tasks();
    taskPool.run();

    Memory['task_pool'] = taskPool;
}