import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    InputGroup,
    Input,
    InputRightElement,
    VStack,
    Image,
    Center,
    IconButton,
    Text,
    Divider
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useState } from 'react';

interface ConnectWalletModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ConnectWalletModal = ({ isOpen, onClose }: ConnectWalletModalProps) => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay style={{ backdropFilter: 'blur(5px)' }} />
            <ModalContent
                bg="gray.900"
                border="6px solid pink"
                boxShadow="0 0 8px 2px pink"
                zIndex={2000}
                p="20px"
                mx="auto"
                my="150px" // Adjust top and bottom margin
                w="auto"
                maxWidth="400px"
                minH="500px"
            >
                <ModalHeader margin='15px' fontSize="lg" fontWeight="bold" color="whiteAlpha.900" textAlign="center">
                    <Text> BOS WALLET</Text>
                    Connect Wallet (SRC-20)
                </ModalHeader>
                <ModalCloseButton position="absolute" right="8px" top="8px" color="whiteAlpha.800" />
                <ModalBody>
                    <Center mb={4}>
                        <Image
                            src='/bos.png'
                            alt="BOS DAO"
                            width="60%"
                            height="auto"
                        />
                    </Center>
                    <VStack spacing={4}>
                        <InputGroup size="sm">
                            <Input
                                width="100%"
                                height="50px"
                                color="black"
                                type={show ? "text" : "password"}
                                placeholder="Enter password"
                                variant="filled"
                                bg="#FF8F00"
                                border="1px solid white"
                                _hover={{ borderColor: 'white' }}
                                _focus={{ borderColor: 'red' }}
                                sx={{
                                    '::placeholder': {
                                        color: 'black', // Here you can set the color you want for the placeholder text
                                        opacity: 1, // Optional: to ensure full opacity if needed
                                        padding: '10px',
                                    },
                                }}
                            />

                            <InputRightElement width="4.5rem">
                                <IconButton
                                    aria-label={show ? "Hide password" : "Show password"}
                                    h="3rem"
                                    size="sm"
                                    onClick={handleClick}
                                    icon={show ? <FaEyeSlash /> : <FaEye />}
                                />
                            </InputRightElement>
                        </InputGroup>
                        <Button
                            mt={15}
                            width="100%"
                            p={5}
                            border="1px solid pink"
                            boxShadow="0 0 8px 2px pink"
                            colorScheme="orange"
                            onClick={onClose}
                        >
                            Connect
                        </Button>
                        <Button
                            leftIcon={<Image src='/forgot.png' alt="forgot" width="40px" height="auto" />}
                            width="100%"
                            p={5}
                            colorScheme="orange"
                            onClick={onClose}
                        >
                            forgot
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default ConnectWalletModal;
