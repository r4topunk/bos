'use client'
import React, { useEffect, useState } from 'react';
import { Box, Text, Center, VStack, Table, Thead, Tbody, Tr, Th, Td, Image } from '@chakra-ui/react';
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
      console.log("fetch Holders result", results);
      let total = 0;

      setAllHolders(prevState => {
        const newState = { ...prevState };
        console.log(newState);
        results.forEach((holders: Holder[], index) => {
          const stampId = stamp_ids[index];
          holders.forEach(holder => {
            const { address, quantity } = holder;
            if (!newState[address]) {
              newState[address] = { total: 0 };
            }
            // Only add quantity if it hasn't been added before for the same stampId
            if (!newState[address][stampId]) {
              newState[address][stampId] = quantity;
              newState[address].total += quantity;
              total += quantity;
            }
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

  const getStampInfo = async (stampId: string): Promise<any> => {
    const stampInfo = await axios.get(`https://stampchain.io/api/stamps?/${stampId}`);
    return stampInfo;
  }

  useEffect(() => {
    getStampInfo("A4515906628890571300");
  }
  )

  function handleImageError(e: any) {
    e.target.onerror = null; // Prevent infinite loop in case the backup image also fails
    e.target.src = 'https://stampchain.io/stamps/e16b151228f959a8c91251eec63b390326960c4adbc85b90f1d556454b549e19.png';
  }

  return (
    <Box p={5}>
      <Center>
        <VStack spacing={4} width="100vw">
          <Text fontSize="xl" mb={4}>Total number of holders: {numberOfHolders}</Text>
          <Box width="100%" overflow="visible" m={5}>
            <Table borderRadius={"10"} variant="simple" size="sm" colorScheme="teal" >
              <Thead border={"1px solid limegreen"}>
                <Tr>
                  <Th border={"1px solid limegreen"} isNumeric>Address</Th>
                  <Th minW={"80px"} border={"1px solid limegreen"} isNumeric>Total</Th> {/* Moved Total column here */}
                  {stamp_ids.map(id => (
                    <Th key={id} isNumeric>
                      <Box width={"120px"}>
                        <Image
                          src={`https://assets.stamped.ninja/${id}.png`}
                          alt={'stamp'}
                          boxSize="120px"
                          onError={handleImageError}
                        />
                      </Box>
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody border={"1px solid limegreen"}>
                {sortedAddresses.map((address, index) => (
                  <Tr key={address} {...topTenStyle(index)} border={"1px solid limegreen"}>
                    <Td border={"1px solid limegreen"}>{address}</Td>
                    <Td border={"1px solid limegreen"} isNumeric> <Center>{allHolders[address].total}</Center></Td> {/* Moved Total cell here */}
                    {stamp_ids.map(id => (
                      <Td border={"1px solid limegreen"} key={id} isNumeric><Center>{allHolders[address][id] || 0}</Center></Td>
                    ))}
                  </Tr>
                ))}
                <Tr>
                  <Td colSpan={stamp_ids.length + 2}><strong>Total Stamps Held:</strong></Td>
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
