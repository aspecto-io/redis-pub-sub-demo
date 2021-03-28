import opentelemetry, { context, setSpan, propagation } from '@opentelemetry/api';
import init from "./tracer";
const otel = init('consumer');
import * as Redis from "ioredis";
const redis = new Redis({
});
redis.on('message', (channel, message) => {
    const consume = otel.startSpan('consume redis message!', {attributes:{channel, message}});

    console.log('message', { channel, message, traceId: consume.context().traceId })

    consume.end();
})
redis.subscribe('best-channel-ever', (err, number) => {

})

console.log('redis subscriber is ready!!');