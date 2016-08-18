Imperial Executor
=================

Manage services on remote Swarm mode cluster using simple API.

Why:
- deploy app using CI to cluster
- avoid access to whole cluster from within the CI
- avoid listing all other services

## Create service

`curl -X POST -H "Content-Type: application/json" -d '{"imageName": "nginx", "servicePort": 80}' "http://localhost:8080/services"`

## Inspect Service

`curl "http://localhost:8080/services/${SERVICE_ID}"`

## Remove Service

`curl -X DELETE "http://localhost:8080/services/${SERVICE_ID}"`
