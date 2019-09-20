import $nats from "../adapters/nats";
import { Message } from "node-nats-streaming";
import $logger from "../services/logger";
import $mongo from "../adapters/mongo";
import { RecordUpdatedEvent } from "../domain/models/record_updated";

async function main() {
    try {
        const $stream = await $nats.connect("sync_on_update_job");

        const sub = $stream.subscribe("record_updated");

        sub.on("message", async (msg: Message) => {
            const eventData = (JSON.parse(<string>msg.getData()) as RecordUpdatedEvent).data;

            const db = await $mongo.client();

            await db
                .collection("records")
                .updateOne(
                    { uid: eventData.old_value.uid },
                    { $set: eventData.new_value },
                    { upsert: true }
                );

            $logger.dump(`record uid: ${eventData.new_value.uid} successfully updated`);
        });

        $logger.dump("listening to record_updated event");
    } catch (err) {
        console.log(err);
        process.exit(-1);
    }
}

main();
