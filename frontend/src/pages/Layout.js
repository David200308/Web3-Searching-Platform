import { Outlet, Link } from "react-router-dom";
import "./pages.css"

const Layout = () => {
  return (
    <>
      <nav class="navbar">
        <ul>
            <Link to="/">Search</Link>
            <Link to="/result">Result</Link>
            <Link to="/update">Update</Link>
            <Link to="/about">About</Link>
            <Link to="/api">API</Link>
        </ul>
      </nav>
      <Outlet />
    </>
  )
};

export default Layout;