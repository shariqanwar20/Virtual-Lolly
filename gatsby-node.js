const path = require("path");
const faunadb = require("faunadb");
const q = faunadb.query;

require("dotenv").config();

exports.createPages = async function ({ actions, graphql }) {
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
      result.data.forEach((lolly) => {
        actions.createPage({
          path: `lolly/${lolly.ref.id}`,
          component: require.resolve(`./src/components/LollyTemplate.tsx`),
          context: {
            // Data passed to context is available
            // in pageContext props of the template component
            id: lolly.ref.id,
            sender: lolly.data.sender,
            reciever: lolly.data.reciever,
            message: lolly.data.message,
            lollyTop: lolly.data.lollyTop,
            lollyMiddle: lolly.data.lollyMiddle,
            lollyBottom: lolly.data.lollyBottom,
          },
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
  // actions.createPage({
  //     path: `lolly/${lolly.id}`,
  //     component: require.resolve(`./src/templates/dynamic-page.tsx`),
  //     context: {
  //         // Data passed to context is available
  //         // in pageContext props of the template component
  //         name: "Zia",
  //      },
  // });
  // console.log("End of Gatsby Node File");
};
