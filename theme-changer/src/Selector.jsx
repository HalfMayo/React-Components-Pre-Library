import Moods from "./Moods"

export default function Selector({onSelect, name, image, selected}) {
    return(
        <>
            <div className="card-top">
                <img src={image} alt="Background Image"></img>
                <p className="overlay">Image by <a href="https://pixabay.com/users/biancavandijk-9606149/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=7893938">Bianca Van Dijk</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=7893938">Pixabay</a></p>
            </div>
            <div className="margins more-margins">
                <h2>How do you feel today?</h2>
                <h3>Choose your mood</h3>
                <Moods name={name} onSelect={onSelect} />
            </div>
        </>
    )
}