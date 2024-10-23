import { useContext } from "react";
import NavBar from "../Components/Navabr";
import { WishListContext } from "../contexts/WishListContext";
import FavouriteSection from "../Components/FavouriteSection";
import Footer from "../Components/Footer"

export default function About(){
    const {wishList} = useContext(WishListContext)

    return(
        <>
            <NavBar WishCount={wishList.length} />
            <FavouriteSection />
            <Footer />
        </>
    );
}