import React, { createContext, useContext, useReducer } from "react";

const CardContext = createContext();

const DispatchCardContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const newState = [
        ...state,
        {
          name: action.name,
          description: action.description,
          img: action.image,
          qty: action.quantity,
          size: action.size,
          price: action.price,
        },
      ];
      return newState;
    case "UPDATE":
      let arr = [...state];
      arr.find((food, index) => {
        if (food.name === action.name) {
          arr[index] = {
            ...arr[index],
            qty: action.quantity,
            price: action.price,
          };
          
        }
      });
      return arr;
    case "REMOVE":
      return [];
    default:
      throw new Error("Incorrect dispatch");
  }
};

const CardContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CardContext.Provider value={state}>
      <DispatchCardContext.Provider value={dispatch}>
        {children}
      </DispatchCardContext.Provider>
    </CardContext.Provider>
  );
};

export default CardContextProvider;

export const useCart = () => useContext(CardContext);

export const useDispatch = () => useContext(DispatchCardContext);
