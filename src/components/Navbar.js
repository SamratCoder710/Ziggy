import React, { useEffect, useState } from "react";
import styleClass from "./Navbar.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import {Link} from 'react-router-dom';
import { useCart } from "../context/CardContext";
import Cart from "../screens/Cart";
const Navbar = ({onSearch}) => {
  const [search,setSearch] = useState('');
  const [isLoggedIn,setLoggedInUser] = useState(false);
  const [showCart,setShowCart] = useState(false);
  const token = sessionStorage.getItem('token');
  let data = useCart();
  useEffect(()=>{
  if(token){
    setLoggedInUser(true);
  }
  },[token])

  const logout = ()=>{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setLoggedInUser(false);
  }
  const handleChange = (ev)=>{
    setSearch(ev.target.value);
  }
  const setOutOffFocus =()=>{
    setShowCart(false);
  }
  useEffect(()=>{
    onSearch(search);
  },[search,onSearch])
  return (
    <div>
      <div className={styleClass.navbarContainer}>
        <div className={styleClass.links}>
          <div className={styleClass.link}><Link to='/'>Home</Link></div>
          {!isLoggedIn && <div className={styleClass.link}><Link to='/login'>Log in</Link></div>}
          {!isLoggedIn && <div className={styleClass.link}><Link to='/signup'>Sign up</Link></div>}
          {isLoggedIn && <div className={styleClass.link} ><Link to='/orders'>My Orders</Link></div>}
          {isLoggedIn && <div className={styleClass.link} ><Link to='/mycart'  onMouseEnter={()=>setShowCart(true)}>My Cart {showCart && <Cart outOffFocus={setOutOffFocus}/>}</Link><span className={styleClass.badge}>{data.length}</span></div>}
          {isLoggedIn && <div className={styleClass.link} onClick={logout}><span className={styleClass.logout}>Logout</span></div>}
          
          </div>
      </div>
      <div className={styleClass.mainHeading}><Link to='/'>ziggy</Link></div>
      <div className={styleClass.tagLine}>
        Discover the best food & drinks in Bhopal
      </div>
      <div className={styleClass.searchContainer}>
        <AiOutlineSearch className={styleClass.searchIcon} />
        <input
          type="text"
          className={styleClass.searchField}
          onChange ={handleChange}
          placeholder="Search for restaurant, cuisine or a dish"
        ></input>
      </div>
    </div>
  );
};

export default Navbar;
