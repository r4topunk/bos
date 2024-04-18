'use client';
import { Avatar, Box, Flex, Link, Text, Button, useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import connectWalletModal from './connectWalletModal';
import { useState } from 'react';
import ConnectWalletModal from './connectWalletModal';



const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);

    return (

        <Flex as="nav" bg={'pink'} padding="4" justifyContent="space-between" alignItems="center">
            <>
                {isOpen && <ConnectWalletModal isOpen={isOpen} onClose={onClose} />}

                <Text fontSize="lg" fontWeight="bold" color={'black'}>
                    BOS DAO
                </Text>
                <Flex gap="4">

                    <Button
                        leftIcon={<Avatar
                            boxSize="2em"
                            size="sm"
                            name="Dan Abrahmov"
                            src="https://bit.ly/dan-abramov"
                        />}
                        border="1px solid"
                        p={5}
                        borderRadius="5px"
                        colorScheme="purple"
                        variant='outline'
                        onClick={() => setIsOpen(true)}

                    >
                        Connect Wallet
                    </Button>

                </Flex>
            </>
        </Flex>
    );
};
export default Navbar;