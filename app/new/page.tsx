import { Box, Image, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import axios from "axios"
import { stamp_ids } from "./../stampIDs"

interface Holder {
  address: string
  quantity: number
}

interface StampHolders {
  [holder: string]: {
    stampId: number
    quantity: number
  }
}

interface StampRow {
  holder: string
  stamps?: [
    {
      id: string
      quantity: number
    },
  ]
  total?: number
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
          total: quantity
        })
      }
    })
  })

  return (
    <Box p={5} maxW={"100vw"} overflow={"scroll"}>
      <Table borderRadius={"10"} variant="simple" colorScheme="teal">
        <Thead border={"1px solid limegreen"}>
          <Tr>
            <Th border={"1px solid limegreen"} isNumeric>
              Address
            </Th>
            <Th minW={"80px"} border={"1px solid limegreen"} isNumeric>
              Total
            </Th>
            {stamp_ids.map((id) => (
              <Th key={id} isNumeric>
                <Box width={"120px"}>
                  <Image
                    src={`https://assets.stamped.ninja/${id}.png`}
                    alt={"stamp"}
                    boxSize="120px"
                  />
                </Box>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody border={"1px solid limegreen"}>
          {tableRows.map((row) => (
            <Tr key={row.holder}>
              <Td border={"1px solid limegreen"}>{row.holder}</Td>
              <Td border={"1px solid limegreen"}>{row.total}</Td>
              {stamp_ids.map((stampID) => (
                <Td key={stampID} border={"1px solid limegreen"} isNumeric textAlign={"center"}>
                  {
                    row?.stamps?.find(stamp => stamp.id === stampID)?.quantity || 0
                  }
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default NewHome
