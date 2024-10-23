import NavBar from "../Components/Navabr";
import Footer from "../Components/Footer";
import EmptyWishList from "../Assets/emptyWishList.png";

import { useContext, useState } from "react";
import { WishListContext } from "../contexts/WishListContext";
import WishCard from "../Components/WishCard";
import { Link } from "react-router-dom";

export default function WishListPage(){
    
    const {wishList} = useContext(WishListContext)

    if(wishList.length == 0){
        return(
            <>
               <NavBar WishCount={wishList.length} />
                <div id="WishlistSection">
                    <p className="largeText">Your WishList</p>
                    <img src={EmptyWishList} alt="Empty WishList"/>
                    <p className="redText">Your WishList Is Currently Empty</p>
                    <p className="normalText">Seems Like You do not Wishes here.</p>
                    <p className="normalText">Make a Wish</p>
                    <Link to="/Shop"><button className="btn btnBlue">Start Shopping</button></Link>
                </div>
                <Footer />
            </>
        )
    }

    return(
        <>
            <NavBar WishCount={wishList.length} />
            <div id="WishlistSection">
                <p className="largeText">Your WishList</p>
                <div className="CardContianer">
                    {wishList.map((wish,index)=>(
                        <WishCard key={index} book={wish} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}