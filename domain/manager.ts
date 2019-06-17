import $factory, { Record } from "./models/record";
import $exception from "../services/error";
import $recordCreated from "./models/record_created";
import $repository from "./repository";
import $recordUpdated from "./models/record_updated";

const $manager = {
    async create(data: any): Promise<Record> {
        const record = $factory.create(data);

        await $recordCreated.publish(record);

        return record;
    },

    async update(uid: string, data: any): Promise<Record> {
        let record = await $repository.findByUid(uid);

        if (!record) {
            throw $exception.NotFound("Record not found");
        }

        /** @todo: properly map Record */
        delete data._id;
        delete record._id;

        let update = Object.assign({}, record, data);

        await $recordUpdated.publish(record, update);

        return update;
    }
};

export default $manager;
