import { auth } from "../Utilities/firebase"
import { Link } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"

const Navbar = () => {
  const {user} = useAuth()
  const handleLogout = () => { auth.signOut() }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/list">List</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </div>

  )
}

export default Navbar