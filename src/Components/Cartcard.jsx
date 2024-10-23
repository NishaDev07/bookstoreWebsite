import { useContext, useEffect, useState } from "react";
import { shoppingListContext } from "../contexts/ShoppingCartContext";

export default function CartCard({book, itemCount}) {
    const { removeShoppingList,clickshoppingList} = useContext(shoppingListContext);

    function qtyAction(newVal){
        if(newVal>0){
            removeShoppingList(book);
            for(let i = 0 ; i<newVal; i++){
                clickshoppingList(book);
            }
        }
    }
    return (
        <div id="CartCard">
            <div id="CartCardTop">
                <img src={book.CoverURL} alt={book.Title} />
                <div id="CartCenter">
                    <div>
                        <p className="cartTitle">{book.Title}</p>
                        <p className="cartAuthor">{book.Author}</p>
                    </div>
                    <p className="cartDescription">{book.Description}</p>
                    <p className="cartPrice">Price Per Item: <i className="fa-solid fa-indian-rupee-sign"></i> {book.Price}</p>
                </div>
                <div id="CartQtyController">
                    <button className="qtyBtn" onClick={() => qtyAction(itemCount-1) }>-</button>
                    <input type="text" className="qtyInput inputField" value={itemCount} onChange={(e) => qtyAction(parseInt(e.target.value))} />
                    <button className="qtyBtn" onClick={() => clickshoppingList(book)}>+</button>
                </div>
            </div>
            <button className="btn btnRed" onClick={() => removeShoppingList(book)}>Remove</button>
        </div>
    );
}
