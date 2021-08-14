import { TaskPool } from "./TaskPool";

export default function(spawner: StructureSpawn, task_pool: TaskPool)
{
    const creeps = spawner.room.find(FIND_MY_CREEPS);
    
    if (creeps.length == 0)
        return spawner.spawnCreep([WORK, CARRY, MOVE], ''+Game.time);

    // TODO upgrade creep body
    if (task_pool.unassigned.length != 0)
        return spawner.spawnCreep([WORK, CARRY, MOVE], ''+Game.time);
}