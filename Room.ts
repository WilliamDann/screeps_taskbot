import { TaskBuilder } from "./TaskBuilder";
import { TaskPool } from "./TaskPool";

function manageUpgrades(room: Room, task_pool: TaskPool)
{
    const upgradeTasks = task_pool.tasks.filter(x => x.contains_target(room.controller.id)).length

    if (upgradeTasks == 0)
    {
    }
}

export default function(room: Room, task_pool: TaskPool)
{
    manageUpgrades(room, task_pool);
}