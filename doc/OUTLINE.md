# Outline

## Current Structure

### Backend - NestJS

- RESTful API server
- [Typescript](https://www.typescriptlang.org/) with Class Decorator
- [JWT](https://jwt.io/) auth and stored in cookies
- OOP with [Angular architecture](https://angular.io/guide/architecture)
- [TypeORM](https://typeorm.io/)

### Frontend - React with Redux

- [Typescript](https://www.typescriptlang.org/)
- [Webpack](https://webpack.js.org/) hot reload
- UI borrowed from [react-bootstrap](https://react-bootstrap.github.io/)
- Slicer with [Redux Toolkit](https://redux-toolkit.js.org/)

### Database - PostgreSQL

- Migration run by [TypeORM](https://typeorm.io/)

## Deprecated Structure

### Node.js

- Account with sessionString Auth
- OOP with SQL function to retrieve data from db (`node-pg`)
- Express server with web API to provide necessary info for frontend

### PostgreSQL

- Installed within `brew services`
- Initialization with `bash` scripts
- Basic schema

### React.js

- Basic styling with `bootstrap` and `react-bootstrap`
- Class Component
- Custom `redux` store
- Auth with cookies
- Parcel to bundle
