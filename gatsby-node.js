const path = require("path");

exports.createPages = async function ({ actions, graphql }) {
  const data = await graphql(
    `
      {
        getLollies {
          id
          sender
          reciever
          message
          lollyTop
          lollyMiddle
          lollyBottom
        }
      }
    `
  );
  console.log(data);
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
