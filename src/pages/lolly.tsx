import React, { useState } from "react";
import { Label, Input, Textarea, Box, Button } from "theme-ui";
import Lolly from "../components/Lolly";
import { Formik } from "formik";
import { Header } from "../components/Header";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
const CREATE_LOLLY = gql`
  mutation(
    $sender: String!
    $reciever: String!
    $message: String!
    $lollyTop: String!
    $lollyMiddle: String!
    $lollyBottom: String!
  ) {
    createLolly(
      sender: $sender
      reciever: $reciever
      message: $message
      lollyTop: $lollyTop
      lollyMiddle: $lollyMiddle
      lollyBottom: $lollyBottom
    ) {
      message
    }
  }
`;

export default () => {
  const [lollyTop, setLollyTop] = useState("#d52358");
  const [lollyMiddle, setLollyMiddle] = useState("#e95946");
  const [lollyBottom, setLollyBottom] = useState("#deaa43");

  const [createLolly] = useMutation(CREATE_LOLLY);
  const addLolly = (
    sender: string,
    reciever: string,
    message: string,
    lollyTop: string,
    lollyMiddle: string,
    lollyBottom: string
  ) => {
    createLolly({
      variables: {
        sender,
        reciever,
        message,
        lollyTop,
        lollyMiddle,
        lollyBottom,
      },
    });
  };
  return (
    <div style={{ margin: "40px 0px" }}>
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
              addLolly(
                values.sender,
                values.reciever,
                values.message,
                lollyTop,
                lollyMiddle,
                lollyBottom
              );
            }}
          >
            {({ values, touched, errors, handleChange, handleSubmit }) => (
              <Box
                as="form"
                sx={{
                  margin: "0px 30px",
                  padding: "20px 70px",
                  width: "500px",
                  backgroundColor: "#0c0c0c",
                  borderRadius: "10px",
                }}
                onSubmit={handleSubmit}
              >
                <Label htmlFor="reciever">To</Label>
                <Input
                  name="reciever"
                  mb={3}
                  value={values.reciever}
                  onChange={handleChange}
                />
                {touched.reciever && errors.reciever ? (
                  <p
                    style={{
                      fontSize: "15px",
                      color: "red",
                      textAlign: "center",
                    }}
                  >
                    {errors.reciever}
                  </p>
                ) : null}
                <Label htmlFor="message">Say Something Nice</Label>
                <Textarea
                  name="message"
                  rows="6"
                  mb={3}
                  value={values.message}
                  onChange={handleChange}
                />
                <Label htmlFor="sender">From</Label>
                <Input
                  name="sender"
                  mb={3}
                  value={values.sender}
                  onChange={handleChange}
                />
                {touched.sender && errors.sender ? (
                  <p
                    style={{
                      fontSize: "15px",
                      color: "red",
                      textAlign: "center",
                    }}
                  >
                    {errors.sender}
                  </p>
                ) : null}
                <div style={{ textAlign: "center", marginTop: "40px" }}>
                  <Button
                    variant="secondary"
                    type="submit"
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
