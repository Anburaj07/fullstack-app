import { Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <DIV>
      <Link to={"/signin"}>
        <Heading as='h3' size='lg'>Sign in</Heading>
      </Link>
      <Link to={"/board"}>
        <Heading as='h3' size='lg'>Board</Heading>
      </Link>
    </DIV>
  );
};

export default Navbar;

const DIV = styled.div`
  display: flex;
  justify-content: space-around;
  background-image: radial-gradient( circle 976px at 51.2% 51%,  rgba(11,27,103,1) 0%, rgba(16,66,157,1) 0%, rgba(11,27,103,1) 17.3%, rgba(11,27,103,1) 58.8%, rgba(11,27,103,1) 71.4%, rgba(16,66,157,1) 100.2%, rgba(187,187,187,1) 100.2% );
  padding: 1%;
`;
