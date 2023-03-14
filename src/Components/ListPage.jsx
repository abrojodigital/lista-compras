import { useState, useEffect } from "react"
import { listServices } from "../Services/listServices"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
      {!isLoading && (
        <Accordion defaultIndex={[0]} allowMultiple>
          {categories.map((category, index) => (
            <AccordionItem key={category}>
              <h2>
                <AccordionButton>
                  {category}
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <Table variant='simple' size='sm'>
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
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <Text>Limpiar lista</Text>
      <Button mt={3} size='lg' type='submit' onClick={handleClean}><RepeatIcon /></Button>
    </Container>
  )
}

export default ListPage
