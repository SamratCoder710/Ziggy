import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import './Home.css';
const Home = (props) => {
  const searchText = props.searchText || '';
  const [foodData,setFoodData] = useState([]);
  const [foodCat,setFoodCat] = useState([]);
  const loadData = async()=>{
    const response = await fetch('http://localhost:5000/api/v4/displayData');
    const {food_category,food_items} = await response.json();
    setFoodData(food_items);
    setFoodCat(food_category);

  }
  useEffect(()=>{
    loadData();
  },[])
  return (
    <div>
      <div className="container">
        <div className="cart-board">
          <div className="cart-board__container">
            {foodCat !==[] && foodCat?foodCat.map((e,index)=>
              <div key={e.id + "_" + index + "_outer"}>
              <div key={e.id + "_" + index} className="catText">{e.CategoryName}</div>
              <hr></hr>
              <div className="cards">
              {foodData !== [] && foodData?foodData.filter(k=>k.CategoryName === e.CategoryName && k.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())).map((ele,index) =>
              <Card key={ele.id ? ele.id : index} image={ele.img} name={ele.name} options={ele.options} description={ele.description}></Card>):<div>No food Data found</div>}
              </div>
              </div>
              ):<div>Loading..</div>}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
