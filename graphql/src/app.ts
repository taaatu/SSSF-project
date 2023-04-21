require('dotenv').config();
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import typeDefs from './api/schemas';
import resolvers from './api/resolvers';
import {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
} from '@apollo/server/plugin/landingPage/default';
import { MyContext } from './interfaces/MyContext';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { shield } from 'graphql-shield';
import { createRateLimitRule } from 'graphql-rate-limit';
const app = express();

(async () => {
  try {
    const rateLimitRule = createRateLimitRule({
      identifyContext: (ctx) => ctx.id,
    });
    const permissions = shield({
      Mutation: {
        login: rateLimitRule({ window: '1s', max: 5 }),
      },
    });
    const schema = applyMiddleware(
      makeExecutableSchema({
        typeDefs,
        resolvers,
      }),
      permissions
    );
    const server = new ApolloServer<MyContext>({
      schema,
      introspection: true,
      plugins: [
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageProductionDefault({
              embed: true as false,
            })
          : ApolloServerPluginLandingPageLocalDefault(),
      ],
      includeStacktraceInErrorResponses: false,
    });
    await server.start();
    app.use('/graphql', express.json(), cors<cors.CorsRequest>());

    // app.use(notFound);
    // app.use(errorHandler);
  } catch (error) {
    console.log(error);
  }
})();

export default app;
