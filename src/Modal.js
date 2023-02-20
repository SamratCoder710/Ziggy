import React from 'react';
import ReactDOM from 'react-dom'
import styleClass from './Modal.module.css';
import { useNavigate } from 'react-router-dom';
const Modal = (props) => {
  const navigate = useNavigate();
  const closePopup =()=>{
    navigate('/');
  }
  return (
    <div>
      {ReactDOM.createPortal(<>
        <div className={styleClass.modal}>{props.children}</div>
        <div onClick={closePopup} className={styleClass.overlay}></div>
        </>,document.getElementById('node'))}
        </div>
  )
}

export default Modal