import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import LollyTemplate from "../components/LollyTemplate";
import { Spinner } from "theme-ui";

const GET_LOLLIES = gql`
  query($lollyPath: ID!) {
    getLolly(lollyPath: $lollyPath) {
      id
      sender
      reciever
      message
      lollyTop
      lollyMiddle
      lollyBottom
    }
  }
`;

export default (props) => {
  const refId = props.location.search;
  console.log(refId.slice(4, 25));

  const { loading, error, data } = useQuery(GET_LOLLIES, {
    variables: {
      lollyPath: refId.slice(4, 25),
    },
  });

  if (loading)
    return (
      <div style={{ textAlign: "center" }}>
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div>
        error..
        {console.log(error)}
        {console.log(data)}
      </div>
    );
  return (
    <>
      {console.log(data)}
      <LollyTemplate
        id={refId.slice(4, 25)}
        sender={data.getLolly.sender}
        reciever={data.getLolly.reciever}
        message={data.getLolly.message}
        lollyTop={data.getLolly.lollyTop}
        lollyMiddle={data.getLolly.lollyMiddle}
        lollyBottom={data.getLolly.lollyBottom}
      />
    </>
  );
};
