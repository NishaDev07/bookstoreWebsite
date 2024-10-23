// src/Pages/Shop.js
import { useContext } from 'react';
import './App.css';
import NavBar from '../Components/Navabr';
import ShopSection from '../Components/ShopSection';
import Footer from '../Components/Footer';
import { WishListContext } from '../contexts/WishListContext';

function Shop() {
  const { wishList, clickWishList } = useContext(WishListContext);

  return (
    <>
      <NavBar WishCount={wishList.length} />
      <ShopSection CartClickFn={clickWishList} />
      <Footer />
    </>
  );
} 

export default Shop;
