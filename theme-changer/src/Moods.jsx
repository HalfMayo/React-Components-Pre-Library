import { themes } from './themes';

export default function Moods({name, onSelect}) {
    return(
        <div>
            {themes.map((mood, i) =>
                <button aria-label={`${name} theme`} className={`mood-button ${name === mood.name ? `mood-${mood.name}` : ""}`} key={i} onClick={e => onSelect(e.target.closest(`button`).value)} value={i}>{mood.svg}</button>
            )}
        </div>
    )
}