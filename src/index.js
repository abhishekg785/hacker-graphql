const { GraphQLServer } = require('graphql-yoga');

const links = [
  {
    id: 'link-0',
    url: 'www.uzumaki.com',
    description: 'This is naruto uzumaki',
  }
];

const typeDefs = `
type Query {
  info: String!
  feed: [Link!]!
}

type Link {
  id: ID!,
  description: String!,
  url: String!,
}
`;

const resolvers = {
  Query: {
    info: () => 'This is Naruto Shipuddin!',
    feed: () => links,
  },
  Link: {
    id: (root) => root.id,
    description: (root) => root.description,
    url: (root) => root.url,
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log(`server is running on port 4000`));