import { Record } from "./models/record";
import $mongo from "../adapters/mongo";
import { FilterQuery } from "mongodb";
import $logger from "../services/logger";

export type MongoRecord<T> = { _id: string } & T;

const $repository = {
    async findByUid(uid: string): Promise<MongoRecord<Record> | null> {
        const result = await (await $client).collection("records").findOne({ uid });
        
        return result;
    },

    async find(query: FilterQuery<Record>): Promise<MongoRecord<Record>[] | null> {
        let $collection = (await $client).collection("records");

        const result = $collection.find(query);

        return result.toArray();
    }
};

export default $repository;

/**
 * here be details
 */

const $client = $mongo.client();
