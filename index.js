const { GraphQLServer } = require('graphql-yoga');

const { Prisma } = require('prisma-binding');

const resolvers = {
  Query: {
    info: () => 'This is Naruto Shipuddin!',
    feed: (root, args, context, info) => {
      return context.db.query.links({}, info)
    },
  },
  Mutation: {
    post: (root, args, context, info) => {
      return context.db.mutation.createLink({
        data: {
          url: args.url,
          description: args.description,
        },
      }, info);
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/public-denimcloud-983/hackernews-node/dev',
      secret: 'this is my secret',
      debug: true,
    })
  })
});

server.start(() => console.log(`server is running on port 4000`));