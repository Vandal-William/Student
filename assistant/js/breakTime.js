
import { characterLifeCycle } from "./characterLifeCycle.js";

// const submit_button = document.querySelector('.submit_chat');
const gif = document.querySelector(".assistant");

export function breakTime() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    sessionStorage.setItem('isdrinking', "false");

    if(currentHour >= 9 && currentHour < 12 || currentHour >= 13 && currentHour < 19){
     
        if(currentMinute < 10 && sessionStorage.getItem('isdrinking') === "false"){

            // submit_button.setAttribute('disabled', true);
            
            gif.style.background = 'url(./gif/Elina/actions/drink_water.gif) no-repeat';
            gif.style.backgroundSize = "cover"
            gif.style.backgroundPosition = "center";

            sessionStorage.setItem('isdrinking', "true");

        }else if (currentMinute >= 10){
            
            sessionStorage.setItem('isdrinking', "false");
            characterLifeCycle()

        }
    }else {
        characterLifeCycle()
    }
}
