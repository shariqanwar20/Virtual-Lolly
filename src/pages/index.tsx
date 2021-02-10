import React from "react";
import { Header } from "../components/Header";
import Lolly from "../components/Lolly";
import { Button } from "theme-ui";
import { Link } from "gatsby";

export default () => {
  return (
    <div style={{ margin: "40px 0px" }}>
      <Header />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Lolly
          lollyTop="#d52358"
          lollyMiddle="#e95946"
          lollyBottom="#deaa43"
          height="250px"
        />
        <Lolly
          lollyTop="#d52358"
          lollyMiddle="#e95946"
          lollyBottom="#f5c64d"
          height="250px"
        />
        <Lolly
          lollyTop="#d52358"
          lollyMiddle="#e95946"
          lollyBottom="#deaa43"
          height="250px"
        />
        <Lolly
          lollyTop="#d52358"
          lollyMiddle="#e95946"
          lollyBottom="#f5c64d"
          height="250px"
        />
        <Lolly
          lollyTop="#d52358"
          lollyMiddle="#e95946"
          lollyBottom="#deaa43"
          height="250px"
        />
      </div>
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Button
          as={Link}
          to="/lolly"
          variant="secondary"
          sx={{
            boxShadow: "0px 0px 12px",
            borderRadius: "20px",
          }}
        >
          Make a new lolly to send to a friend
        </Button>
      </div>
    </div>
  );
};
