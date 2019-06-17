import express, { Response, Request, NextFunction } from "express";
import $domain from "../domain";
import $logger from "../services/logger";
import { Exception } from "../services/error";
import $env from "../adapters/env";

const PORT = parseInt($env.get("HTTP_API_PORT", "5001"));

const SERVER = express();

SERVER.use(express.json());

SERVER.post("/", async (req, res, next) => {
    try {
        const result = await $domain.create(req.body);

        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
});

SERVER.get("/:uid", async (req, res, next) => {
    try {
        let result = await $domain.findByUid(req.params.uid);

        return res.status(200).json(result);
    } catch (err) {
        next(err);
    }
});

SERVER.get("/", async (req, res, next) => {
    try {
        let result = await $domain.find(req.query);

        return res.status(200).json(result);
    } catch (err) {
        next(err);
    }
});

SERVER.put("/:uid", async (req, res, next) => {
    //
});

SERVER.use((err: Exception, req: Request, res: Response, next: NextFunction) => {
    $logger.dump(err);

    res.status(err.httpCode || 500).json(err.httpCode ? err.message : "Internal Error");
});

SERVER.listen(PORT, () => {
    console.log(`SERVER listening to port ${PORT}`);
});
