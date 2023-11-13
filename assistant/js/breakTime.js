
import { characterLifeCycle } from "./characterLifeCycle.js";

const gif = document.querySelector(".elina");
sessionStorage.setItem('isdrinking', false);


export function breakTime() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if(currentHour >= 9 && currentHour < 12 || currentHour >= 13 && currentHour < 17){

        if(currentMinute < 10 && sessionStorage.getItem('isdrinking') === "false"){

            gif.src = './gif/Elina/actions/drink_water.gif';
            sessionStorage.setItem('isdrinking', "true");

        }else if (currentMinute >= 10){
            sessionStorage.setItem('isdrinking', "false");
            characterLifeCycle()

        }
    }else {
        characterLifeCycle()
    }
}
