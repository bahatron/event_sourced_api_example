import $recordCreated from "../../domain/models/record_created";
import $record from "../../domain/models/record";
import $mongo from "../../adapters/mongo";
import $assertions from "../assertions";

describe("on 'record_created' event", () => {
    it("a database record is created", async () => {
        const event = await $recordCreated.publish($record.create());

        const $db = await $mongo.client();

        /** wait for function to do its job */
        /** @todo: there might be a more elegant way to test this */
        await new Promise(resolve => {
            setTimeout(resolve, 100);
        });

        let dbResponse = await $db.collection("records").findOne({ uid: event.data.uid });

        Object.keys(event.data).forEach(key => {
            $assertions.testObjectProperty(dbResponse, key, event.data);
        });
    });
});
