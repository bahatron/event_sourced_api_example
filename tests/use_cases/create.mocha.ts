import { expect } from "chai";
import $nats from "../../src/adapters/nats";
import { Message, Stan, Subscription } from "node-nats-streaming";
import $domain from "../../src/domain";
import { RecordCreatedEvent } from "../../src/domain/models/record_created";

let $conn: Stan;
let $sub: Subscription;

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

describe("USE CASE: create record", async () => {
    const EVENT_KEYS = ["data"];
    const LISTING_KEYS = ["uid", "created_at"];

    it("emits a 'record_created' event in the stream", async () => {
        return new Promise(async resolve => {
            $sub.once("message", (msg: Message) => {
                let eventData: RecordCreatedEvent = JSON.parse(<string>(
                    msg.getData()
                ));

                expect(eventData).to.have.all.keys(...EVENT_KEYS);

                expect(eventData.data).to.have.all.keys(...LISTING_KEYS);

                resolve();
            });

            await $domain.create({});
        });
    });
});
