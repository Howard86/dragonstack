# DragonStack

A full-stack e-commerce site with Java Spring Boot and Next.js to interact with dragons.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) `v12.13.*`
- Java `14` [JDK](https://openjdk.java.net/projects/jdk/14/)
- JavaScript Package Manager [Yarn](https://yarnpkg.com/) `v1.22.*`
- Java Build Tool [Gradle](https://gradle.org/) `v6.5`
- [PostgreSQL](https://www.postgresql.org/) `v9.6+` installed, here via [Docker](https://hub.docker.com/_/postgres)

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

For api server, to start a `Spring Boot` RESTful APIs service, run:

```bash
cd backend && ./gradlew bootRun
```

For website, to start a dev server with hot-reload, run:

```bash
cd frontend
yarn && yarn dev
```

Otherwise, to start a production SSR website, first build sites with [webpack](https://webpack.js.org) then start an [express](https://expressjs.com) server to render the page, more details on [Next.js](https://nextjs.org) - an opinionated react framework.

```bash
cd frontend
yarn && yarn build && yarn start
```

The website can be found on [localhost:8080](http://localhost:8080)

## Running the tests

There is currently no testing on this project.

Currently using [eslint](https://eslint.org/), [prettier](https://prettier.io/) and [typescript](https://www.typescriptlang.org/) to improve code quality for frontend development.

With [husky](https://github.com/typicode/husky)'s git hooks helper and [lint-stage](https://github.com/okonet/lint-staged) linter helper, we automatically run `prettier` and `eslint` before commits, and do a type-check with `typescript` before pushing commits.

To manually start the check, run

```bash
yarn format && yarn lint && yarn type-check
```

## Built With

- [Next.js](https://reactjs.org/) v9.4.4 - Production grade [React](https://reactjs.org/) applications that scale. The world’s leading companies use `Next.js` by [Vercel](https://vercel.com/) to build static and dynamic websites and web applications.
- [Spring Boot](https://spring.io/) v2.3.1 - the world's most popular Java framework focusing on speed, simplicity, and productivity.

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details

## Acknowledgments

- Ideas on top of the Udemy course [Master Full-Stack Web Development | Node, SQL, React, & More](https://www.udemy.com/course/full-stack/)
- A quick [outline](doc/OUTLINE.md)
- More potential features can also be found on [Course Challenges](doc/CHALLENGES.md)
- Future tech [stack](doc/INTERESTS.md)
- Special thanks to #vikpe for his amazing template [vikpe/react-webpack-typescript-starter](https://github.com/vikpe/react-webpack-typescript-starter)
