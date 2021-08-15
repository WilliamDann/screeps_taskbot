import Producer from "./Producer";
import Event    from "./Event";

export default class UpgradeProducer extends Producer
{
    controller  : StructureController;    
    expireTicks : number = 25;

    memPath     : string;

    constructor(controller: StructureController)
    {
        super();
        this.controller = controller;

        if (!this.controller.room.memory[this.memPath])
            this.controller.room.memory[this.memPath] = -1;
    }

    private noOrderIssued(): boolean
    {
        return this.controller.room.memory[this.memPath] == -1;
    }

    private issuedOrderHasExpired() : boolean
    {
        if (this.noOrderIssued()) 
            return true;

        return (Game.time - this.controller.room.memory[this.memPath]) >= this.expireTicks;
    }

    produce(): Event[]
    {
        if (this.issuedOrderHasExpired())
        {
            this.controller.room.memory[this.memPath] = Game.time;

            return [ new Event('upgrade', { target: this.controller.id }, Game.time+this.expireTicks) ]
        }
        else
            return [];
    }
}