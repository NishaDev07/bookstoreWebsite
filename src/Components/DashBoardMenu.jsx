import { useEffect, useState } from "react";

export default function DashMenu({PageChangeFn, user, userEmail}){   
    
    return(
        <div id="menuContainer">
            <div id="profileBox">
                <p className="UserName" onClick={()=>PageChangeFn("Home")}>{user}</p>
                <p>{userEmail}</p>
            </div>
            <div id="OptionBox">
                <p className="Option" onClick={()=>PageChangeFn("Upload")}><i className="fa-solid fa-cloud-arrow-up"></i> Upload Books</p>
                <p className="Option" onClick={()=>PageChangeFn("Manage")}><i className="fa-solid fa-archway"></i> Manage Books</p>
                <p className="Option" onClick={()=>PageChangeFn("LogOut")}><i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out</p>
            </div>
            <div id="RefOptionBox">
            <p className="Option"><i className="fa-solid fa-passport"></i> Documentation</p>
            <p className="Option"><i className="fa-solid fa-circle-info"></i> Help</p>
            </div>
        </div>
    );
}