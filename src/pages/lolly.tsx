import React, { useState } from "react";
import { Text, Flex, Label, Input, Textarea, Box, Button } from "theme-ui";
import { dark } from "@theme-ui/presets";
import Lolly from "../components/Lolly";
import { Formik } from "formik";

export default () => {
  const [lollyTop, setLollyTop] = useState("#d52358");
  const [lollyMiddle, setLollyMiddle] = useState("#e95946");
  const [lollyBottom, setLollyBottom] = useState("#deaa43");

  return (
    <div style={{ margin: "40px 0px" }}>
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
          <Lolly
            lollyTop={lollyTop}
            lollyMiddle={lollyMiddle}
            lollyBottom={lollyBottom}
          />
          <div className="color-picker-container">
            <input
              type="color"
              value={lollyTop}
              style={{ margin: "30px 0" }}
              className="color-picker"
              onChange={(e) => {
                setLollyTop(e.target.value);
              }}
            />
            <br />
            <input
              type="color"
              value={lollyMiddle}
              className="color-picker"
              style={{ margin: "30px 0" }}
              onChange={(e) => {
                setLollyMiddle(e.target.value);
              }}
            />
            <br />
            <input
              type="color"
              name="lollyBottom"
              id="lollyBottom"
              value={lollyBottom}
              className="color-picker"
              style={{ margin: "30px 0" }}
              onChange={(e) => {
                setLollyBottom(e.target.value);
              }}
            />
          </div>
          <Formik
            initialValues={{ sender: "", message: "", reciever: "" }}
            onSubmit={(values, { resetForm }) => {
              resetForm({
                values: { sender: "", message: "", reciever: "" },
              });
              console.log(values);
            }}
          >
            {({ values, touched, errors, handleChange, handleSubmit }) => (
              <Box
                as="form"
                sx={{
                  marginLeft: "40px",
                  padding: "20px 70px",
                  width: "400px",
                  backgroundColor: "#0c0c0c",
                  borderRadius: "10px",
                }}
              >
                <Label htmlFor="reciever">To</Label>
                <Input name="reciever" mb={3} />
                <Label htmlFor="message">Say Something Nice</Label>
                <Textarea name="message" rows="6" mb={3} />
                <Label htmlFor="sender">From</Label>
                <Input name="sender" mb={3} />
                <div style={{ textAlign: "center", marginTop: "40px" }}>
                  <Button
                    variant="secondary"
                    sx={{
                      boxShadow: "0px 0px 12px",
                      borderRadius: "20px",
                    }}
                  >
                    Freeze this lolly and get a link
                  </Button>
                </div>
              </Box>
            )}
          </Formik>
        </Box>
      </div>
    </div>
  );
};
