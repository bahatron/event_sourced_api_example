import $nats from "../adapters/nats";
import { Message } from "node-nats-streaming";
import $logger from "../services/logger";
import $mongo from "../adapters/mongo";
import { RecordCreatedEvent } from "../domain/models/record_created";

async function main() {
    try {
        const $stream = await $nats.connect("sync_on_create_job");

        const sub = $stream.subscribe("record_created");

        sub.on("message", async (msg: Message) => {
            const record = (JSON.parse(<string>msg.getData()) as RecordCreatedEvent).data;

            const db = await $mongo.client();

            await db.collection("records").insertOne(record);

            $logger.dump(`record uid: ${record.uid} successfully inserted`);
        });

        $logger.dump("listening to record_created event");
    } catch (err) {
        console.log(err);
        process.exit(-1);
    }
}

main();
