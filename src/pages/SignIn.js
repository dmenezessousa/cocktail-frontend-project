//imports from libraries
import React, { useEffect, useContext } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//imports from my app
import emailValidator from "../components/lib/EmailValidator";
import passwordValidator from "../components/lib/PasswordValidator";
import checkJwtToken from "../components/lib/CheckJwtToken";
import { AuthContext } from "../components/context/authContext";
import axiosBackend from "../components/lib/AxiosBackend";

function Signin() {
  const [email, handleEmailOnChange, emailError] = emailValidator();
  const [password, handlePwOnChange] = passwordValidator();
  const { dispatch } = useContext(AuthContext);
  const { CheckToken } = checkJwtToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (CheckToken()) {
      navigate("/");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let payload = await axiosBackend.post("/users/login", {
        email,
        password,
      });
      window.localStorage.setItem("jwtToken", payload.data.payload);
      let userToken = jwtDecode(payload.data.payload);

      dispatch({
        type: "LOGIN",
        email: userToken.email,
        userName: userToken.userName,
      });

      toast.success("Success", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        position: "top-center",
      });
      navigate("/");
    } catch (e) {
      toast.error("e.response.data.error", {
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
    <div style={{marginTop: "15%"}}className="search-form">
      <main className="form-signin">
        <form style={{ marginTop: 150, color: "#FFF" }} onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal" style={{ color: "#fff" }}>
            Please Sign In
          </h1>
          {/* Email address */}
          <div className="form-control">
            <input
              type="email"
              
              id="floatingInput"
              placeholder="name@example.com"
              onChange={handleEmailOnChange}
            ></input>
          </div>
          <div>{emailError && emailError}</div>
          {/* Password */}
          <div className="form-control">
            <input
              type="password"
              
              id="floatingPassword"
              placeholder="Password"
              onChange={handlePwOnChange}
            ></input>
          </div>
          <div className="checkbox mb-3"></div>
          <button
            className="w-100 btn btn-lg btn-primary"
            style={{
              backgroundColor: "Blue",
              color: "#fff",
              borderRadius: 5,
              height: 50,
              marginTop: 5,
              cursor: "pointer",
              width: 310,
            }}
            type="submit"
          >
            Sign In
          </button>
        </form>
      </main>
    </div>
  );
}

export default Signin;
