import { firestore } from "../Utilities/firebase"
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where
} from "firebase/firestore"

const addToList = async (elem) => {
  const listCollection = collection(firestore, "shoppingList")
  const response = await addDoc(listCollection, elem)
  return response.id
}


const get = async (id) => {
  const listDoc = doc(firestore, 'shoppingLists', id)
  const response = await getDoc(listDoc)

  return { id: response.id, ...response.data() }
}

const getAll = async () => {
  const listCollection = collection(firestore, "shoppingList")
  const response = await getDocs(listCollection)
  const shoppingList = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  return shoppingList
}

const updateList = async (id, payload) => {
  const listDoc = doc(firestore, "shoppingList", id)
  updateDoc( listDoc, payload )
}

const deleteItemList = async (id) => {
  const itemDoc = doc(firestore, "shoppingList", id)
  await deleteDoc(itemDoc)
}

const deleteAllItems = async () => {
  const listCollection = collection(firestore, "shoppingList");
  const querySnapshot = await getDocs(listCollection);
  querySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
};

export const listServices = { getAll, get, updateList, addToList, deleteItemList, deleteAllItems }