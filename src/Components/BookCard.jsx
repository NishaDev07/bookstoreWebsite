import {  useState } from "react";
import { Link } from "react-router-dom";

export default function BookCard({book,CartClick}){

    function onCartBtnClick(){
        CartClick(book);
    }

    let bookUrl  = "book/"+ book._id

    return(
        
            <div id="Card">
                <div id="ImageSection">
                <Link to={bookUrl}>
                    <img className="cardImage" src={book.CoverURL} alt="Book Cover Image" /></Link>
                    <i className="fa-solid fa-heart cartImage" onClick={onCartBtnClick} />
                </div>
                <p className="cardTitle">{book.Title}</p>
                <p className="cardPrice"><i className="fa-solid fa-indian-rupee-sign"></i>{book.Price}</p>
            </div>
    );
}

