import log from './log';

import Producer    from './Producer';
import Consumer    from './Consumer';
import EventBroker from './Broker';

import CreepConsumer   from './CreepConsumer';
import SpawnProducer   from './Spawner';
import UpgradeProducer from './Upgrade';

function createProducers(): Producer[]
{
    let producers = [];

    Object.values(Game.spawns)
        .map(x => new SpawnProducer(x))
        .forEach(x => producers.push(x));

    Object.values(Game.rooms)
        .map(x => new UpgradeProducer(x.controller))
        .forEach(x => producers.push(x));

    return producers;
}

function createConsumers(): Consumer[]
{
    return Object.values(Game.creeps).map(x => new CreepConsumer(x));
}

export function loop()
{
    let broker = new EventBroker(createProducers(), createConsumers());

    broker.tick();
}