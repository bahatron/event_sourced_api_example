import { MongoClient, Db, MongoClientOptions } from "mongodb";
import $env from "./env";

const url = $env.get("MONGO_URL", "mongodb://mongo:27017");

const options: MongoClientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
    client: async (db: string = "test"): Promise<Db> => {
        return (await client).db(db);
    },
};

export default $mongo;
