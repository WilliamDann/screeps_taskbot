import Producer from "./Producer";
import Consumer from './Consumer';
import Event    from "./Event";
import log from "./log";

export default class EventBroker
{
    private events : Event[];

    producers: Producer[];
    consumers: Consumer[];

    constructor(producers: Producer[], consumers: Consumer[])
    {
        this.producers = producers;
        this.consumers = consumers;
    }

    tick()
    {
        if (!Memory['eventBroker'])
            Memory['eventBroker'] = [];

        this.events = Memory['eventBroker'];

        this.produce();
        this.consume();

        log(this.events)
        
        Memory['eventBroker'] = this.events;
    }

    produce()
    {
        for (let producer of this.producers)
        {
            producer.tick();
            producer.produce().forEach(x => this.events.push(x) );
        }
    }

    consume()
    {
        for (let consumer of this.consumers)
        {
            consumer.tick();
            let event = this.events.pop();
            if (!event) return;
        
            if (consumer.canConsume(event))
                consumer.consume(event);
            else
                this.events.push(event)
        }
    }
}