export const behaviors =
{
    'collect': collect,
    'upgrade': upgrade,
    'transfer': transfer
};

export function collect(creep: Creep)
{
    if (!creep.memory['target'])
        creep.memory['target'] = creep.room.find(FIND_SOURCES_ACTIVE)
        .filter(x => creep.pos.getRangeTo(x))[0].id;

    const target : Source = Game.getObjectById(creep.memory['target']);
    
    const code = creep.harvest(target);
    if (code == ERR_NOT_IN_RANGE)
        creep.moveTo(target);
}

export function upgrade(creep: Creep)
{
    if (!creep.memory['event']) return;

    const target = Game.getObjectById(creep.memory['event'].details.target) as any;
    
    const code = creep.upgradeController(target);
    if (code == ERR_NOT_IN_RANGE)
        creep.moveTo(target);
    if (code == ERR_NOT_ENOUGH_RESOURCES)
        delete creep.memory['event'];
}


export function transfer(creep: Creep)
{
    if (!creep.memory['event']) return;

    const target = Game.getObjectById(creep.memory['event'].details.target) as any;
    
    const code = creep.transfer(target, RESOURCE_ENERGY);
    if (code == ERR_NOT_IN_RANGE)
        creep.moveTo(target);
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) != 0)
        delete creep.memory['event'];

}