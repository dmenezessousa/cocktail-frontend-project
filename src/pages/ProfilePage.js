import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

import checkJwtToken from "../components/lib/CheckJwtToken";
import { AuthContext } from "../components/context/authContext";
import FirstNameValidator from "../components/lib/FirstNameValidator";
import LastNameValidator from "../components/lib/LastNameValidator";
import UserNameValidator from "../components/lib/UserNameValidator";
import PasswordValidator from "../components/lib/PasswordValidator";
import AxiosBackend from "../components/lib/AxiosBackend";


function ProfilePage() {
  const {
    state: { user },
  } = useContext(AuthContext);
  const [
    firstName,
    handleFirstNameOnChange,
    firstNameError,
    setFirstNameOnFocus,
    setFirstNameOnBlur,
  ] = FirstNameValidator();
  const [
    lastName,
    handleLastNameOnChange,
    LastNameError,
    setOnFocus,
    setOnBlur,
  ] = LastNameValidator();
  const [
    userName,
    handleUserNameOnChange,
    userNameError,
    userNameOnFocus,
    userNameOnBlur,
  ] = UserNameValidator();
  const [password, handlePwOnChange, passwordError, setPwOnFocus, setPwOnBlur] =
    PasswordValidator();
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { CheckToken } = checkJwtToken();

  useEffect(() => {
    if (CheckToken()) {
      navigate("/Profile");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let payload = await AxiosBackend.put("/users/update-profile", {
        firstName,
        lastName,
        userName,
        password,
        confirmPassword,
      });
      toast.success("Success", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(payload);
      window.localStorage.removeItem("jwtToken");
      navigate("/");
    } catch (e) {
      toast.error(e.response.data.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <>
      <div className="search-form">
        <div style={{display: "flex", marginTop: 100}} className="div_title">
          <h1>Welcome Back</h1>
          <h1 style={{ color: "blue", marginLeft: 5 }}> {user.userName}</h1>
        </div>
        <form  onSubmit={handleSubmit}>
          <h1 style={{display: "flex", marginTop: 100}} className="h3 mb-3 fw-normal">
            Update Profile
          </h1>
          {/* First Name */}
          <div className="form-control">
            <input
              
              id="floatingInput"
              placeholder="First Name"
              type="text"
              onChange={handleFirstNameOnChange}
              onFocus={() => setFirstNameOnFocus(true)}
              onBlur={() => setFirstNameOnBlur(true)}
            ></input>
          </div>
          <div>{firstNameError && firstNameError}</div>
          {/* Last Name */}
          <div className="form-control">
            <input
              
              id="floatingInput"
              placeholder="Last Name"
              type="text"
              onChange={handleLastNameOnChange}
              onFocus={() => setOnFocus(true)}
              onBlur={() => setOnBlur(true)}
            ></input>
          </div>
          <div>{LastNameError && LastNameError}</div>
          {/* Username */}
          <div className="form-control">
            <input
              
              id="floatingInput"
              placeholder="Username"
              type="text"
              onChange={handleUserNameOnChange}
              onFocus={() => userNameOnFocus(true)}
              onBlur={() => userNameOnBlur(true)}
            ></input>
          </div>
          <div>{userNameError && userNameError}</div>
          {/* Password */}
          <div className="form-control">
            <input
              
              id="floatingPassword"
              placeholder="Password"
              type="password"
              onChange={handlePwOnChange}
              onFocus={() => setPwOnFocus(true)}
              onBlur={() => setPwOnBlur(true)}
            ></input>
          </div>
          <div>{passwordError && passwordError}</div>
          {/* Comfirm Password */}
          <div className="form-control">
            <input
              
              id="floatingPassword"
              placeholder="Comfirm Password"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>
          <div className="checkbox mb-3"></div>
          <button
            className="w-100 btn btn-lg btn-primary"
            style={{
              backgroundColor: "blue",
              color: "#fff",
              borderRadius: 5,
              height: 50,
              marginTop: 5,
              cursor: "pointer",
              width: 310,
            }}
            type="submit"
          >
            Update
          </button>
        </form>
        <div>
          <Link
            style={{ display: "flex", marginTop: 20, marginLeft: "10vh" }}
            to={"/cocktailList"}
          >
            <h1 style={{ color: "white" }}> My </h1>
            <h1 style={{ color: "blue" }}>CockTail</h1>
            <h1 style={{ color: "white" }}>List</h1>
          </Link>
        </div>
        <div>
          <Link
            style={{ display: "flex", marginTop: 20, marginLeft: "7.5vh" }}
            to={"/addCocktail"}
          >
            <h1 style={{ color: "white" }}> Create </h1>
            <h1 style={{ color: "blue" }}>Your</h1>
            <h1 style={{ color: "white" }}>Recipe</h1>
          </Link>
        </div>
      </div>
      
    </>
  );
}

export default ProfilePage;
