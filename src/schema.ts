// "A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data."

export const typeDefs = `#graphql
  # "Comments in GraphQL strings (such as this one) start with the hash (#) symbol."

  # "[Each] type defines the queryable fields for every  in our data source."
  type Todo {
    id: ID!
    content: String!
    tags: [String]
    complete: Boolean!
  }

  # "The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each."
  # A *bit* like endpoints:
  type Query {
    todos: [Todo]
    todo(id: ID!): Todo
  }
`;
