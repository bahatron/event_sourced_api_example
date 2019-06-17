import $mongo from "../../adapters/mongo";
import $domain from "../../domain";
import $assertions from "../assertions";
import { expect } from "chai";
import moment = require("moment");
import $logger from "../../services/logger";

const VALID_RECORD = {
    uid: "1234567"
};

const FIND_FIXTURES = [
    {
        uid: "1234567",
        rick: "sanchez"
    },
    {
        uid: "12345678",
        rick: "sanchez"
    },
    {
        uid: "12345679",
        rick: "sanchez"
    },
    {
        uid: "12345670",
        rick: "sanchez"
    }
];

export async function validRecord() {
    await setupFixture(VALID_RECORD);

    return VALID_RECORD;
}

export async function validArray() {
    await setupFixture(FIND_FIXTURES);

    return FIND_FIXTURES;
}

describe("USE CASE: query record", () => {
    describe("with uid", () => {
        it("returns a record if exists", async () => {
            await setupFixture(VALID_RECORD);

            let record = await $domain.findByUid(VALID_RECORD.uid);

            expect(record).to.not.be.null;

            Object.keys(VALID_RECORD).forEach(key =>
                $assertions.testObjectProperty(<any>record, key, VALID_RECORD)
            );
        });
    });
});

/**
 * here be details
 */

async function setupFixture(fixture: any): Promise<void> {
    const $col = (await $mongo.client()).collection("records");

    async function insertRecord(record: any): Promise<void> {
        const result = await $col.findOne(record);

        if (result !== null) {
            await $col.deleteOne(record);
        }

        /** the mongo driver will write to the original object, so we have to copy it beforehand */
        await $col.insertOne(Object.assign({}, record));

        return;
    }

    if (Array.isArray(fixture)) {
        await Promise.all(fixture.map(insertRecord));
    } else {
        await insertRecord(fixture);
    }
}
