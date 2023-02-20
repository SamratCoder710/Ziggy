import React,{useState,useRef} from "react";
import styleClass from "./Login.module.css";
import {useNavigate,Link} from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const inputNameRef = useRef('');
  const inputPasswordRef = useRef('');
  const inputEmailRef = useRef('');
  const inputAddressRef = useRef('');
  const togglePassword = () => {
    setShowPassword(!showPassword);
    let type = document.querySelector("#password").type; 
    if (type === "password") {
      type = "text";
    } else {
      type = "password";
    }
    document.querySelector("#password").type = type;
  };
  const navigate = useNavigate();
  const closePopup = () =>{
      navigate('/');
  }
  const [error,setError] = useState(null);
  const submitHandler = async(ev)=>{
    ev.preventDefault();
    if(inputNameRef.current.value.length === 0 || !(/^[A-Za-z ]+$/.test(inputNameRef.current.value))){
      setError('Invalid name!');
    }else if(inputPasswordRef.current.value.length < 8 || inputPasswordRef.current.value.length > 15){
      setError('Password should be atleast 8 character long');
    }else if(inputEmailRef.current.value.length === 0 || !(inputEmailRef.current.value.includes('@'))){
      setError('Invalid email!');
    }else if(inputAddressRef.current.value.length === 0){
      setError('Invalid address!');
    }
    if(!error){
      const response = await fetch('http://localhost:5000/api/v3/createuser',{
        method:'POST',
        body:JSON.stringify({
          'name':inputNameRef.current.value,
          'password':inputPasswordRef.current.value,
          'email':inputEmailRef.current.value,
          'address':inputAddressRef.current.value
        }),
        headers:{
          'Content-Type':'application/json'
        }
      })
      
      const data = await response.json();
      const {success} = data;
      if(success){
      alert('SignUp successfull !!');
      navigate('/');
      }

    }
    setTimeout(()=>{
      setError(null);
    },3000);

  }
  return (
    <div className={styleClass.container}>
      <div className={styleClass.header}>
        <div className={styleClass.loginHeading}>Sign up</div>
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
          <input id="name" type='text' placeholder="Name" ref={inputNameRef}/>
        </div>
        <div>
          <input id="password" type='password' placeholder="Password" ref={inputPasswordRef}></input>
          <span>
          {showPassword && <AiFillEyeInvisible onClick={togglePassword} />}
          {!showPassword && <AiFillEye onClick={togglePassword}/>}
          </span>
        </div>
        <div>
          <input id="email" type='text' placeholder="Email" ref={inputEmailRef}/>
        </div>
        <div>
          <input id="address" type='text' placeholder="Address" ref={inputAddressRef}/>
        </div>
        <div>
          <button>Sign Up</button>
        </div>
      </form>
      <div className={styleClass.formError}>{error}</div>
      <hr className={styleClass.lineSignup}></hr>
      <span className={styleClass.newText}>Already have an account? </span><Link to='/login'><span className={styleClass.linkText}>Log in</span></Link>
    </div>
  );
};

export default Signup;
