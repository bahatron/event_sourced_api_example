import nats, { Stan, StanOptions } from "node-nats-streaming";
import $exception from "../services/error";
import $env from "./env";

const NATS_CLUSTER_ID = $env.get("NATS_CLUSER_ID", "test-cluster");
const NATS_URL = $env.get("NATS_URL", "nats://stream:4222");

const NATS_OPTIONS: StanOptions = {
    url: NATS_URL
};

const $nats = {
    async connect(name: string, cluster = NATS_CLUSTER_ID): Promise<Stan> {
        return new Promise((resolve, reject) => {
            const client = nats.connect(cluster, name, NATS_OPTIONS);

            client.on("connect", () => {
                resolve(client);
            });

            setTimeout(() => {
                reject($exception.InternalError("connection timeout"));
            }, 5000);

            client.on("close", () => {
                process.exit(-10);
            });

            client.on("error", err => {
                /** @todo: handle error */
                console.log(err);
                process.exit(-1);
            });
        });
    }
};
export default $nats;
