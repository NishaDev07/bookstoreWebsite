import NavBar from "./Navabr";
import { WishListContext } from "../contexts/WishListContext";
import { useContext } from "react";
import DashMenu from "./DashBoardMenu";

export default function DashContent({Component, PageChangeFn, user, userEmail}){

    const {wishList} = useContext(WishListContext)
    
    return(
        <div id="Dasboard">
            <NavBar WishCount={wishList.length} />
            <div id="DashBody">
                <DashMenu PageChangeFn = {PageChangeFn} user={user} userEmail={userEmail} />
                <div id="dashContent">
                   {Component}
                </div>
            </div>
        </div>
    );
}