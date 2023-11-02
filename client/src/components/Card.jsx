import { Heading, Text } from "@chakra-ui/react";
import React from "react";

const Card = (title) => {
  return (
    <div>
      <Heading as={"h2"} size={"lg"}>
        {title}
      </Heading>
      <Text>subtasks</Text>
    </div>
  );
};

export default Card;

const DIV = styled.div`
  padding: 2%;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: whitesmoke;
`;
