const faunadb = require("faunadb");
const q = faunadb.query;

require("dotenv").config();

const { ApolloServer, gql } = require("apollo-server-lambda");
//type Query is mandatory in schema
const typeDefs = gql`
  type Query {
    getLollies: [Lolly!]
  }
  type Mutation {
    createLolly(
      sender: String!
      reciever: String!
      message: String!
      lollyTop: String!
      lollyMiddle: String!
      lollyBottom: String!
    ): Lolly
  }

  type Lolly {
    id: ID!
    sender: String!
    reciever: String!
    message: String!
    lollyTop: String!
    lollyMiddle: String!
    lollyBottom: String!
  }
`;

// const authors = [
//   { id: 1, name: 'Terry Pratchett', married: false },
//   { id: 2, name: 'Stephen King', married: true },
//   { id: 3, name: 'JK Rowling', married: false },
// ]

const resolvers = {
  Query: {
    getLollies: async () => {
      try {
        if (process.env.FAUNADB_ADMIN_SECRET) {
          var client = new faunadb.Client({
            secret: process.env.FAUNADB_ADMIN_SECRET,
          });
          const result = await client.query(
            q.Map(
              q.Paginate(q.Match(q.Index("lolly_by_index"))),
              q.Lambda((x) => q.Get(x))
            )
          );
          console.log(result);
          return result.data.map((lolly) => {
            return {
              id: lolly.ref.id,
              sender: lolly.sender,
              reciever: lolly.reciever,
              message: lolly.message,
              lollyTop: lolly.lollyTop,
              lollyMiddle: lolly.lollyMiddle,
              lollyBottom: lolly.lollyBottom,
            };
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    createLolly: async (_, args) => {
      try {
        if (process.env.FAUNADB_ADMIN_SECRET) {
          var client = new faunadb.Client({
            secret: process.env.FAUNADB_ADMIN_SECRET,
          });
          const result = await client.query(
            q.Create(q.Collection("lolly"), {
              data: {
                sender: args.sender,
                reciever: args.reciever,
                message: args.message,
                lollyTop: args.lollyTop,
                lollyMiddle: args.lollyMiddle,
                lollyBottom: args.lollyBottom,
              },
            })
          );
          console.log(result);
          return {
            message: result.data.message,
          };
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler();

module.exports = { handler };
