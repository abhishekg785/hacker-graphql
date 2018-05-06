const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
type Query {
  info: String!
}
`;

const resolvers = {
  Query: {
    info: () => `This is the api of a hacker news clone`
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log(`server is running on port 4000`));