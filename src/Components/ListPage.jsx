import { useState, useEffect } from "react"
import { listServices } from "../Services/listServices"
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
  Text,
  TableCaption,
} from "@chakra-ui/react"
import { CheckIcon, EditIcon, DeleteIcon, RepeatIcon } from "@chakra-ui/icons"
import User from "./User"
import AddItem from "./AddItem"

const ListPage = () => {
  const [shoppingList, setShoppingList] = useState({})
  const [isLoading, setisLoading] = useState(true)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    listServices.getAllGroupedByCategory()
      .then(data => setShoppingList(data))
      .then(_ => setisLoading(false))
  }, [shoppingList])

  useEffect(() => {
    listServices.getCategories()
      .then(data => setCategories(data))
  }, [shoppingList])

  const handleCheck = async (categoryId, itemId) => {
    const updatedList = shoppingList[categoryId].map((item) => {
      if (item.id === itemId) {
        return { ...item, check: !item.check }
      } else {
        return item
      }
    })
    for (const item of updatedList) {
      await listServices.updateList(item.id, { check: item.check })
    }
    setShoppingList({ ...shoppingList, [categoryId]: updatedList })
  }

  const handleDelete = async (categoryId, itemId) => {
    const updatedList = shoppingList[categoryId].filter(item => item.id !== itemId)
    await listServices.deleteItemList(itemId)
    setShoppingList({ ...shoppingList, [categoryId]: updatedList })
  }

  const handleClean = async () => {
    await listServices.deleteAllItems()
    setShoppingList({})
  }

  return (
    <Container centerContent>
      <User />
      <AddItem />

      {isLoading && <Spinner size='lg' />}
      {!isLoading &&
        <>
          {categories.map((category) => (
            <TableContainer mt={3} mb={5} key={category}>
              <Table variant='simple' size='sm'>
                <TableCaption>{category}</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Item / unidad</Th>
                    <Th>Cantidad</Th>
                    <Th></Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {shoppingList[category].map((item) => (
                    <Tr key={item.id}>
                      <Td><Text textDecoration={item.check ? "line-through" : ""}>{item.product}</Text></Td>
                      <Td><Text textDecoration={item.check ? "line-through" : ""}>{item.quantity}</Text></Td>
                      <Td><Button isDisabled={item.check} onClick={() => handleCheck(category, item.id)}><CheckIcon /></Button></Td>
                      <Td><Button onClick={() => handleDelete(category, item.id)}><DeleteIcon /></Button></Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          ))}
        </>}

      <Text>Limpiar lista</Text>
      <Button mt={3} size='lg' type='submit' onClick={handleClean}><RepeatIcon /></Button>
    </Container >
  )
}

export default ListPage
