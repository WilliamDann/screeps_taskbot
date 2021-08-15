export default class Event
{
    eventType : string;
    details   : object;
    
    expires   : number;

    constructor(eventType: string, details: object, expires: number)
    {
        this.eventType = eventType;
        this.details   = details;

        this.expires   = expires
    }
}