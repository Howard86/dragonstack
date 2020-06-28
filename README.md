# DragonStack

A Javascript full-stack monorepo that creates an e-commerce site for interacting with dragons.

## Getting Started

### Prerequisites

- Package Manager [Yarn](https://yarnpkg.com/)

- PostgreSQL version 9.6+ installed, via one of the following
  - [Homebrew](https://formulae.brew.sh/formula/postgresql)
  - [Docker](https://hub.docker.com/_/postgres)

To get started with `homebrew`

```bash
brew service postgresql start
```

```bash
docker run --name dragonstack-psql \
    -p 5432:5432 \
    -e POSTGRES_DB=dragonstack \
    -e POSTGRES_PASSWORD=mysecretpassword \
    -d postgres
```

### Installing

First clone this repository and create a copy of `.env` in `/backend` from `.env.example`. Modify `.env` if needed.

```bash
git clone https://github.com/Howard86/dragonstack.git
cd backend && cp .env.example .env
```

Make sure your PostgreSQL is running, then start backend and frontend services.

For backend, to start a `NestJs` dev server, run:

```bash
cd backend
yarn && yarn start:dev
```

For frontend, to use `webpack` to start a dev server, run:

```bash
cd frontend
yarn && yarn start-dev
```

The website can be found on [localhost:8080](http://localhost:8080)

## Running the tests

There is currently no testing on this project.

Simply use `eslint` in frontend and backend folder:

```bash
yarn lint
```

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Ideas on top of the Udemy course [Master Full-Stack Web Development | Node, SQL, React, & More](https://www.udemy.com/course/full-stack/)
- A quick [outline](doc/OUTLINE.md)
- More potential features can also be found on [Course Challenges](doc/CHALLENGES.md)
- Future tech [stack](doc/INTERESTS.md)
- Special thanks to #vikpe for his amazing template [vikpe/react-webpack-typescript-starter](https://github.com/vikpe/react-webpack-typescript-starter)
