import React, { useEffect, useState } from "react";
import "./Orders.css";
const Orders = () => {
  const [orderData, setorderData] = useState([]);

  const fetchMyOrder = async () => {
    await fetch("http://localhost:5000/api/v5/myorders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: sessionStorage.getItem("user"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setorderData(response.foundOrder.orders);
    });
  };
  const SortedOrders = orderData.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <header className="header">Ziggy</header>
      {SortedOrders.map((order) => (
        <div key={order._id}  className="order-history">
          <div className="order">
            <div className="order-date">
              {new Date(order.date).toLocaleString()}
            </div>
            {order.items.map((item) => (
              <div id={item.name+order._id} className="order-item">
                <div className="item-qty">{item.qty}</div>
                <div className="item-name">{item.name}</div>
                <div className="item-price">{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
