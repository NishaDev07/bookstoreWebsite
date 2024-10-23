import { Link } from 'react-router-dom';
import CarouselImage from '../Assets/bookCarousel.svg'

export default function FavouriteSection(){
    return(
        <div id="favouriteSection">
            <img src={CarouselImage} alt='Books' id='BookCarousel' />
            <div id="favouriteRight">
                <p className="heroLargeText">Find Your Favourite <span className="blueText lightBlue">Books Here !</span></p>
                <p className="normalText">Are you fan of a romance, thrillers, history, or fiction? We've got you covered! Dive into our online bookstore and ebook library, and enjoy the ultimate book-reading expereicence at your convenience. Explore with us and fall in love with BookNest!</p>
                <div className="figureBoxContainer">
                    <div className="figureBox">
                        <p className="figure">100+</p>
                        <p className="figureDesc">Book Listing</p>
                    </div>
                    <div className="figureBox">
                        <p className="figure">100+</p>
                        <p className="figureDesc">Registered Users</p>
                    </div>
                    <div className="figureBox">
                        <p className="figure">50+</p>
                        <p className="figureDesc">PDF Downloads</p>
                    </div>
                </div>
                <div className="inputBox">
                    <Link to="/Shop"><button className="btnBlue ightBlueBtn">Explore More</button></Link>
                </div>
            </div>
        </div>
    );
}