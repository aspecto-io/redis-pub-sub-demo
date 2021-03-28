import init from "./tracer";
import opentelemetry, { context, setSpan, propagation } from '@opentelemetry/api';
const otel = init('publisher');
import *  as express from "express";
const app = express();
import * as Redis from "ioredis";
const redis = new Redis({
});

app.get('/pub', async (req, res) => {
    const expressSpan = otel.startSpan('HTTP /pub',);

    const redisSpan = otel.startSpan('publish redis message', {}, setSpan(context.active(), expressSpan));
    const traceId = expressSpan.context().traceId;
    let payload = { data: req.query, traceId }

    propagation.inject(setSpan(context.active(), redisSpan), payload);

    await redis.publish("best-channel-ever", JSON.stringify(payload))
    redisSpan.end();

    res.json(payload);
    console.log('published', { traceId });

    expressSpan.end();
})


app.listen(8080);

console.log('publisher is ready!')