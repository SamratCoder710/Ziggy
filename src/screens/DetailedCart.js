import React from "react";
import { useCart, useDispatch } from "../context/CardContext";
import styleclass from "./DetailedCart.module.css";
import { BiRupee } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "../components/Api";
const DetailedCart = () => {
  const data = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let totalPrice = 0;
  const name = sessionStorage.getItem('user');
  const checkoutHandler =async()=>{
    const res = await axios.post('http://localhost:5000/api/v5/createorder',
    JSON.stringify({
      'name': name,
      'orders': [{
        'items': data,
        'date': Date.now(),
      }]
    })
    ,{
      headers:{
        'Content-Type':'application/json'
      }
    });
    const {success} = res.data;
    console.log(success);
    await dispatch({type:'REMOVE'});
    navigate('/');
  }
  for (let item in data) {
    totalPrice += Number(data[item].price);
  }
  return (
    <div className={styleclass.DetailedCart}>
      <header className={styleclass.header}>Ziggy</header>
      {totalPrice !== 0 && (
        <>
        <table className={styleclass.table}>
          {data.map((e) => (
            <tbody key={e.name + "_div"}>
              <tr>
                <td>
                  <img
                    src={e.img}
                    alt={e.name}
                    width="120px"
                    height="90px"
                  ></img>
                </td>
              </tr>
              <tr key={e.name + e.size}>
                <td>{e.name}</td>
                <td>x{e.qty}</td>
                <td className={styleclass.priceRupees}>
                  <BiRupee className={styleclass.rupee} />
                  {e.price}
                </td>
              </tr>
            </tbody>
          ))}
          <tfoot>
            <tr>
              <td>Total Amount</td>
              <td>. . . </td>
              <td className={styleclass.priceFinalRupees}>
                <BiRupee className={styleclass.rupee} />
                {totalPrice}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className={styleclass.checkout} onClick={checkoutHandler}>Checkout</div>
        </>
      )}
      {totalPrice === 0 && (
        <div className={styleclass.empty}>
          <div className={styleclass.emptyImg}></div>
          <h3>Cart Empty</h3>
          <p>
            Good food is always cooking! Go ahead, order some yummy items from
            the menu.
          </p>
        </div>
      )}
    </div>
  );
};

export default DetailedCart;
