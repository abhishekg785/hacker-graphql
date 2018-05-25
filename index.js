const { GraphQLServer } = require('graphql-yoga');

const links = [
  {
    id: 'link-0',
    url: 'www.uzumaki.com',
    description: 'This is naruto uzumaki',
  }
]

let idCount = links.length

const resolvers = {
  Query: {
    info: () => 'This is Naruto Shipuddin!',
    feed: () => links,
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log(`server is running on port 4000`));