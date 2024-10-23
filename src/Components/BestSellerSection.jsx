import BookCard from "./BookCard";
import { useEffect, useState } from "react";

export default function BestSeller({CartClickFn}){
    
    const [BSBookObj, setBSBookObj] = useState([])
    const [loading, setLoading] =  useState(true)

    useEffect(()=>{
        async function fetchBestSellerBooks (){
            try {
                const response = await fetch('http://localhost:5000/fetchFiveBestSellerBooks');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json()
                setBSBookObj(data)
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

    if(BSBookObj.length == 0){
        <div id="bestSellerSection">
            <p className="largeText">Best Seller Books</p>
            <p>No Best Seller Book Available</p>
        </div>
    }

    return(
        <div id="bestSellerSection">
            <p className="largeText">Best Seller Books</p>
            <div className="CardContainer">
                    <BookCard book={BSBookObj[0]} CartClick={CartClickFn} />
                    <BookCard book={BSBookObj[1]} CartClick={CartClickFn} />
                    <BookCard book={BSBookObj[2]} CartClick={CartClickFn} />
                    <BookCard book={BSBookObj[3]} CartClick={CartClickFn} />
                    <BookCard book={BSBookObj[4]} CartClick={CartClickFn} />
            </div>
        </div>
    );
}