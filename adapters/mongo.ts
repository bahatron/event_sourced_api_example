import { MongoClient, Db, MongoClientOptions } from "mongodb";
import $env from "./env";

const url = $env.get("MONGO_URL", "mongodb://mongo:27017");

const options: MongoClientOptions = {
    useNewUrlParser: true
};

const client: Promise<MongoClient> = new Promise((resolve, reject) => {
    MongoClient.connect(url, options)
        .then(client => {
            resolve(client);
        })
        .catch(err => {
            reject(err);
        });
});

const $mongo = {
    client: async (db: string = "records"): Promise<Db> => {
        return (await client).db(db);
    }
};

export default $mongo;
