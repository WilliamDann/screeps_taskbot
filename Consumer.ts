import Event from "./Event";

export default abstract class Consumer
{
    consumes: string[] = [];

    canConsume(event: Event): boolean
    {
        return this.consumes.indexOf(event.eventType) != -1;
    }

    consume(event: Event): void
    {
        return;
    }

    tick()
    {
        return;
    }
}