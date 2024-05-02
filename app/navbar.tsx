"use client"
import { Avatar, Button, Container, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"
import ConnectWalletModal from "./connectWalletModal"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      bg={"black"}
      color={"#00FF41"}
      textShadow="0 0 1px #00FF41,0 0 1.4px #00FF41,0 0 1.4px #00FF41"
      filter="blur(0.02rem)"
    >
      <Container
        py={8}
        width={"800px"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {isOpen && <ConnectWalletModal isOpen={isOpen} onClose={onClose} />}
        <Text fontSize="xx-large" fontWeight="bold">
          BOS DAO
        </Text>
        <Flex gap="4">
          <Button
            leftIcon={
              <Avatar
                boxSize="2em"
                size="sm"
                name="Dan Abrahmov"
                src="http://localhost:3000/forgot.png"
              />
            }
            _hover={{
              border: "1.4px solid #00FF41",
              boxShadow: "0 0 4px #00FF41,0 0 8px #00FF41,0 0 8px #00FF41",
              textShadow: "0 0 1px #00FF41,0 0 1.4px #00FF41,0 0 1.4px #00FF41",
              filter: "blur(0.02rem)",
            }}
            border="1px solid"
            p={5}
            borderRadius="5px"
            colorScheme="purple"
            variant="outline"
            onClick={() => setIsOpen(true)}
          >
            Connect Wallet
          </Button>
        </Flex>
      </Container>
    </Flex>
  )
}
export default Navbar
