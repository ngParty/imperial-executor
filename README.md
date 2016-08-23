Imperial Executor
=================

Manage services on remote Swarm mode cluster using simple API.

Why:
- deploy app using CI to cluster
- avoid access to whole cluster from within the CI
- avoid listing all other services

## Start

`docker run -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock -v /etc:/etc ngparty/imperial-executor`

## Create service

`curl -X POST -H "Content-Type: application/json" -d '{"imageName": "nginx", "servicePort": 80}' "http://localhost:8080/services"`

## Inspect Service

`curl "http://localhost:8080/services/${SERVICE_ID}"`

## Remove Service

`curl -X DELETE "http://localhost:8080/services/${SERVICE_ID}"`
