import {
  Box,
  Button,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import axios from "axios"
import { stamp_ids } from "./../stampIDs"

interface Holder {
  address: string
  quantity: number
}

interface StampRow {
  holder: string
  stamps?: [
    {
      id: string
      quantity: number
    },
  ]
  total: number
}

const fetchHolders = async (stamp_id: string): Promise<Holder[]> => {
  try {
    const response = await axios.get(
      `https://stampchain.io/api/stamps?holders=${stamp_id}`
    )
    return response.data || []
  } catch (error) {
    console.error(`Failed to fetch holders for stamp ${stamp_id}:`, error)
    return []
  }
}

async function NewHome() {
  const promises = stamp_ids.map((id) => fetchHolders(id))
  const results = await Promise.all(promises)
  const holders: string[] = []
  const tableRows: StampRow[] = []

  results.map((stampHolders, index) => {
    stampHolders.forEach(({ address, quantity }) => {
      if (holders.includes(address)) {
        const holder = tableRows.find((row) => row.holder === address)
        if (holder && holder.stamps && holder.total) {
          holder.stamps.push({
            id: stamp_ids[index],
            quantity,
          })
          holder.total += quantity
        }
      } else {
        holders.push(address)
        tableRows.push({
          holder: address,
          stamps: [
            {
              id: stamp_ids[index],
              quantity,
            },
          ],
          total: quantity,
        })
      }
    })
  })

  tableRows.sort((a, b) => b.total - a.total)

  return (
    <Box
      maxW={"100vw"}
      color={"limegreen"}
      paddingY={"24px"}
      maxWidth={"800px"}
      margin={"auto"}
    >
      <Box
        width={"100%"}
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignContent={"center"}
        alignItems={"center"}
        padding={"24px"}
        bg={"rgba(0, 0, 0, 0.8)"}
        border="1.4px solid #00FF41"
        boxShadow="0 0 4px #00FF41,0 0 8px #00FF41,0 0 8px #00FF41"
        textShadow="0 0 1px #00FF41,0 0 1.4px #00FF41,0 0 1.4px #00FF41"
        filter="blur(0.02rem)"
        marginBottom={"42px"}
        gap={"22px"}
        color={"#00FF41"}
      >
        <Text fontSize={"32px"}>Type your wallet</Text>
        <Input
          border="1.4px solid #00FF41"
          padding={"6px 12px"}
          bg={"black"}
          type="text"
          placeholder="0xWall3tAddr33s"
          width={"320px"}
          _focus={{
            outline: "none",
            boxShadow: "0 0 4px #00FF41,0 0 8px #00FF41,0 0 8px #00FF41",
          }}
        />
        <Button
          border="1.4px solid #00FF41"
          padding={"6px 24px"}
          _hover={{
            textShadow: "0 0 1px #00FF41,0 0 1.4px #00FF41,0 0 1.4px #00FF41",
            boxShadow: "0 0 4px #00FF41,0 0 8px #00FF41,0 0 8px #00FF41",
          }}
        >
          Claim
        </Button>
      </Box>
      <Table
        bg={"rgba(0, 0, 0, 0.8)"}
        borderRadius={"10"}
        variant="simple"
        colorScheme="teal"
        width={"100%"}
      >
        <Thead border={"1px solid limegreen"}>
          <Tr color={"#00FF41"}>
            <Th border={"1px solid limegreen"} isNumeric>
              Address
            </Th>
            <Th minW={"80px"} border={"1px solid limegreen"} isNumeric>
              Total Stamps
            </Th>
            <Th minW={"80px"} border={"1px solid limegreen"} isNumeric>
              Points
            </Th>
          </Tr>
        </Thead>
        <Tbody border={"1px solid limegreen"}>
          {tableRows.map((row) => (
            <Tr
              key={row.holder}
              h={"45px"}
              cursor={"grab"}
              _hover={{
                border: "1.4px solid #00FF41",
                boxShadow: "0 0 4px #00FF41,0 0 8px #00FF41,0 0 8px #00FF41",
                textShadow:
                  "0 0 1px #00FF41,0 0 1.4px #00FF41,0 0 1.4px #00FF41",
                filter: "blur(0.02rem)",
                color: "#00FF41",
              }}
            >
              <Td border={"1px solid limegreen"} textAlign={"center"}>
                {row.holder}
              </Td>
              <Td border={"1px solid limegreen"} isNumeric textAlign={"center"}>
                {row.total}
              </Td>
              <Td border={"1px solid limegreen"} isNumeric textAlign={"center"}>
                {row.total * 3}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default NewHome
