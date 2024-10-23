import {  useContext, useState } from "react";
import { Link } from "react-router-dom";
import { shoppingListContext } from "../contexts/ShoppingCartContext";

export default function ShopBookCard({book,CartClick}){

    function onCartBtnClick(){
        CartClick(book);
    }

    const {shoppingList, clickshoppingList} = useContext(shoppingListContext)

    let bookUrl  = "/book/"+ book._id

    return(
        <div id="ShopCard">
            <div id="ImageSection">
            <Link to={bookUrl}>
                <img className="cardImage" src={book.CoverURL} alt="Book Cover Image" />
            </Link>
                <i className="fa-solid fa-heart cartImage" onClick={onCartBtnClick} />
            </div>

            <p className="shopCardTitle">{book.Title}</p>
            <p className="shopCardInfo">Author: {book.Author}</p>
            <p className="shopCardInfo">Price: {book.Price}</p>
            <p className="shopCardInfo">Category: {book.Category}</p>

            <Link to="/Cart"><button className="btn buyBtn" onClick={()=>{clickshoppingList(book)}}>Buy Now</button></Link>
        </div>
    );
}

