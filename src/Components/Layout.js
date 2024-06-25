import { Outlet, Link } from "react-router-dom";
import './static/Layout.css'
const Layout = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-info">
      <div class="container-fluid">
        <Link to="/" class="navbar-brand">CHENNAISUNDAY</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <Link to="/post" class="nav-link">Add Project</Link>
            </li>
            <li class="nav-item">
            <Link to="/category" class="nav-link">Category</Link>
            </li>
            <li class="nav-item">
            <Link to="/subcategory" class="nav-link">Sub Category</Link>
            </li>
          </ul>
          
        </div>
      </div>
    </nav>

      <Outlet />
    </>
  )
};

export default Layout;