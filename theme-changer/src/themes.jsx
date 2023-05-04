import plant1 from "./assets/images/plants-g06808bf40_640.jpg"
import { ReactComponent as Enthus } from "./assets/svg/enthus-emoji-svgrepo-com.svg"
import plant2 from "./assets/images/plants-gf01fd8c65_640.jpg"
import { ReactComponent as Serene } from "./assets/svg/serene-emoji-svgrepo-com.svg"
import plant3 from "./assets/images/purple-gded271fb2_640.jpg"
import { ReactComponent as Gloomy } from "./assets/svg/gloomy-svgrepo-com.svg"
import plant4 from "./assets/images/seeds-gc0db0f20b_640.jpg"
import { ReactComponent as Grumpy } from "./assets/svg/grumpy-emoji-svgrepo-com.svg"
import plant5 from "./assets/images/seeds-g891fc4901_640.jpg"
import { ReactComponent as Bored } from "./assets/svg/bored-emoji-svgrepo-com.svg"


export const themes = [
    {
        name: "enthusiast",
        img: plant1,
        svg: <Enthus />
    }, {
        name: "serene",
        img: plant2,
        svg: <Serene />
    }, {
        name: "gloomy",
        img: plant3,
        svg: <Gloomy />
    }, {
        name: "grumpy",
        img: plant4,
        svg: <Grumpy />
    }, {
        name: "bored",
        img: plant5,
        svg: <Bored />
    }, 
]