
export default class CareEvent {
    public caregiverId: string;
    public timestamp: Date;
    public eventType: string; // TODO: Switch to enum

    constructor(caregiverId: string,
                timestamp: Date,
                eventType: string
    ) {
        this.caregiverId = caregiverId;
        this.timestamp = timestamp;
        this.eventType = eventType;
    }
}