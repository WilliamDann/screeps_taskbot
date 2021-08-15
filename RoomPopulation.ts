import Producer from "./Producer";
import Event    from "./Event";

export default class RoomPopulation extends Producer
{
    room : Room; 
       
    expireTicks : number = 100;
    memPath     : string = 'lastCrepSpawnOrder';

    popTarget : number = 3;

    constructor(room: Room)
    {
        super();
        this.room = room;

        if (!this.room.memory[this.memPath])
            this.room.memory[this.memPath] = -1;
    }

    private noOrderIssued(): boolean
    {
        return this.room.memory[this.memPath] == -1;
    }

    private issuedOrderHasExpired() : boolean
    {
        if (this.noOrderIssued()) 
            return true;

        return (Game.time - this.room.memory[this.memPath]) >= this.expireTicks;
    }

    private belowTargetPopulation() : boolean
    {
        const numCreeps = this.room.find(FIND_MY_CREEPS).length;

        return numCreeps < this.popTarget;
    }

    produce(): Event[]
    {
        if (this.issuedOrderHasExpired() && this.belowTargetPopulation())
        {
            this.room.memory[this.memPath] = Game.time;

            return [ new Event('spawnCreep', { target: { body: [WORK, CARRY, MOVE], name: Game.time} }, Game.time+this.expireTicks) ]
        }
        else
            return [];
    }
}