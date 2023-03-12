import { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  VStack,
  HStack,
  Select
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { listServices } from "../Services/listServices";

const AddItem = () => {
  const [shoppingList, setShoppingList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    listServices
      .getAll()
      .then((data) => setShoppingList(data))
      .then(() => setIsLoading(false));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    listServices
      .addToList({ product: item, quantity, category })
      .then((id) => {
        setShoppingList([
          ...shoppingList,
          { id, product: item, quantity, category, check: false },
        ]);
        setItem("");
        setQuantity("");
        setCategory("");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex width="100%" align="center" justify="center">
        <VStack mt="6" mb="6">
          <HStack spacing={8} mt="3" mb="3" align="flex-start">
            <FormControl isRequired>
              <FormLabel>Item</FormLabel>
              <Input
                type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Cantidad</FormLabel>
              <Input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Categoría</FormLabel>
              <Select
                placeholder="Selecciona categoría"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="almacén">Almacén</option>
                <option value="bebidas">Bebidas</option>
                <option value="fiambrería">Fiambrería</option>
                <option value="lácteos">Lácteos</option>
                <option value="limpieza">Limpieza</option>
                <option value="verdulería">Verdulería</option>
                <option value="otros">Otros</option>
              </Select>
            </FormControl>
          </HStack>
          <Button ml={2} size="lg" type="submit">
            <AddIcon />
          </Button>
        </VStack>
      </Flex>
    </form>
  );
};

export default AddItem;
