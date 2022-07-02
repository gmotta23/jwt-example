# jwt-service

This project is a simple example of how json web tokens can be used with NodeJS. Its main purpose is to make the user able to refresh his authentication token without needing to login again.

To run it you will need [Docker](https://www.docker.com/) and [Docker-Compose](https://docs.docker.com/compose/) installed in your machine.

Before running it make sure your .env file is set up by running

`
cp .env.example .env
`

For running in dev mode:

`
docker-compose -f docker-compose-dev.yml up
`

For running in test (watch) mode:

`
docker-compose -f docker-compose-test.yml up
`
