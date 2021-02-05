import { Box, Container, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <Flex p={4} bg="#38B2AC" justifyContent="space-between">
      <Flex w={"auto"} bg="#0987A0" borderRadius={5}>
        <Container>
          <NextLink href="/">
            <Link placeItems="center">Home</Link>
          </NextLink>
        </Container>
      </Flex>
      <Flex>
        <Flex float="right" alignItems="end">
          <Container mr={4} bg="#0987A0" borderRadius={5}>
            <NextLink href="/login">
              <Link placeItems="center">Login</Link>
            </NextLink>
          </Container>
          <Container mr={4} bg="#0987A0" borderRadius={5}>
            <NextLink href="/register">
              <Link ml={"auto"}>Register</Link>
            </NextLink>
          </Container>
        </Flex>
      </Flex>
    </Flex>
  );
};
