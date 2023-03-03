import { useState, useEffect } from "react"
import { listServices } from "../Services/listServices"
import { useAuth } from "../Context/AuthContext"
import {
  Button,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Tag,
  Text,
  TagLabel,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Flex,
  VStack,
  HStack
} from "@chakra-ui/react"
import { CheckIcon, EditIcon, DeleteIcon, AddIcon, RepeatIcon } from "@chakra-ui/icons"

const ListPage = () => {
  const [shoppingList, setShoppingList] = useState({})
  const [isLoading, setisLoading] = useState(true)
  const [item, setItem] = useState("")
  const [quantity, setQuantity] = useState("")
  const { user } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    listServices.addToList({ product: item, quantity })
      .then(id => {
        setShoppingList([...shoppingList, { id, product: item, quantity }])
        setItem("")
        setQuantity("")
      })
  }

  useEffect(() => {
    listServices.getAll()
      .then(data => setShoppingList(data))
      .then(_ => setisLoading(false))
  }, [])

  const handleCheck = async (id) => {
    const updatedList = shoppingList.map((item) => {
      if (item.id === id) {
        return { ...item, check: !item.check }
      } else {
        return item
      }
    })
    for (const item of updatedList) {
      await listServices.updateList(item.id, { check: item.check })
    }
    setShoppingList(updatedList)
  }

  const handleEdit = (id) => {
    // Aquí puedes agregar la funcionalidad para editar un elemento
  }

  const handleDelete = async (id) => {
    const updatedList = shoppingList.filter(item => item.id !== id)
    await listServices.deleteItemList(id)
    setShoppingList(updatedList)
  }

  const handleClean = async () => {
    await listServices.deleteAllItems()
    setShoppingList([])
  }

  return (
    <Container centerContent>
      <Tag size='lg' colorScheme='blue' borderRadius='full' margin='1.5'>
        <Avatar
          src={user.photoURL}
          size='sm'
          name={user.displayName}
          ml={-1}
          mr={2}
        />
        <TagLabel>{user.displayName}</TagLabel>
      </Tag>
      <form onSubmit={handleSubmit}>
        <Flex width="100%" align="center" justify="center">
          <VStack mt="6" mb="6">
            <HStack spacing={8} mt="3" mb="3" align="flex-start">
              <FormControl isRequired>
                <FormLabel>Item</FormLabel>
                <Input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Cantidad</FormLabel>
                <Input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </FormControl>
            </HStack>
            <Button ml={2} size="lg" type="submit">
              <AddIcon />
            </Button>
          </VStack>
        </Flex>
      </form>

      {isLoading ? <Spinner size='lg' /> :
        <TableContainer mt={3} mb={5}>
          <Table variant='simple' size='sm'>
            <Thead>
              <Tr>
                <Th>Item / unidad</Th>
                <Th>Cantidad</Th>
                <Th></Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {shoppingList.map((item) => (
                <Tr key={item.id}>
                  <Td><Text textDecoration={item.check ? "line-through" : ""}>{item.product}</Text></Td>
                  <Td><Text textDecoration={item.check ? "line-through" : ""}>{item.quantity}</Text></Td>
                  <Td><Button isDisabled={item.check} onClick={() => handleCheck(item.id)}><CheckIcon /></Button></Td>
                  {/* <Td><Button isDisabled={item.check} onClick={() => handleEdit(item.id)}><EditIcon /></Button></Td> */}
                  <Td><Button onClick={() => handleDelete(item.id)}><DeleteIcon /></Button></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      }
      <Text>Limpiar lista</Text>
      <Button mt={3} size='lg' type='submit' onClick={handleClean}><RepeatIcon /></Button>
    </Container>
  )
}

export default ListPage
