# Support Ticket App Backend

### Project Description

> This is the backend api for the support ticket app frontend.

### Getting Started

```
  cd backend && npm install && npm run start
```

Also Include the .env file in the root backend folder, like so.

MONGO_USERNAME=yourusername
MONGO_PASSWORD=yourpassword

### Testing the app

Run `npm run test`

### Formatting the app files with prettier

Run `npm run format`

## Features

1. create ticket api
2. edit ticket api
3. get all ticket api

## Technologies

1: Mongo DB, Mongoose: The no sql database used<br/>
2: Supertest & Jest: For testing the app <br/>
3: Joi: Middle ware for object schema validation<br/>
4: mongodb-memory-server: Spinning up a dummy mongo db server for testing

<br/>

### Using Docker.

To spin up both apps locally, just go into the root of the main project and run a

```
docker-compose build
```

and

```
docker-compose up
```

When all works well view the apps on these links.
make sure ports 3000 and 4000 are free on your local machine.

Frontend : http://localhost:3000/

Backend: http://localhost:4000/
