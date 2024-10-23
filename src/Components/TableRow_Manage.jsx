export default function TR({serial,BookObj,deleteFn,pageChangeFn}){
    const navURl = "Edit" + BookObj._id
    return(
        <tr>
            <td>{serial}</td>
            <td>{BookObj.Title}</td>
            <td>{BookObj.Author}</td>
            <td>{BookObj.Category}</td>
            <td>{BookObj.Price}</td>
            <td>
                <button className="greenButton" onClick={()=>{pageChangeFn(navURl)}}>Edit</button>
                <button className="redButton" onClick={()=>deleteFn(BookObj._id)}>Delete</button>
            </td>
        </tr>
    );
}