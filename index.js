const { GraphQLServer } = require('graphql-yoga');

const { Prisma } = require('prisma-binding');

const Query = require('./src/resolvers/Query');
const Feed = require('./src/resolvers/Feed');
const Mutation = require('./src/resolvers/Mutation');
const AuthPayload = require('./src/resolvers/AuthPayload');
const Subscription = require('./src/resolvers/Subscription');

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  Subscription,
  Feed,
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/abhishek-goswami-hiro-04c8ad/hackernews-node/dev',
      secret: 'secret123',
      debug: true,
    })
  })
});

server.start(() => console.log(`server is running on port 4000`));