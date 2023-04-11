import React from "react";
import { Button, TextField, Container } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login, currentUser } = React.useContext(AuthContext);

  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const handleLogin = () => {
    login(emailRef.current!.value, passwordRef.current!.value);
  };

  return (
    <div>
      <Container className="login-container">
        <h1 className="loginPropeties">Hey Bahbee, Log Yo Fine Ass In Right Here</h1>
        <br />
        <TextField
          className="loginPropeties"
          inputRef={emailRef}
          label="Email"
        ></TextField>
        <br />
        <TextField
          className="loginPropeties"
          inputRef={passwordRef}
          label="Password"
          type={"password"}
        ></TextField>
        <br />
        <div className="buttonContainer">
          <Button onClick={handleLogin} color="primary" variant="contained">
            Login
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Login;