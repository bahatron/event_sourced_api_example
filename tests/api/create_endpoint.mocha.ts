import { expect } from "chai";
import $axios from "../../adapters/axios";
import $nats from "../../adapters/nats";
import $assertions from "../assertions";
import { Message, Stan, Subscription } from "node-nats-streaming";
import $env from "../../adapters/env";
import { AxiosResponse } from "axios";
import { Record } from "../../domain/models/record";

const API_ADDRESS = $env.get("TEST_API_URL", "http://localhost:5001");

describe("create endpoint", () => {
    it("returns a 201 response", async () => {
        const response = await $axios.post(API_ADDRESS);

        expect(response.status).to.equal(201);
    });

    it("the response matches the data in the published event", async () => {
        let response: AxiosResponse<Record>;

        $sub.once("message", (msg: Message) => {
            const eventData = JSON.parse(<string>msg.getData());

            Object.keys(eventData.data).forEach(key =>
                $assertions.testObjectProperty(eventData.data, key, response.data)
            );
        });

        response = await $axios.post(API_ADDRESS);
    });
});

/**
 * here be details
 */

let $conn: Stan;
let $sub: Subscription;

before(() => {
    return new Promise(async resolve => {
        $conn = await $nats.connect("create_listing_endpoint_test");
        $sub = await $conn.subscribe("property_listing_uk_created");

        resolve();
    });
});

after(async () => {
    $conn.close();
});
