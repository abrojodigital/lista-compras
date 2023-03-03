import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import { Alert } from "./Alert"
import { Button, Container, FormControl, FormErrorMessage, FormLabel, Input, Stack } from "@chakra-ui/react"

export function RegisterPage() {
  const { signup } = useAuth()

  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      await signup(user.email, user.password)
      navigate("/")
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <Container maxW="xl" my="3" align="center">
      {error && <Alert message={error} />}
      <Stack spacing="6" as="form" onSubmit={handleSubmit}>

        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="algo@unmail.com" />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </FormLabel>
          <Input
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="*************"
          />
        </FormControl>
        <Stack direction={{ base: "column", md: "row" }} spacing="4">
          <Button type="submit" colorScheme="blue">
            Registrar
          </Button>
        </Stack>
        <Stack direction="row" fontSize="sm" justifyContent="center" mt="4">
          <span>¿Ya tienes una cuenta?</span>
          <Link to="/login" className="text-blue-700 hover:text-blue-900">
            Login
          </Link>
        </Stack>
      </Stack>
    </Container>
  )
}