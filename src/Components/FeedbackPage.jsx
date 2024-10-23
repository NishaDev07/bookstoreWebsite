import FeedbackCard from "./FeedbackCard";

export default function Feedbackpage(){
    return(
        <div id="feedbackSection">
            <p className="largeText">Our Customers</p>
            <div id="feedBackCardContainer">
                <FeedbackCard rating={3} feedback={"Great BookStore with a wideselection. The staff is knowledgable and friendly. I always find I am looking for!"} writer={"Alice"} />
                <FeedbackCard rating={5} feedback={"I love the atmosphere and the collection of books available here. The Prices are reasonable and the service is excellent."} writer={"Bob"} />
                <FeedbackCard rating={4} feedback={"The online ordering process was smooth and the delivery was quick. Highly recommend this store for all book lovers!"} writer={"Charlie"} />
            </div>
            <div id="circleBox">
                <div className="circle selectedCircle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
        </div>
    );
}