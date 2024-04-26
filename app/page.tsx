'use client'
import React, { useEffect, useState } from 'react';
import { Box, Text, Center, VStack, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';
import { stamp_ids } from './stampIDs';
import { formatBTCaddress } from './formatBTCaddress';

interface Holder {
  address: string;
  quantity: number;
}

interface HoldersMap {
  [address: string]: {
    [stampId: string]: number;
  };
}

export default function Home() {
  const [allHolders, setAllHolders] = useState<HoldersMap>({});
  const [numberOfHolders, setNumberOfHolders] = useState<number>(0);
  const [totalStamps, setTotalStamps] = useState<number>(0);

  const fetchHolders = async (stamp_id: string) => {
    try {
      const response = await axios.get(`https://stampchain.io/api/stamps?holders=${stamp_id}`);
      return response.data || [];
    } catch (error) {
      console.error(`Failed to fetch holders for stamp ${stamp_id}:`, error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAndAggregate = async () => {
      const promises = stamp_ids.map(id => fetchHolders(id));
      const results = await Promise.all(promises);
      let total = 0;

      setAllHolders(prevState => {
        const newState = { ...prevState };
        results.forEach((holders: Holder[], index) => {
          const stampId = stamp_ids[index];
          holders.forEach(holder => {
            const { address, quantity } = holder;
            if (!newState[address]) {
              newState[address] = { total: 0 }; // Initialize with total key
            }
            newState[address][stampId] = (newState[address][stampId] || 0) + quantity;
            newState[address].total += quantity; // Increment total stamps held by the address
            total += quantity;
          });
        });
        setNumberOfHolders(Object.keys(newState).length);
        setTotalStamps(total);
        return newState;
      });
    };

    fetchAndAggregate();
  }, []);

  const sortedAddresses = Object.keys(allHolders).sort((a, b) => allHolders[b].total - allHolders[a].total);

  const topTenStyle = (index: any) => index < 10 ? { bg: 'yellow.200' } : {};

  return (
    <Box p={5}>
      <Center>
        <VStack spacing={4} width="100vw">
          <Text fontSize="xl" mb={4}>Total number of holders: {numberOfHolders}</Text>
          <Box width="100%" overflowX="auto" m={5}>
            <Table borderRadius={"10"} variant="simple" size="sm" colorScheme="teal" >
              <Thead border={"1px solid limegreen"}>
                <Tr>
                  <Th isNumeric>Address</Th>
                  {stamp_ids.map(id => (
                    <Th key={id} isNumeric>{id}</Th>
                  ))}
                  <Th isNumeric>Total</Th>
                </Tr>
              </Thead>
              <Tbody border={"1px solid limegreen"}>
                {sortedAddresses.map((address, index) => (
                  <Tr key={address} {...topTenStyle(index)} border={"1px solid limegreen"}>
                    <Td>{formatBTCaddress(address)}</Td>
                    {stamp_ids.map(id => (
                      <Td justifyContent={"center"} border={"1px solid limegreen"} key={id} isNumeric>{allHolders[address][id] || 0}</Td>
                    ))}
                    <Td border={"1px solid limegreen"} isNumeric>{allHolders[address].total}</Td>
                  </Tr>
                ))}
                <Tr>
                  <Td colSpan={stamp_ids.length + 1}><strong>Total Stamps Held:</strong></Td>
                  <Td isNumeric>{totalStamps}</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </Center>
    </Box>
  );
}
