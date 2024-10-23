// src/Pages/App.js
import { useContext } from 'react';
import './App.css';
import Hero from '../Components/Hero';
import NavBar from '../Components/Navabr';
import BestSeller from '../Components/BestSellerSection';
import FavouriteSection from '../Components/FavouriteSection';
import OtherBooksSection from '../Components/BookSection';
import Footer from '../Components/Footer';
import Feedbackpage from '../Components/FeedbackPage';
import { WishListContext } from '../contexts/WishListContext';

function App() {
  const { wishList, clickWishList } = useContext(WishListContext);

  return (
    <>
      <NavBar WishCount={wishList.length} />
      <Hero />
      <BestSeller CartClickFn={clickWishList}/>
      <FavouriteSection />
      <OtherBooksSection CartClickFn={clickWishList} />
      <Feedbackpage />
      <Footer />
    </>
  );
} 

export default App;
