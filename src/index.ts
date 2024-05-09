// Roughly following Apollo Server "Get started" tutorial:
// https://www.apollographql.com/docs/apollo-server/getting-started
// and Net Ninja GraphQL Crash Course:
// https://youtube.com/playlist?list=PL4cUxeGkcC9gUxtblNUahcsg0WLxmrK_y&si=rWeSgpMrTCX1h2Ix

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// Note: TypeScript tooling: VS Code auto-imports without the .js extension,
// but it's needed:
import { typeDefs } from "./schema.js";

// Hardcoded placeholder data (this would normally be held in some kind of
// store, e.g. PostgreSQL/another database, etc.)
const todosData = [
  {
    id: "1",
    content: "Hello world",
    tags: ["useful", "important"],
    complete: true,
  },
  { id: "2", content: "foo bar", tags: ["test"], complete: false },
];

// "Resolvers define how to fetch the types defined in your schema."
// i.e. tell GraphQL that when using ("resolving" :¬) the "messages" Query
// (defined in schema.ts), it should be fulfilled using data from the
// hardcoded array above.
const resolvers = {
  Query: {
    todos: () => todosData,
    todo: (_, args) => todosData.find((todo) => todo.id === args.id),
  },
};

// "The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers."
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// "Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests"
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
