import React from "react";
import { Text } from "theme-ui";

export const Header = () => {
  return (
    <div>
      <Text
        sx={{
          fontSize: 8,
          fontFamily: "Yellowtail",
          color: "#fa73d9",
          textShadow: "#e0f 0 0 8px",
          textAlign: "center",
        }}
        className="titleText"
      >
        virtual lollipop
      </Text>
      <Text
        sx={{
          fontSize: 3,
          color: "#fa73d9",
          width: "350px",
          textShadow: "#e0f 0 0 8px",
          textAlign: "center",
          margin: "0 auto",
        }}
      >
        because we all know someone who deserves some sugar.
      </Text>
    </div>
  );
};
