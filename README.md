# DragonStack

A  full-stack  e-commerce site with Java Spring Boot and React for interacting with dragons.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v12
- Java 14 [JDK](https://openjdk.java.net/projects/jdk/14/)
- JavaScript Package Manager [Yarn](https://yarnpkg.com/) v1.22.*
- Java Build Tool [Gradle](https://gradle.org/) v6.5
- [PostgreSQL](https://www.postgresql.org/) v9.6+ installed, here via [Docker](https://hub.docker.com/_/postgres)

### Installing

Make sure an active instance of PostgresSQL is running with default port 5432,
or here we start an instance with Docker:

```bash
docker run --name dragonstack-psql \
    -p 5432:5432 \
    -e POSTGRES_DB=dragonstack \
    -e POSTGRES_PASSWORD=mysecretpassword \
    -d postgres:9.6-alpine
```

For backend, to start a `Spring Boot` server, run:

```bash
cd backend && ./gradlew bootRun
```

For frontend, to use `webpack` to start a dev server, run:

```bash
cd frontend
yarn && yarn start-dev
```

The website can be found on [localhost:8080](http://localhost:8080)

## Running the tests

There is currently no testing on this project.

Simply use `eslint` in frontend folder:

```bash
yarn lint
```

## Built With

- [React](https://reactjs.org/) - a JavaScript library for building user interfaces
- [Spring Boot](https://spring.io/) v2.3.1 - the world's most popular Java framework focusing on speed, simplicity, and productivity.

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details

## Acknowledgments

- Ideas on top of the Udemy course [Master Full-Stack Web Development | Node, SQL, React, & More](https://www.udemy.com/course/full-stack/)
- A quick [outline](doc/OUTLINE.md)
- More potential features can also be found on [Course Challenges](doc/CHALLENGES.md)
- Future tech [stack](doc/INTERESTS.md)
- Special thanks to #vikpe for his amazing template [vikpe/react-webpack-typescript-starter](https://github.com/vikpe/react-webpack-typescript-starter)
