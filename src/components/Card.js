import React, { useState,useRef, useEffect } from 'react';
import { useDispatch,useCart } from '../context/CardContext';
import './Card.css';

const Card = ({ image, name, description,options }) => {
  const data = useCart();
  const optionKeys = Object.keys(options[0]);
  const [quantity,setQuantity] = useState(1);
  const inputQuantity = useRef(1);
  const [size,setSize] =useState('');
  const dispatch = useDispatch();
  let price = quantity * options[0][size];
  const addFood =async()=>{
    if(data.length >0){
    for(const item in data){
      if(data[item].name === name && data[item].size === size){
        await dispatch({type:'UPDATE',quantity,price,name})
        return
      }
    }
  }
    await dispatch({type:'ADD',image,name,description,quantity,size,price});
    return 
  }
  const sizeChanged =(e)=>{
    setSize(e.target.value)

  }
  useEffect(()=>{
    setSize(optionKeys[0])
  },[optionKeys]);
  

  const selectionChanged = (e)=>{
    setQuantity(inputQuantity.current.value);
  }
  return (
    <div className="food-card">
      <img src={image} alt={name} className="food-card-image"/>
      <h3 className="food-card-name">{name}</h3>
      <p className="food-card-description">{description}</p>
      <div className='card-footer'>
        <select ref={inputQuantity} onChange={selectionChanged} >
        {Array.from({length:6}, (_, i) => i + 1).map(e=> <option key={e} value={e}>{e}</option>)}
        </select>

        <select onChange={sizeChanged}>
          {optionKeys.map(e=> <option key={e} value={e}>{e}</option>)}
        </select>

        <span> {price} Rs</span>
        <div className='add' onClick={addFood}> + ADD</div>
      </div>
      
      
      
        
      
    </div>
  );
};

export default Card;
