import { expect } from "chai";
import $nats from "../../src/adapters/nats";
import { Message, Stan, Subscription } from "node-nats-streaming";
import $domain from "../../src/domain";
import { validRecord } from "./query.mocha";

let $conn: Stan;
let $sub: Subscription;

describe("USE CASE: update record", () => {
    it("will emit a valid record_updated event", async () => {
        const PAYLOAD = {
            foo: "bar",
        };

        const EVENT_SCHEMA = ["old_value", "new_value"];

        let record = await validRecord();

        $sub.on("message", (msg: Message) => {
            const eventData = JSON.parse(<string>msg.getData());

            EVENT_SCHEMA.forEach(key => {
                expect(eventData.data).to.haveOwnProperty(key);
            });
        });

        await $domain.update(record.uid, PAYLOAD);
    });
});

/**
 * here be details
 */

before(() => {
    return new Promise(async resolve => {
        $conn = await $nats.connect("update_test");
        $sub = await $conn.subscribe("record_updated");

        resolve();
    });
});

after(async () => {
    $conn.close();
});
