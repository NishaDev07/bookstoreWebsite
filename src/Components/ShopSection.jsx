import ShopBookCard from "./ShopBookCard";
import { useEffect, useState } from "react";

export default function ShopSection({CartClickFn}){
    
    const [BookObj, setBookObj] = useState([])
    const [loading, setLoading] =  useState(true)

    useEffect(()=>{
        async function fetchBooks (){
            try {
                const response = await fetch('http://localhost:5000/fetchAllBooks');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json()
                setBookObj(data)
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }finally{
                setLoading(false)
            }
        }
        fetchBooks();
    },[])

    if(loading){
        return
    }

    if(BookObj.length == 0){
        <div id="bestSellerSection">
            <p className="largeText">Feel Free to Shop Books</p>
            <p>No Books Available</p>
        </div>
    }

    return(
        <div id="shopSection">
            <p className="largeText">Feel Free to Shop Books</p>
            <div className="CardContainer">
                    {BookObj.map((book,index)=>(
                        <ShopBookCard key={index} book={book} CartClick={CartClickFn} />
                    ))}
            </div>
        </div>
    );
}