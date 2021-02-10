import React from "react";
import { Header } from "./Header";
import { Box, Text } from "theme-ui";
import Lolly from "./Lolly";
import { Link } from "gatsby";

export default ({ pageContext }) => {
  var link = <Link to="/lolly">make your own</Link>;
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
          <div style={{ marginLeft: "40px" }}>
            <Text
              sx={{
                fontSize: 3,
                fontFamily: "Yellowtail",
                color: "white",
                textShadow: "#e0f 0 0 8px",
                textAlign: "center",
              }}
            >
              Your lolly is freezing. Share it with this link:
            </Text>
            <br />
            <Text
              sx={{
                fontSize: 2,
                fontFamily: "Courier New",
                textShadow: "#e0f 0 0 8px",
                textAlign: "center",
                textDecoration: "underline",
                backgroundColor: "#272727",
              }}
            >{`https://virtual-lolly-shariq.netlify.app/lolly/${pageContext.id}`}</Text>
            <br />
            <div
              style={{
                backgroundColor: "#272727",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            >
              <Text
                sx={{
                  fontSize: 5,
                  fontFamily: "Yellowtail",
                  color: "white",
                  textShadow: "#e0f 0 0 8px",
                  marginLeft: "10px",
                }}
              >
                {pageContext.reciever}
              </Text>
              <br />
              <Text
                sx={{
                  fontSize: 4,
                  fontFamily: "Yellowtail",
                  color: "white",
                  textShadow: "#e0f 0 0 8px",
                  marginLeft: "10px",
                }}
              >
                {pageContext.message}
              </Text>
              <br />
              <Text
                sx={{
                  fontSize: 5,
                  fontFamily: "Yellowtail",
                  color: "white",
                  textShadow: "#e0f 0 0 8px",
                  marginLeft: "40px",
                }}
              >
                — {pageContext.sender}
              </Text>
            </div>
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              {`${pageContext.sender} made this virtual lollipop for you. You can `}
              <Link to="/lolly" style={{ color: "#e0f" }}>
                make your own
              </Link>
              {` to send to a friend who deserve some sugary treat which won't rot their teeth...`}
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};
