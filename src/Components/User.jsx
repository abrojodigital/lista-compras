import { useAuth } from "../Context/AuthContext"
import { Tag, TagLabel, Avatar } from "@chakra-ui/react"

const User = () => {
  const { user } = useAuth()

  return (
    <Tag size='lg' colorScheme='blue' borderRadius='full' margin='1.5'>
      <Avatar
        src={user.photoURL}
        size='sm'
        name={user.displayName}
        ml={-1}
        mr={2}
      />
      <TagLabel>{user.displayName}</TagLabel>
    </Tag>)
}

export default User