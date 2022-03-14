import React, {useEffect, useContext} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";
import { AuthContext} from "./components/context/authContext";
// import pages
import Home from './pages/Home'
import SingleCocktail from './pages/SingleCocktail'
import SignUp from './pages/SignUp';
import Signin from './pages/SignIn';
import Profile from "./pages/ProfilePage";
import MyCockTailList from "./pages/MyCockTailList";
import CreateRecipe from "./pages/CreateRecipe";
// import components
import Navbar from './components/navbar/Navbar';
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  const {dispatch} = useContext(AuthContext);
  useEffect(() => {
      let jwtToken = window.localStorage.getItem("jwtToken");
      if(jwtToken){
        let decodedToken = jwtDecode(jwtToken);
        const currentTime = Date.now/1000;

        if(decodedToken.exp < currentTime){
          window.localStorage.removeItem("jwtToken");
          dispatch({
            type: "LOGOUT",
            email: decodedToken.email,
            userName: decodedToken.userName,
          });
        }else{
          dispatch({
            type: "LOGIN",
            email: decodedToken.email,
            userName: decodedToken.userName,
          });
        }
      }
  }, []);
  return (
    <div>
      <ToastContainer/>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>}/>
          <Route path="/cocktail/:id" element={<PrivateRoute><SingleCocktail /></PrivateRoute> }/>
          <Route path="/sign-up" element={<SignUp />}/>
          <Route path="/sign-in" element={<Signin />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/cocktailList" element={<MyCockTailList />}/>
          <Route path="/addCocktail" element={<CreateRecipe />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
