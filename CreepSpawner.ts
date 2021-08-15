import Consumer from "./Consumer";
import Event    from "./Event";

export default class CreepConsumer extends Consumer
{
    spawner  : StructureSpawn;
    consumes : string[] = ['spawnCreep']

    constructor(spawner: StructureSpawn)
    {
        super();
        this.spawner = spawner;
    }

    canConsume(event: Event): boolean
    {
        if (!super.canConsume(event)) return false;

        const code = 
            this.spawner.spawnCreep(
                event.details['target'].body,
                event.details['target'].name,
                { dryRun: true }
            );

        return code == OK;
    }

    consume(event: Event): void
    {
        const code = 
        this.spawner.spawnCreep(
            event.details['target'].body,
            event.details['target'].name,
        );
    }
}