import React from "react";
import { Box, Flex, Button, Link, Heading } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";

const Header: React.FC = () => {
  return (
    <Box w="full" bg="whitealpha.100" px={4} boxShadow="sm">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        {/* Logo or Title */}
        <Heading variant={"header"}>RadiVIS</Heading>

        {/* Action Buttons */}
        <Flex alignItems={"center"}>
          <Link href="https://github.com/jjmmwon/crc-demo" isExternal>
            <Button
              variant={"layout"}
              leftIcon={<AiFillGithub />}
              p={2}
              m={0}
              size="lg"
            >
              GitHub
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
