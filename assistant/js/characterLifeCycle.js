const gif = document.querySelector(".assistant");
// const submit_button = document.querySelector('.submit_chat');

let isEating = false
let isSleeping = false
let isFooting = false

export function characterLifeCycle() {

    const now = new Date();
    const dayOfWeek = new Date();

    var day = dayOfWeek.getDay();

    var week = [
        'Dimanche', 
        'Lundi', 
        'Mardi', 
        'Mercredi', 
        'Jeudi', 
        'Vendredi', 
        'Samedi'
    ];

    var nameOfDay = week[day];

    // Obtenez l'heure actuelle (heures et minutes)
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Vérifiez si l'heure actuelle est entre 19h00 (19:00) et 20h00 (20:00)
    if (
        currentHour === 19 && 
        currentMinute >= 0 && 
        currentMinute < 60 && 
        isEating === false ||
        currentHour === 12 && 
        currentMinute >= 0 && 
        currentMinute < 60 && 
        isEating === false ||
        currentHour === 8  && 
        currentMinute >= 0 && 
        currentMinute < 60 && 
        isEating === false
    ) { 
        // submit_button.setAttribute('disabled', true);
        if(
            currentHour === 8 && currentMinute >= 0 && currentMinute < 60 && isEating === false
            
            ){

            gif.style.background = 'url(./gif/Elina/actions/morning_eating.gif) no-repeat';
            gif.style.backgroundSize = "cover";
            gif.style.backgroundPosition = "center";
            isEating = true;
            isSleeping = false;
            isFooting = false;

        }else if (
          
            currentHour === 19 && 
            currentMinute >= 0 && 
            currentMinute < 60 && 
            isEating === false || 
            currentHour === 12 && 
            currentMinute >= 0 && 
            currentMinute < 60 && 
            isEating === false 
            
        ){
            // submit_button.setAttribute('disabled', true);

            if(nameOfDay === 'Lundi'){
              
                gif.style.background = 'url(./gif/Elina/actions/monday_eating.gif) no-repeat';
                gif.style.backgroundSize = "cover"
                gif.style.backgroundPosition = "center";
                isEating = true;
                isSleeping = false;
                isFooting = false;


            }else if (nameOfDay === 'Mardi'){

                gif.style.background = 'url(./gif/Elina/actions/eating.gif) no-repeat';
                gif.style.backgroundSize = "cover"
                gif.style.backgroundPosition = "center";
                isEating = true;
                isSleeping = false;
                isFooting = false;


            }else if (nameOfDay === 'Mercredi'){

                gif.style.background = 'url(./gif/Elina/actions/wednesday_eating.gif) no-repeat';
                gif.style.backgroundSize = "cover"
                gif.style.backgroundPosition = "center";
                isEating = true;
                isSleeping = false;
                isFooting = false;

            }else if (nameOfDay === 'Jeudi'){

                gif.style.background = 'url(./gif/Elina/actions/thursday_eating.gif) no-repeat';
                gif.style.backgroundSize = "cover"
                gif.style.backgroundPosition = "center";
                isEating = true;
                isSleeping = false;
                isFooting = false;


            }else if (nameOfDay === 'Vendredi'){

                gif.style.background = 'url(./gif/Elina/actions/friday_eating.gif) no-repeat';
                gif.style.backgroundSize = "cover"
                gif.style.backgroundPosition = "center";
                isEating = true;
                isSleeping = false;
                isFooting = false;


            }else if (nameOfDay === 'Samedi'){

                gif.style.background = 'url(./gif/Elina/actions/saturday_eating.gif) no-repeat';
                gif.style.backgroundSize = "cover"
                gif.style.backgroundPosition = "center";
                isEating = true;
                isSleeping = false;
                isFooting = false;


            }else if (nameOfDay === 'Dimanche'){

                gif.style.background = 'url(./gif/Elina/actions/sunday_eating.gif) no-repeat';
                gif.style.backgroundSize = "cover"
                gif.style.backgroundPosition = "center";
                isEating = true;
                isSleeping = false;
                isFooting = false;

            }

        }

    }else if (

        currentHour >= 20 && 
        currentHour < 24 && 
        isSleeping === false || 
        currentHour >= 0 && 
        currentHour < 7 && 
        isSleeping === false

    ) {
        // submit_button.setAttribute('disabled', true);

        gif.style.background = 'url(./gif/Elina/actions/sleeping.gif) no-repeat';
        gif.style.backgroundSize = "cover"
        gif.style.backgroundPosition = "center";
        isSleeping = true;
        isEating = false;
        isFooting = false;


    }else if (currentHour >= 7 && currentHour < 8 && isFooting === false) {

        // submit_button.setAttribute('disabled', true);

        gif.style.background = 'url(./gif/Elina/actions/footing.gif) no-repeat';
        gif.style.backgroundSize = "cover"
        gif.style.backgroundPosition = "center";
        isFooting = true;
        isEating = false;
        isSleeping = false;


    }else if(currentHour >= 9 && currentHour < 12  || currentHour >= 13 && currentHour < 19 ){

        // submit_button.removeAttribute('disabled');

        const workActivities = [
            "url(./gif/Elina/Elina.gif) no-repeat",
            'url(./gif/Elina/actions/workInPc.gif) no-repeat',
            'url(./gif/Elina/actions/drawing.gif) no-repeat ',
            'url(./gif/Elina/actions/writing.gif) no-repeat ',
            'url(./gif/Elina/actions/reading.gif) no-repeat ',
            'url(./gif/Elina/actions/workAndPhone.gif no-repeat)'
        ];
        const activity = Math.floor(Math.random() * workActivities.length);
        console.log(activity)
        gif.style.background = workActivities[activity];
        gif.style.backgroundSize = "cover"
        gif.style.backgroundPosition = "center";
        isFooting = false;
        isEating = false;
        isSleeping = false;   
    }
}

export function stopLifeCycle(ID) {
    clearInterval(ID);
}


