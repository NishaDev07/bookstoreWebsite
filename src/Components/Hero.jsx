import BookImages from '../Assets/BooksHero.svg';

export default function Hero(){
    return(
        <div id="HeroSection">
            <div id="heroLeft">
                <p className="heroLargeText">Buy and Sell Your Books <span className="blueText">for the Best Prices</span></p>
                <p className="normalText">Welcome to Our Bookstore! Here, you can find a wide range of books at unbatable prices. Whether you are looking to buy or sell, we have got you covered. Explore our collection, from bestsellers to rare finds, and enjoy the convenience of shopping online.</p>
                <div className="inputBoxH">
                    <input type="text" className="inputField" placeholder='Search a Book' />
                    <button className="btnBlue">Search</button>
                </div>
            </div>
            <img src={BookImages} id='BookImages' />
        </div>
    )
}