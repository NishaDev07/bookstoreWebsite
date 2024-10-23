import { useEffect, useState } from "react";
import TR from "./TableRow_Manage";

export default function ManagePage({UploaderID,PageChangeFn}){

    const [BookObj, setBookObj]  = useState([]);
    const [loading, setLoading]  = useState(true);

    async function fetchBooks (){
        try {
            const response = await fetch(`http://localhost:5000/fetchBooksByUploader/${UploaderID}`);
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

    useEffect(()=>{
        fetchBooks();
    },[BookObj])

    async function deleteBook (id){
        try {
            const response = await fetch(`http://localhost:5000/deleteBook/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify()
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert("Selected Book deleted Successfully");
            fetchBooks();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    if(loading){
        return
    }else{
        return(
            <div id="manageSection">
                <p className="largeText">Manage Books</p>
                <table>
                    <tbody>
                    <tr id="firstRow">
                        <th>Sl. No.</th>
                        <th>Book Name</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                    {BookObj.map((book,index)=>(
                        <TR key={index} serial  ={index+1} BookObj={book} deleteFn={deleteBook} pageChangeFn={PageChangeFn} />
                    ))}

                    </tbody>
                    
                </table>
            </div>
        );
    }
}