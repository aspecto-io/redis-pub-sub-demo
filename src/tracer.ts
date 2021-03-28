import opentelemetry,{ diag, DiagConsoleLogger, DiagLogLevel,context } from '@opentelemetry/api';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { NodeTracerProvider } from '@opentelemetry/node';
import { SimpleSpanProcessor } from '@opentelemetry/tracing';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';

export default (serviceName) => {
    const provider = new NodeTracerProvider();
    provider.addSpanProcessor(new SimpleSpanProcessor(new ZipkinExporter({ serviceName })));
    provider.register();
    return opentelemetry.trace.getTracer('redis-pubsub-demo');
};