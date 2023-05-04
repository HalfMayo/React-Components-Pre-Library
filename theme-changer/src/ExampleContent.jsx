import { ReactComponent as Write } from './assets/svg/write-svgrepo-com.svg'

export default function ExampleContent({selected}) {
    return(
        <div className={`order ${selected ? "" : "hide"}`}>
                <p>Here is a brief preview of a bunch of elements: buttons, paragraphs, text areas and checkboxes.</p>
                <div className="example-text">
                    <textarea></textarea>
                    <button aria-label="Fake Button">
                        <Write />
                    </button>
                </div>
                <div className="daytype">
                    <p>What did you do today?</p>
                    <div className="boxes">
                        <label className="checkbox-container" htmlFor="work">Work
                            <input type="checkbox" id="work" name="work"/>
                            <span className="checkbox"></span>
                        </label>
                        <label className="checkbox-container" htmlFor="play">Play
                            <input type="checkbox" id="play" name="play"/>
                            <span className="checkbox"></span>
                        </label>
                        <label className="checkbox-container" htmlFor="sleep">Sleep
                            <input type="checkbox" id="sleep" name="sleep"/>
                            <span className="checkbox"></span>
                        </label>
                    </div>
                </div>
                <div className="buttons">
                    <button className="action outlined">Action</button>
                    <button className="action filled">Action</button>
                </div>
            </div>
    )
}