require('dotenv').config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
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
import authenticate from './functions/authenticate';
import uploadApi from '../../upload/src/uploadApi';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
  })
);
app.use(cors<cors.CorsRequest>());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

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
      typeDefs,
      resolvers,
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
    app.use('/api/upload', uploadApi);
    app.use(
      '/graphql',
      expressMiddleware(server, {
        context: async ({ req }) => authenticate(req),
      })
    );

    // app.use(notFound);
    // app.use(errorHandler);
  } catch (error) {
    console.log(error);
  }
})();

export default app;
