# A demo repo to show how can OpenTelemetry can work with redis pub/sub

This is a demo code that was used in RedisConf to show case "how to get end to end visibility with redis pub/sub"

For more details check out the video: https://vimeo.com/545382710


### How to run it?

Spin up the docker-compose (it will run a container for redis server and a jaeger-all-in-one)
Then run: `yarn sub` and `yarn pub`

Now you can send an API call to GET http://localhost:8080/pub?any_query_string=111

Open jaeger at: http://localhost:16686 and you will be able to see the request propagates through redis pub/sub
