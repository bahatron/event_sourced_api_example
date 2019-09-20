import { Record } from "./record";
import $nats from "../../adapters/nats";
import $logger from "../../services/logger";

export interface RecordUpdatedEvent {
    data: {
        old_value: Record;
        new_value: Record;
    };
}

const $recordUpdated = {
    async publish(original: Record, updated: Record) {
        let event = factory(original, updated);

        let result = await (await $stream).publish("record_updated", JSON.stringify(event));

        return event;
    }
};
export default $recordUpdated;

/**
 * here be details
 */

const $stream = $nats.connect(`record_updated_producer_${process.env.SERVER_ID || process.pid}`);

function factory(old_value: Record, new_value: Record): RecordUpdatedEvent {
    return {
        data: {
            old_value,
            new_value
        }
    };
}
