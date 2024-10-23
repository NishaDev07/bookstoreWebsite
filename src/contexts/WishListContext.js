import React, { createContext, useState } from 'react';

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const [wishList, setWishList] = useState([]);

  const clickWishList = (cardClicked) => {
    setWishList(prevWishList => {
      if (!prevWishList.some(item => item._id === cardClicked._id)) {
        return [...prevWishList, cardClicked];
      }
      return prevWishList;
    });
  };

  const removeWishList = (cardClicked) =>{
    setWishList(prevWishList =>{
      return prevWishList.filter(wishItem => wishItem._id != cardClicked._id);
    });
  };

  return (
    <WishListContext.Provider value={{ wishList, clickWishList, removeWishList }}>
      {children}
    </WishListContext.Provider>
  );
};
