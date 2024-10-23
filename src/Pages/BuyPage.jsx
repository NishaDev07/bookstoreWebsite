import CartCard from "../Components/Cartcard";
import NavBar from "../Components/Navabr";
import Footer from "../Components/Footer";
import EmptyCart from "../Assets/emptyCart.png";
import { useContext, useEffect, useState } from "react";
import { WishListContext } from "../contexts/WishListContext";
import { shoppingListContext } from "../contexts/ShoppingCartContext";
import { Link } from "react-router-dom";

export default function BuyPage() {
    const { wishList } = useContext(WishListContext);
    const { shoppingList,setshoppingList } = useContext(shoppingListContext);
    const [totalAmount, setTotalAmount] = useState(0);

    const [UniqueList, setUniqueList] = useState([]);
    const [count, setCount] = useState([]);

    useEffect(() => {
        const uniqueItems = [];
        const itemCounts = [];
        let amount = 0;

        shoppingList.forEach(shopItem => {
            const index = uniqueItems.findIndex(item => item._id === shopItem._id);
            if (index === -1) {
                uniqueItems.push(shopItem);
                itemCounts.push(1);
            } else {
                itemCounts[index]++;
            }
            amount += shopItem.Price;
        });

        setUniqueList(uniqueItems);
        setCount(itemCounts);
        setTotalAmount(amount);
    }, [shoppingList]);

    async function updateSoldQty(bookId, newSoldQty) {
        try {
            const response = await fetch(`http://localhost:5000/updateBook/${bookId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ SoldQty: newSoldQty }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const updatedBook = await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    
    async function CompleteTransaction(){
        await UniqueList.map((shop,index)=>{
            updateSoldQty(shop._id,(shop.SoldQty + count[index]));
        })
        alert("Thanks for the Purchase");
        await setshoppingList([]);
    }
   
    if (shoppingList.length === 0) {
        return (
            <>
              <NavBar WishCount={wishList.length} />
                <div id="shoppingCart">
                    <p className="largeText">Your Shopping Cart</p>
                    <img src={EmptyCart} alt="Empty Cart" className="emptyCart"/>
                    <p className="normalText">Looks Like You have not added anything to your cart</p>
                    <p className="normalText">Go ahread and explore our top book Categories</p>
                    <Link to="/Shop"><button className="btn btnBlue">Start Shopping</button></Link>
                </div>
                <Footer />
            </>
        );
    }

        return (
            <>
                <NavBar WishCount={wishList.length} />
                <div id="shoppingCart">
                    <p className="largeText">Your Shopping Cart</p>
                    <div className="cartCardContainer">
                        {UniqueList.map((shop,index) => (
                            <CartCard
                                key={shop._id}
                                book={shop}
                                itemCount = {count[index]}
                            />)
                        )}
                    </div>
                    <p><strong>Total Amount: {totalAmount}</strong></p>
                    <button className="btn btnGreen" onClick={()=>CompleteTransaction()}>Proceed to CheckOut</button>
                </div>
                <Footer />
            </>
    );
}
