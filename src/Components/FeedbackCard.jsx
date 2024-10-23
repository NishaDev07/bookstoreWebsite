import Profile from '../Assets/profile.png'

export default function FeedbackCard({rating, feedback, writer}){
    return(
        <div id="feedbackCard">
            <div id="starBox">
                {[...Array(rating)].map((_, index) => (
                    <i key={index} className="fa-solid fa-star"></i>
                ))}
            </div>
            <p className="feedBack">
                {feedback}
            </p>
            <div id="avatarBox">
                <img src={Profile} alt='Profile Avatar' />
                <p className="writer">{writer}</p>
            </div>
        </div>
    );
}