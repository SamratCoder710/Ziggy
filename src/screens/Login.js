import React, { useState, useRef } from "react";
import styleClass from "./Login.module.css";
import { Link, useNavigate} from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from '../components/Api';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
    let type = document.querySelector("#password").type;
    type = type === "password" ? "text" : "password";
    document.querySelector("#password").type = type;
  };
  const navigate = useNavigate();
  const closePopup = () => {
    navigate("/");
  };
  const inputPasswordRef = useRef("");
  const inputEmailRef = useRef("");
  const [error, setError] = useState(null);
  const submitHandler = async (ev) => {
    ev.preventDefault();
    if (
      inputEmailRef.current.value.length === 0 ||
      !inputEmailRef.current.value.includes("@")
    ) {
      setError("Invalid email");
    } else if (
      inputPasswordRef.current.value.length < 8 ||
      inputPasswordRef.current.value.length > 15
    ) {
      setError("Password should be atleast 8 character long");
    }
    if (!error) {
      try{
        const response = await axios.post('http://localhost:5000/api/v2/genuineuser',JSON.stringify({
          email: inputEmailRef.current.value,
          password: inputPasswordRef.current.value,
        }),{
          headers:{
            "Content-Type": "application/json"
          }
        });
      const data = await response.data;
      const {autheticated,AuthToken,user} = data;
      if(autheticated){
        sessionStorage.setItem('token',AuthToken);
        sessionStorage.setItem('user',user);
        alert('Login Successful !!');
        navigate('/');
      }
    }catch(err){
      if(err.response && err.response.data)
      console.log(err.response.data);
    }
    }
    setTimeout(() => {
      setError(null);
    }, 3000);
  };
  return (
    <div className={styleClass.container}>
      <div className={styleClass.header}>
        <div className={styleClass.loginHeading}>Login</div>
        <div onClick={closePopup} className={styleClass.close}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#1C1C1C"
            width="24"
            height="24"
            viewBox="0 0 20 20"
            aria-labelledby="icon-svg-title- icon-svg-desc-"
            role="img"
            className="sc-rbbb40-0 fmIpur"
          >
            <title>close</title>
            <path d="M11.42 10.42l3.54-3.54c0.38-0.4 0.38-1.040 0-1.42s-1.020-0.4-1.42 0l-3.54 3.54-3.54-3.54c-0.4-0.4-1.020-0.4-1.42 0s-0.38 1.020 0 1.42l3.54 3.54-3.54 3.54c-0.38 0.38-0.38 1.020 0 1.42 0.2 0.18 0.46 0.28 0.72 0.28s0.5-0.1 0.7-0.28l3.54-3.56 3.54 3.56c0.2 0.18 0.46 0.28 0.72 0.28s0.5-0.1 0.7-0.28c0.38-0.4 0.38-1.040 0-1.42l-3.54-3.54z"></path>
          </svg>
        </div>
      </div>
      <form id={styleClass.form} onSubmit={submitHandler}>
        <div>
          <input
            id="email"
            type="text"
            placeholder="Email"
            ref={inputEmailRef}
          />
        </div>
        <div>
          <input
            id="password"
            type="password"
            placeholder="Password"
            ref={inputPasswordRef}
          ></input>
          <span>
            {showPassword && <AiFillEyeInvisible onClick={togglePassword} />}
            {!showPassword && <AiFillEye onClick={togglePassword} />}
          </span>
        </div>
        <div>
          <button>Log In</button>
        </div>
      </form>
      <div className={styleClass.formError}>{error}</div>
      <hr className={styleClass.lineLogin}></hr>
      <span className={styleClass.newText}>New to Ziggy? </span>
      <Link to="/signup">
        <span className={styleClass.linkText}>Create Account</span>
      </Link>
    </div>
  );
};

export default Login;
