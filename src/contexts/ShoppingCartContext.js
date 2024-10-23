import React, { createContext, useEffect, useState } from 'react';

export const shoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const [shoppingList, setshoppingList] = useState([]);

  const clickshoppingList = (cardClicked) => {
    setshoppingList(prevShopList => {
        return [...prevShopList, cardClicked];
    });
  };


  const removeShoppingList = (cardClicked) =>{
    setshoppingList(prevShopList =>{
      return shoppingList.filter(shopItem => shopItem._id != cardClicked._id);
    });
  }


  return (
    <shoppingListContext.Provider value={{ shoppingList, clickshoppingList, removeShoppingList, setshoppingList }}>
      {children}
    </shoppingListContext.Provider>
  );
};
