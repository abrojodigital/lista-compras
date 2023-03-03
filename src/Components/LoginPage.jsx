import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import { Button, Container, FormControl, FormErrorMessage, FormLabel, Input, Stack } from "@chakra-ui/react"
import { Alert } from "./Alert"

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const { login, loginWithGoogle, resetPassword } = useAuth()
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)
    try {
      await login(user.email, user.password)
      navigate("/")
    } catch (error) {
      setError(error.message)
    }
    setIsSubmitting(false)
  }

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value })

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle()
      navigate("/")
    } catch (error) {
      setError(error.message)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (!user.email) return setError("Escriba un correo electrónico para restablecer la contraseña")
    setIsSubmitting(true)
    try {
      await resetPassword(user.email)
      setError('Te enviamos un correo electrónico. Revisa tu correo')
    } catch (error) {
      setError(error.message)
    }
    setIsSubmitting(false)
  }

  return (
    <Container maxW="xl" my="3" align="center">
      {error && <Alert status="error">{error}</Alert>}
      <Stack spacing="6" as="form" onSubmit={handleSubmit}>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" value={user.email} onChange={handleChange} placeholder="algo@unmail.com" />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" value={user.password} onChange={handleChange} placeholder="*************" />
        </FormControl>
        <Stack direction={{ base: "column", md: "row" }} spacing="4">
          <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
            Iniciar Sesión
          </Button>
          <Link onClick={handleResetPassword} fontSize="sm">
            ¿Has olvidado tu contraseña?
          </Link>
        </Stack>
        <Button onClick={handleGoogleSignin} colorScheme="blue" mt="4">
          Google login
        </Button>
        <Stack direction="row" fontSize="sm" justifyContent="center" mt="4">
          <span>¿No tienes una cuenta?</span>
          <Link to="/register" color="blue.700" _hover={{ color: "blue.900" }}>
            Registro
          </Link>
        </Stack>
      </Stack>
    </Container>
  )
}

export default LoginPage