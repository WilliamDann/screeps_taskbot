import Event from './Event';

export default abstract class Producer
{
    produce() : Event[]
    {
        return [];
    }

    tick()
    {
        return;
    }
}