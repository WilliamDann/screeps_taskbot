import Consumer from "./Consumer";
import Event    from "./Event";

import { behaviors, collect } from "./Behavior";

export default class CreepConsumer extends Consumer
{
    creep    : Creep;
    consumes : string[] = ['transfer', 'upgrade']

    constructor(creep: Creep)
    {
        super();
        this.creep = creep;
    }

    tick()
    {
        if (!this.creep.memory['event'])
            collect(this.creep);
        else
            behaviors[this.creep.memory['event'].eventType](this.creep);
    }

    canConsume(event: Event): boolean
    {
        const creepHasEnergy = this.creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0;
        const creepHasEvent  = this.creep.memory['event'] !== undefined;

        if (!creepHasEnergy || creepHasEvent) 
            return false;

        return super.canConsume(event);
    }

    consume(event: Event): void
    {
        if (!this.canConsume(event)) return;

        this.creep.memory['event'] = event
    }
}