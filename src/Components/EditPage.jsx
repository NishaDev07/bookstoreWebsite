import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EditPage({BookID, pageChangeFn,Uploader}){

    let BookObjectModel = {
        Title: "",
        Price: 0,
        Author: "",
        CoverURL: "",
        PDFURL: "",
        Category: "",
        Description: "",
        SoldQty: 0,
        Uploader: Uploader
    }

    const [formData, setFormData] = useState(BookObjectModel)

    function handleChange(e){
        const {name, value} = e.target;
        
        if(name == "Price"){
            setFormData({...formData,[name]: parseFloat(value)})
        }else{   
            setFormData({...formData, [name]: value})
        }
    }

    function cancelForm(e){
        e.preventDefault();
        pageChangeFn("Manage")
    }

    useEffect(()=>{
        async function fetchBook (){
            try {
                const response = await fetch(`http://localhost:5000/fetchBooks/${BookID}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json()
                const { _id, ...formData } = data;
                setFormData(formData);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        }
        fetchBook();
    },[])
    
    async function submitForm(e){
        e.preventDefault()
        if (!formData.Title || !formData.Author || !formData.CoverURL || !formData.PDFURL || !formData.Category || !formData.Description) {
            alert("Please Fill all the fields")
            return null
        }

        if (formData.Price <= 0){
            alert("Price Can't be negative")
            return null
        }
        
        const response = await fetch(`http://localhost:5000/updateBook/${BookID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json()
        if(data.acknowledged == true){
            alert("Book Updated Successfully")
            pageChangeFn("Manage")
        }
    }

    return(
        <div id="Uploadpage">
            <p className="largeText">Edit Book</p>
            <form>
                <div className="inputRow">
                    <div className="inputBox">
                        <label htmlFor="Title">Book Title</label>
                        <input type="text" placeholder="Book Title" name="Title" value={formData.Title} onChange={handleChange} />
                    </div>
                    <div className="inputBox">
                        <label htmlFor="Author">Book Author</label>
                        <input type="text" placeholder="Book Author" name="Author" value={formData.Author} onChange={handleChange} />
                    </div>
                </div>
                <div className="inputRow">
                    <div className="inputBox">
                        <label htmlFor="CoverURL">Book Image URL</label>
                        <input type="text" placeholder="Book Image URL" name="CoverURL" value={formData.CoverURL} onChange={handleChange} />
                    </div>
                    <div className="inputBox">
                        <label htmlFor="Category">Book Category</label>
                        <select name="Category" value={formData.Category} onChange={handleChange}>
                            <option value="">Select a category</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Non-Fiction">Non-Fiction</option>
                            <option value="Mystery">Mystery</option>
                            <option value="Romance">Romance</option>
                            <option value="Science Fiction">Science Fiction</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Biography">Biography</option>
                            <option value="Autobiography">Autobiography</option>
                            <option value="History">History</option>
                            <option value="Thriller">Thriller</option>
                            <option value="Horror">Horror</option>
                            <option value="Self-Help">Self-Help</option>
                            <option value="Poetry">Poetry</option>
                            <option value="Young Adult">Young Adult</option>
                            <option value="Children's">Children's</option>
                            <option value="Graphic Novels">Graphic Novels</option>
                            <option value="Classics">Classics</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Dystopian">Dystopian</option>
                            <option value="Crime">Crime</option>
                            <option value="Memoir">Memoir</option>
                            <option value="Science">Science</option>
                            <option value="Philosophy">Philosophy</option>
                            <option value="Religion">Religion</option>
                            <option value="Cookbooks">Cookbooks</option>
                            <option value="Travel">Travel</option>
                            <option value="Art">Art</option>
                            <option value="Music">Music</option>
                            <option value="Drama">Drama</option>
                            <option value="Essays">Essays</option>
                        </select>
                    </div>
                </div>
                <div className="inputBox">
                    <label htmlFor="Description">Book Description</label>
                    <textarea placeholder="About your Book" name="Description" value={formData.Description} onChange={handleChange} />
                </div>
                <div className="inputRow">
                    <div className="inputBox">
                        <label htmlFor="PDFURL">Book PDF URL</label>
                        <input type="text" placeholder="Book PDF URL" name="PDFURL" value={formData.PDFURL} onChange={handleChange} />
                    </div>
                    <div className="inputBox">
                        <label htmlFor="Price">Price</label>
                        <input type="number" placeholder="Price" name="Price" value={formData.Price} onChange={handleChange} />
                    </div>
                </div>
                <div className="btnBox">
                    <button className="btn redBtn" onClick={cancelForm}>Cancel</button>
                    <button className="btn blueBtn" onClick={submitForm}>Edit</button>
                </div>
            </form>
        </div>
    );
}