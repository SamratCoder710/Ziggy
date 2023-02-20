import React from "react";
import { useCart } from "../context/CardContext";
import styleClass from "./Cart.module.css";
import { BiRupee } from "react-icons/bi";
const Cart = (props) => {
  let data = useCart();
  let totalPrice = 0;
  for (let item in data) {
    totalPrice += Number(data[item].price);
  }
  return (
    <div onMouseLeave={props.outOffFocus} className={styleClass.cart}>
      {totalPrice !== 0 && (
        <>
        <table>
          <tbody>
            {data.map((e) => (
              <tr key={e.name + e.size}>
                <td>{e.name}</td>
                <td>x{e.qty}</td>
                <td className={styleClass.priceRupees}>
                  <BiRupee className={styleClass.rupee} />
                  {e.price}
                </td>
              </tr>
            ))}
            <tr className={styleClass.finalPrice}>
              <td>Total Amount</td>
              <td>. . . </td>
              <td className={styleClass.priceFinalRupees}>
                <BiRupee className={styleClass.rupee} />
                {totalPrice}
              </td>
            </tr>
          </tbody>
        </table>
        </>
      )}
      {totalPrice === 0 && <div><h1>Cart Empty</h1>
      <p>Good food is always cooking! Go ahead, order some yummy items from the menu.</p></div>}
    </div>
  );
};

export default Cart;
