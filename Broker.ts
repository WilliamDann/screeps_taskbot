import Producer from "./Producer";
import Consumer from './Consumer';
import Event from "./Event";

export default class EventBroker
{
    private events : Event[];

    producers: Producer[];
    consumers: Consumer[];

    constructor(producers: Producer[], consumers: Consumer[])
    {
        this.producers = producers;
        this.consumers = consumers;

        this.events = [];
    }

    produce()
    {
        for (let producer of this.producers)
            producer.produce().forEach(x => this.events.push(x));
    }

    consume()
    {
        
    }
}