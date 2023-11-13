const gif = document.querySelector(".elina");

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
        if(
            currentHour === 8 && 
            currentMinute >= 0 && 
            currentMinute < 60 && 
            isEating === false
            
            ){

            gif.src = './gif/Elina/actions/morning_eating.gif';
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
               
            if(nameOfDay === 'Lundi'){
              
                gif.src = './gif/Elina/actions/monday_eating.gif';
                isEating = true;
                isSleeping = false;
                isFooting = false;


            }else if (nameOfDay === 'Mardi'){

                gif.src = './gif/Elina/actions/eating.gif';
                isEating = true;
                isSleeping = false;
                isFooting = false;


            }else if (nameOfDay === 'Mercredi'){

                gif.src = './gif/Elina/actions/wednesday_eating.gif';
                isEating = true;
                isSleeping = false;
                isFooting = false;

            }else if (nameOfDay === 'Jeudi'){

                gif.src = './gif/Elina/actions/thursday_eating.gif';
                isEating = true;
                isSleeping = false;
                isFooting = false;


            }else if (nameOfDay === 'Vendredi'){

                gif.src = './gif/Elina/actions/friday_eating.gif';
                isEating = true;
                isSleeping = false;
                isFooting = false;


            }else if (nameOfDay === 'Samedi'){

                gif.src = './gif/Elina/actions/saturday_eating.gif';
                isEating = true;
                isSleeping = false;
                isFooting = false;


            }else if (nameOfDay === 'Dimanche'){

                gif.src = './gif/Elina/actions/sunday_eating.gif';
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
        // Faites quelque chose ici
        gif.src = './gif/Elina/actions/sleeping.gif';
        isSleeping = true;
        isEating = false;
        isFooting = false;


    }else if (currentHour >= 7 && currentHour < 8 && isFooting === false) {
        // Faites quelque chose ici
        gif.src = './gif/Elina/actions/footing.gif';
        isFooting = true;
        isEating = false;
        isSleeping = false;


    }else if(currentHour >= 9 && currentHour < 12  || currentHour >= 13 && currentHour < 19 ){
        const workActivities = [
            "./gif/Elina/Elina.gif",
            './gif/Elina/actions/workInPc.gif',
            './gif/Elina/actions/drawing.gif',
            './gif/Elina/actions/writing.gif',
            './gif/Elina/actions/reading.gif',
            './gif/Elina/actions/workAndPhone.gif'
        ];
        const activity = Math.floor(Math.random() * workActivities.length);
        console.log(activity)
        gif.src = workActivities[activity];
        isFooting = false;
        isEating = false;
        isSleeping = false;   
    }
}

export function stopLifeCycle(ID) {
    clearInterval(ID);
}


