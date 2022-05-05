import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import logo from './cocktail.png';
import { AuthContext} from "../context/authContext";

const Navbar = () => {
  const {
    state: {user},
    dispatch,
  } = useContext(AuthContext)

  function logout(){
    dispatch({
      type: "LOGOUT"
    });
    window.localStorage.removeItem("jwtToken");
  };

  let Profile = user?.isAuth ? "/profile" : "/sign-in";
  let userLogout = user?.isAuth ? "logout" : "Sign Up";
  let Sign_up = user?.isAuth ? "/" : "/sign-up";
  let Sign_in = user?.isAuth ? "Profile" : "Sign in";
  let Home = user?.isAuth ? "home" : "";
  let logoutBotton = user?.isAuth ? logout : ()=>{};
  return (
    <nav className="navbar">
      <div className="nav-center">
        <div style={{display:"flex"}}>
          <Link onClick={() => window.location.reload(false)} to="/">
            <h2 style={{marginTop: 15}}>DrinksForFun</h2>
          </Link>
          <img style={{height: 50, width: 50, marginTop: 5}} src={logo} alt="cocktail"/>
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/">
              {Home}
            </Link>
          </li>
          <li>
            <Link to={Profile} >
              {Sign_in}
            </Link>
          </li>
          <li>
            <Link to={Sign_up} onClick={()=>logoutBotton()}>
              {userLogout}
            </Link>
          </li>
        </ul>
      </div>
    </nav>

  )
}

export default Navbar
