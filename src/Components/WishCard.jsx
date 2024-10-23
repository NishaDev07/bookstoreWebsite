import {  useContext, useState } from "react";
import { Link } from "react-router-dom";
import { shoppingListContext } from "../contexts/ShoppingCartContext";
import { WishListContext } from "../contexts/WishListContext";

export default function WishCard({book}){

    let bookUrl  = "/book/"+ book._id
    const {shoppingList, clickshoppingList} = useContext(shoppingListContext)
    const {removeWishList} = useContext(WishListContext)

    return(
        <div id="WishCard">
            <div id="ImageSection">
                <Link to={bookUrl}>
                    <img className="cardImage" src={book.CoverURL} alt="Book Cover Image" />
                </Link>
                <i className="fa-solid fa-x crossImage" onClick={()=>{removeWishList(book)}}  />
            </div>

            <p className="shopCardTitle">{book.Title}</p>
            <p className="shopCardInfo">Author: {book.Author}</p>
            <p className="shopCardInfo">Price: {book.Price}</p>
            <p className="shopCardInfo">Category: {book.Category}</p>

            <Link to="/Cart"><button className="btn buyBtn" onClick={()=>{clickshoppingList(book)
            removeWishList(book)
            }}>Buy Now</button></Link>
        </div>
    );
}

