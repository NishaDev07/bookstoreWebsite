import BookCard from "./BookCard";
import { useEffect, useState } from "react";

export default function OtherBooksSection({CartClickFn}){
    
    const [BookObj, setBookObj] = useState([])
    const [loading, setLoading] =  useState(true)

    useEffect(()=>{
        async function fetchBestSellerBooks (){
            try {
                const response = await fetch('http://localhost:5000/fetchBooks');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json()
                setBookObj(data)
            } catch (error) {
                console.log('There was a problem with the fetch operation:', error);
            }finally{
                setLoading(false)
            }
        }
        fetchBestSellerBooks();
    },[])

    if(loading){
        return
    }

    if(BookObj.length == 0){
        <div id="bestSellerSection">
            <p className="largeText">Other Books</p>
            <p>No Book Available</p>
        </div>
    }

    return(
        <div id="bestSellerSection">
            <p className="largeText">Other Books</p>
            <div className="CardContainer">
                    <BookCard book={BookObj[0]} CartClick={CartClickFn} />
                    <BookCard book={BookObj[1]} CartClick={CartClickFn} />
                    <BookCard book={BookObj[2]} CartClick={CartClickFn} />
                    <BookCard book={BookObj[3]} CartClick={CartClickFn} />
                    <BookCard book={BookObj[4]} CartClick={CartClickFn} />
            </div>
        </div>
    );
}