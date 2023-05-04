import { useState } from 'react'
import './ThemeChanger.css'
import { themes } from './themes';
import plant0 from "./assets/images/plant-g3819b01e9_640.jpg"
import Selector from './Selector';
import ExampleContent from './ExampleContent';

function ThemeChanger() {
    const [moodState, setMoodState] = useState({name: "neutral", img: plant0});
    const [selected, setSelected] = useState(false)
    
    function onSelect(e) {
        setSelected(true);
        setMoodState({name: themes[e].name, img: themes[e].img});
        console.log(moodState);
    }

    return(
        <div className={`box ${moodState.name}`}>
            <Selector onSelect={onSelect} name={moodState.name} image={moodState.img} selected={selected}/>
            <ExampleContent selected={selected} />
        </div>
    )
}

export default ThemeChanger
