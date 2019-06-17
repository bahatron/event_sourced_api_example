import { expect } from "chai";
import $nats from "../../adapters/nats";
import { Message, Stan, Subscription } from "node-nats-streaming";
import $domain from "../../domain";
import { RecordCreatedEvent } from "../../domain/models/record_created";

let $conn: Stan;
let $sub: Subscription;

describe("USE CASE: create record", async () => {
    const EVENT_KEYS = ["data"];
    const LISTING_KEYS = ["uid", "created_at"];

    it("emits a 'record_created' event in the stream", async () => {
        $sub.once("message", (msg: Message) => {
            let eventData: RecordCreatedEvent = JSON.parse(<string>msg.getData());

            expect(eventData).to.have.all.keys(...EVENT_KEYS);

            expect(eventData.data).to.have.all.keys(...LISTING_KEYS);
        });

        await $domain.create({});
    });
});

/**
 * here be details
 */

before(() => {
    return new Promise(async resolve => {
        $conn = await $nats.connect("create_test");
        $sub = await $conn.subscribe("record_created");

        resolve();
    });
});

after(async () => {
    $conn.close();
});
