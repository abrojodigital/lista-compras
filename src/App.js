import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute"
import LoginPage from "./Components/LoginPage";
import ListPage from "./Components/ListPage";
import Navbar from "./Components/Navbar";
import { AuthProvider } from "./Context/AuthContext"
import { ChakraProvider } from '@chakra-ui/react'
import { RegisterPage } from "./Components/RegisterPage";


const App = () => {

  return (
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={
              <ProtectedRoute>
                <ListPage />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>

  );
};

export default App;
