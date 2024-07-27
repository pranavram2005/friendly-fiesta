import './static/ViewLayout.css'
import { Outlet, Link } from "react-router-dom";

const ViewLayout =()=>{
    return(
        <>
        <nav class="navbar navbar-expand-sm bg-default navbar-dark">
        <div class="container-fluid navs">
          <a class="navbar-brand" href="#">
            <img decoding="async" src="Logo-icon2.png" alt="Techex" class="navbar-brand__regular dark-logo"/>

          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon" ></span>
          </button>
          <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link to="/projects" class="nav-link"><a>Project List</a></Link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Contact us</a>
              </li>  
              <li class="nav-item">
                <a class="nav-link bg-danger text-light" target='_blank' href="https://forms.gle/tyKwasZYVo6rf6kF7">New Project Ideas</a>
              </li>  
            </ul> 
            <form class="d-flex">
                <ul class="MenuEmail">
                    <li><i class='bx bx-envelope'></i> info@chennaisunday.com
                        <br/><p><i class='bx bxs-phone'></i> <a href="tel:9566137117">+91 9566137117</a></p></li>
                </ul>
                <img src="jai_sree_ram.jpg" alt="Jai_Sree_Ram" style={{width: "100px",height: "100px"}}/>

              </form>
          </div>
        </div>
      </nav>
        </>
    )
}
export default ViewLayout;