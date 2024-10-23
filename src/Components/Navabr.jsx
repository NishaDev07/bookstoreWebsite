import Logo from '../Assets/logo.svg';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({WishCount}){

    useEffect(()=>{
        const WishNumber = document.querySelector("#WishNumber");
        if(WishCount==0){
            WishNumber.style.display = "none";
        }else{
            WishNumber.style.display = "block";
        }
    },[WishCount]);

    return(
        <div id="NavBar">
            <div id="Logo">
                <img id='logoImg' src={Logo} />
                <p id="logoText">BookNest</p>
            </div>
            <div id="Links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/Shop">Shop</Link>
                <Link to="/Login">Sell Your Book</Link>
            </div>
            <div id="ShopButtons">
            <Link to="/WishList">
                <div id="WishCountBox">
                    <i className="fa-solid fa-heart"></i>
                    <p id="WishNumber">{WishCount}</p>
                </div>
            </Link>
                <Link to="/Cart"><i className="fa-solid fa-cart-shopping"></i></Link>
            </div>
        </div>
    );
}