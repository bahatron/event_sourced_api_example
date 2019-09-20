import $mongo from "../../src/adapters/mongo";
import { validRecord } from "../use_cases/query.mocha";
import $domain from "../../src/domain";
import $assertions from "../assertions";

describe("on 'record_updated' event", () => {
    it("a database record is updated", async () => {
        const record = await validRecord();
        const update = {
            foo: "bar",
            bar: "baz",
        };

        let result = await $domain.update(record.uid, update);

        const $db = await $mongo.client();

        await new Promise(resolve => {
            setTimeout(resolve, 100);
        });

        let dbResponse = await $db
            .collection("records")
            .findOne({ uid: result.uid });

        Object.keys(result).forEach(key =>
            $assertions.testObjectProperty(dbResponse, key, result)
        );
    });
});
