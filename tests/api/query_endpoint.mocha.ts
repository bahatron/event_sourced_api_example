import * as $queryListing from "../use_cases/query.mocha";
import { expect } from "chai";
import $axios from "../../adapters/axios";
import $env from "../../adapters/env";
import $logger from "../../services/logger";

const API_ADDRESS = $env.get("TEST_API_URL", "http://localhost:5001");

describe("fetch record endpoint", () => {
    it("returns a 200 response when if record exists", async () => {
        let record = await $queryListing.validRecord();

        let response = await $axios.get(`${API_ADDRESS}/${record.uid}`);

        expect(response.status).to.equal(200);
    });
});

describe("find records endpoint", () => {
    it("returns a 200 response with an array of records", async () => {
        let records = await $queryListing.validArray();

        let response = await $axios.get(`${API_ADDRESS}?rick=sanchez`);

        expect(Array.isArray(response.data)).to.be.true;
    });

    it("returns a list of records matching the query params", async () => {
        let records = await $queryListing.validArray();

        let response: any[] = (await $axios.get(`${API_ADDRESS}?rick=sanchez`)).data;

        expect(response.length).to.equal(records.length);

        records.forEach(record => {
            let result = response.filter(value => {
                return value.uid === record.uid;
            });

            expect(result.length).to.equal(1);

            expect(result.shift()).to.satisfy((value: any) => {
                return value.uid === record.uid && value.rick === record.rick;
            });
        });
    });
});

/**
 * here be details
 */
