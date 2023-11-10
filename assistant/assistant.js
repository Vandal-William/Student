const gif = document.querySelector(".elina");

let isEating = false
let isSleeping = false
let isFooting = false
let isWorkHour = false
let isThinkink = false


function updateImage() {

    const now = new Date();
    const dayOfWeek = new Date();

    var day = dayOfWeek.getDay();

    var week = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    var nameOfDay = week[day];

    // Obtenez l'heure actuelle (heures et minutes)
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Vérifiez si l'heure actuelle est entre 19h00 (19:00) et 20h00 (20:00)
    if (
        currentHour === 19 && currentMinute >= 0 && currentMinute < 60 && isEating === false ||
        currentHour === 12 && currentMinute >= 0 && currentMinute < 60 && isEating === false ||
        currentHour === 8 && currentMinute >= 0 && currentMinute < 60 && isEating === false
    ) { 
        if(currentHour === 8 && currentMinute >= 0 && currentMinute < 60 && isEating === false){

            gif.src = './gif/Elina/actions/morning_eating.gif';
            isEating = true;
            isSleeping = false;
            isFooting = false;
            isWorkHour = false;

        }else if (currentHour === 19 && currentMinute >= 0 && currentMinute < 60 && isEating === false || currentHour === 12 && currentMinute >= 0 && currentMinute < 60 && isEating === false ){

            if(nameOfDay === 'Lundi'){

                gif.src = './gif/Elina/actions/monday_eating.gif';
                isEating = true;
                isSleeping = false;
                isFooting = false;
                isWorkHour = false;

            }else if (nameOfDay === 'Mardi'){

                gif.src = './gif/Elina/actions/eating.gif';
                isEating = true;
                isSleeping = false;
                isFooting = false;
                isWorkHour = false;

            }else if (nameOfDay === 'Mercredi'){

                gif.src = './gif/Elina/actions/wednesday_eating.gif';
                isEating = true;
                isSleeping = false;
                isFooting = false;
                isWorkHour = false;
            }else if (nameOfDay === 'Jeudi'){

                gif.src = './gif/Elina/actions/thursday_eating.gif';
                isEating = true;
                isSleeping = false;
                isFooting = false;
                isWorkHour = false;

            }else if (nameOfDay === 'Vendredi'){

                gif.src = './gif/Elina/actions/friday_eating.gif';
                isEating = true;
                isSleeping = false;
                isFooting = false;
                isWorkHour = false;

            }else if (nameOfDay === 'Samedi'){

                gif.src = './gif/Elina/actions/saturday_eating.gif';
                isEating = true;
                isSleeping = false;
                isFooting = false;
                isWorkHour = false;

            }else if (nameOfDay === 'Dimanche'){

                gif.src = './gif/Elina/actions/sunday_eating.gif';
                isEating = true;
                isSleeping = false;
                isFooting = false;
                isWorkHour = false;
            }

        }

    }else if (

        currentHour >= 20 && currentHour < 24 && isSleeping === false || 
        currentHour >= 0 && currentHour < 7 && isSleeping === false

    ) {
        // Faites quelque chose ici
        gif.src = './gif/Elina/actions/sleeping.gif';
        isSleeping = true;
        isEating = false;
        isFooting = false;
        isWorkHour = false;

    }else if (currentHour >= 7 && currentHour < 8 && isFooting === false) {
        // Faites quelque chose ici
        gif.src = './gif/Elina/actions/footing.gif';
        isFooting = true;
        isEating = false;
        isSleeping = false;
        isWorkHour = false;

    }else{
        
        if(currentHour >= 9 && currentHour < 12 && isWorkHour === false || currentHour >= 13 && currentHour < 17 && isWorkHour === false){

            gif.src = './gif/Elina/Elina.gif';
            isWorkHour = true;
            isFooting = false;
            isEating = false;
            isSleeping = false;
            isThinkink = false;

        }
        
        else if(currentHour === 11 && currentMinute >= 40 && currentMinute < 45 && isThinkink === false){

            gif.src = './gif/Elina/actions/thinking.gif';

            isThinkink = true;
            isWorkHour = true;
            isFooting = false;
            isEating = false;
            isSleeping = false;
        }
    }
}

setInterval(updateImage, 1000) ; // Mise à jour toutes les 1000 millisecondes (1 seconde)
