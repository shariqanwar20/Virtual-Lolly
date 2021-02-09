import React from "react";
import { Header } from "./Header";
import { Box, Text } from "theme-ui";
import Lolly from "./Lolly";

export default ({ pageContext }) => {
  return (
    <div>
      <Header />
      <div
        style={{
          marginTop: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            width: "95%",
            margin: "0 auto",
          }}
        >
          {/* <Lolly lollyTop="red" lollyMiddle="yellow" lollyBottom="green" /> */}
          <Lolly
            lollyTop={pageContext.lollyTop}
            lollyMiddle={pageContext.lollyMiddle}
            lollyBottom={pageContext.lollyBottom}
          />
          <div>
            <Text>Your lolly is freezing. Share it with this link:</Text>
            <br />
            <Text>{`https://localhost:8888/lolly/${pageContext.id}`}</Text>
            <br />
          </div>
        </Box>
      </div>
    </div>
  );
};
