const faunadb = require("faunadb");
const q = faunadb.query;
const axios = require("axios");
require("dotenv").config();

const { ApolloServer, gql } = require("apollo-server-lambda");
//type Query is mandatory in schema
const typeDefs = gql`
  type Query {
    getLollies: [Lolly!]
    getLolly(lollyPath: ID!): Lolly
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
              sender: lolly.data.sender,
              reciever: lolly.data.reciever,
              message: lolly.data.message,
              lollyTop: lolly.data.lollyTop,
              lollyMiddle: lolly.data.lollyMiddle,
              lollyBottom: lolly.data.lollyBottom,
            };
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    getLolly: async (_, args) => {
      try {
        if (process.env.FAUNADB_ADMIN_SECRET) {
          var client = new faunadb.Client({
            secret: process.env.FAUNADB_ADMIN_SECRET,
          });
          const lolly = await client.query(
            q.Get(q.Ref(q.Collection("lolly"), args.lollyPath))
          );
          // console.log(lolly);

          return {
            id: lolly.ref.id,
            sender: lolly.data.sender,
            reciever: lolly.data.reciever,
            message: lolly.data.message,
            lollyTop: lolly.data.lollyTop,
            lollyMiddle: lolly.data.lollyMiddle,
            lollyBottom: lolly.data.lollyBottom,
          };
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
          axios
            .post(
              "https://api.netlify.com/build_hooks/6023ad6c9a58487438e74ebb"
            )
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.error(error);
            });
          console.log(result);
          return {
            id: result.ref.id,
            sender: result.data.sender,
            reciever: result.data.reciever,
            message: result.data.message,
            lollyTop: result.data.lollyTop,
            lollyMiddle: result.data.lollyMiddle,
            lollyBottom: result.data.lollyBottom,
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
