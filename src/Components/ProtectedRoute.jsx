import { Navigate } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import { Spinner } from "@chakra-ui/react";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) return <Spinner />

  if (!user) return <Navigate to="/login" />

  return <>{children}</>
}

export default ProtectedRoute