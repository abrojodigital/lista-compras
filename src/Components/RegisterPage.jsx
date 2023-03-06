import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import { Alert } from "./Alert"
import { Button, Container, FormControl, FormErrorMessage, FormLabel, Input, Stack } from "@chakra-ui/react"

export function RegisterPage() {
  const { signup } = useAuth()

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  })

  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    if (user.password !== user.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }
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

        <FormControl id="username" isRequired>
          <FormLabel>Nombre de usuario</FormLabel>
          <Input type="text" name="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Juan123" />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="*************" />
        </FormControl>

        <FormControl id="confirm-password" isRequired>
          <FormLabel>Confirmar password</FormLabel>
          <Input type="password" name="confirm-password" value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
            placeholder="*************" />
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
  