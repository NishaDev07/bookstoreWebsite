import { Link, useParams } from "react-router-dom";
import NavBar from "../Components/Navabr";
import Footer from "../Components/Footer";
import { useState,useEffect, useContext } from "react";
import { WishListContext } from "../contexts/WishListContext";
import { shoppingListContext } from "../contexts/ShoppingCartContext";

export default function BookPage(){
    const  {id} = useParams();
    const [loading, setLoading] = useState(true)
    const [book, setBook] = useState({})
    
    const {wishList, clickWishList} = useContext(WishListContext)
    const {shoppingList, clickshoppingList} = useContext(shoppingListContext)

    useEffect(()=>{
        async function fetchBook (){
            try {
                const response = await fetch(`http://localhost:5000/fetchBooks/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json()
                setBook(data)
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }finally{
                setLoading(false)
            }
        }
        fetchBook();
    },[])

    if(loading){
        return
    }

    return(
        <>
            <NavBar WishCount={wishList.length}/>
            <div id="bookInfoCard">
                <img src={book.CoverURL} alt="BookCover" />
                <div id="bookInfoRight">
                    <p className="bookTitle">{book.Title}</p>
                    <p className="bookAuthor">By {book.Author}</p>
                    <p className="bookCat"><strong>Category: </strong> {book.Category}</p>
                    <p className="bookDesc">{book.Description}</p>

                    <div id="buttonBox">
                        <a href={book.PDFURL}><button className="btn btnBlueBuy">Read PDF</button></a>
                        <Link to="/Cart"><button className="btn btnGreen" onClick={()=>{clickshoppingList(book)}}>Buy Now</button></Link>
                        <button className="btn btnRed" onClick={()=>clickWishList(book)}>Add to Wishlist</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}