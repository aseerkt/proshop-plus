import 'reflect-metadata';
import 'colors';
import 'dotenv/config';
import express from 'express';
// import helmet from 'helmet';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';

createConnection()
  .then((conn) =>
    console.log(`Connected to Database: ${conn.driver.database}`.yellow.bold)
  )
  .catch((err) => {
    console.error(`Database Connection Failed: ${err.message}`.red);
    process.exit(1);
  });

const app = express();

// app.use(helmet());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use('/', express.static('public'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(
  '/graphql',
  graphqlHTTP(async (req, res) => ({
    schema: await buildSchema({
      resolvers: [__dirname + '/resolvers/**/*.js'],
    }),
    context: { req, res },
    graphiql: true,
  }))
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `GraphQL API is running on http://localhost:${PORT}/graphql`.blue.bold
  )
);
