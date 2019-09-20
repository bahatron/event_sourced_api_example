import { Record } from "./record";
import $nats from "../../adapters/nats";

export interface RecordCreatedEvent {
    data: Record;
}

const $recordCreatedEvent = {
    /**
     * @todo: should we validate if listing uid is already on stream?
     */
    async publish(listing: Record): Promise<RecordCreatedEvent> {
        const event = factory(listing);

        /** @todo do we care about this result ID? */
        const result = await (await $stream).publish("record_created", JSON.stringify(event));

        return event;
    }
};

export default $recordCreatedEvent;

/**
 * here be details
 */

const $stream = $nats.connect(`record_created_producer_${process.env.SERVER_ID || process.pid}`);

function factory(record: Record): RecordCreatedEvent {
    return {
        data: record
    };
}
