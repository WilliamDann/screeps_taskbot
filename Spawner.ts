import Producer from "./Producer";
import Event    from "./Event";

export default class SpawnerProducer extends Producer
{
    spawn       : StructureSpawn; 
       
    expireTicks : number = 25;
    memPath     : string = 'lastSpawnerOrder'

    constructor(spawn: StructureSpawn)
    {
        super();
        this.spawn = spawn;

        if (!this.spawn.room.memory[this.memPath])
            this.spawn.room.memory[this.memPath] = -1;
    }

    private noOrderIssued(): boolean
    {
        return this.spawn.room.memory[this.memPath] == -1;
    }

    private issuedOrderHasExpired() : boolean
    {
        if (this.noOrderIssued()) 
            return true;

        return (Game.time - this.spawn.room.memory[this.memPath]) >= this.expireTicks;
    }

    produce(): Event[]
    {
        if (this.issuedOrderHasExpired())
        {
            this.spawn.room.memory[this.memPath] = Game.time;

            return [ new Event('transfer', { target: this.spawn.id }, Game.time+this.expireTicks) ]
        }
        else
            return [];
    }
}