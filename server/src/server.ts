import 'reflect-metadata';
import 'colors';
import 'dotenv/config';
import express from 'express';
// import helmet from 'helmet';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createProductLoader } from './utils/createProductLoader';
import { createUserLoader } from './utils/createUserLoader';
import { __prod__ } from './constants';

const main = async () => {
  await createConnection();

  const app = express();

  // app.use(helmet());

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.get('/', (_req, res) => res.send('ProShop Server LoL'));

  app.use('/', express.static('public'));
  // app.use(express.urlencoded({ extended: true }));
  // app.use(express.json());

  app.use(
    '/graphql',
    cookieParser(),
    graphqlHTTP(async (req, res) => ({
      schema: await buildSchema({
        resolvers: [__dirname + '/resolvers/**/*.js'],
      }),
      context: {
        req,
        res,
        pdtLoader: createProductLoader(),
        userLoader: createUserLoader(),
      },
      graphiql: !__prod__,
    }))
  );

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () =>
    console.log(
      `GraphQL API is running on http://localhost:${PORT}/graphql`.blue.bold
    )
  );
};

main().catch((err) => {
  console.error(`Root Error: `.bgRed.bold, err);
});
