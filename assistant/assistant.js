const gif = document.querySelector(".elina");

let isEating = false
let isSleeping = false
let isFooting = false
let isWorkHour = false
let isThinkink = false
let isDrinkTime = false

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
    

        }else if (currentHour === 19 && currentMinute >= 0 && currentMinute < 60 && isEating === false || currentHour === 12 && currentMinute >= 0 && currentMinute < 60 && isEating === false ){

            if(nameOfDay === 'Lundi'){

                gif.src = './gif/Elina/actions/monday_eating.gif';
                isEating = true;
          

            }else if (nameOfDay === 'Mardi'){

                gif.src = './gif/Elina/actions/eating.gif';
                isEating = true;
              

            }else if (nameOfDay === 'Mercredi'){

                gif.src = './gif/Elina/actions/wednesday_eating.gif';
                isEating = true;
               
            }else if (nameOfDay === 'Jeudi'){

                gif.src = './gif/Elina/actions/thursday_eating.gif';
                isEating = true;
                

            }else if (nameOfDay === 'Vendredi'){

                gif.src = './gif/Elina/actions/friday_eating.gif';
                isEating = true;
              

            }else if (nameOfDay === 'Samedi'){

                gif.src = './gif/Elina/actions/saturday_eating.gif';
                isEating = true;
               

            }else if (nameOfDay === 'Dimanche'){

                gif.src = './gif/Elina/actions/sunday_eating.gif';
                isEating = true;
            
            }

        }

    }else if (

        currentHour >= 20 && currentHour < 24 && isSleeping === false || 
        currentHour >= 0 && currentHour < 7 && isSleeping === false

    ) {
        // Faites quelque chose ici
        gif.src = './gif/Elina/actions/sleeping.gif';
        isSleeping = true;

    }else if (currentHour >= 7 && currentHour < 8 && isFooting === false) {
        // Faites quelque chose ici
        gif.src = './gif/Elina/actions/footing.gif';
        isFooting = true;

    }else{

        if(nameOfDay != "Samedi" && nameOfDay != "Dimanche"){


            if(
                currentHour === 9 && currentMinute >= 15 && currentMinute < 20 && isThinkink === false ||
                currentHour === 10 && currentMinute >= 15 && currentMinute < 20 && isThinkink === false ||
                currentHour === 11 && currentMinute >= 15 && currentMinute < 20 && isThinkink === false ||
                currentHour === 13 && currentMinute >= 15 && currentMinute < 20 && isThinkink === false ||
                currentHour === 14 && currentMinute >= 15 && currentMinute < 20 && isThinkink === false ||
                currentHour === 15 && currentMinute >= 15 && currentMinute < 20 && isThinkink === false ||
                currentHour === 16 && currentMinute >= 15 && currentMinute < 20 && isThinkink === false ||
                currentHour === 9 && currentMinute >= 45 && currentMinute < 50 && isThinkink === false ||
                currentHour === 10 && currentMinute >= 45 && currentMinute < 50 && isThinkink === false ||
                currentHour === 11 && currentMinute >= 45 && currentMinute < 50 && isThinkink === false ||
                currentHour === 13 && currentMinute >= 45 && currentMinute < 50 && isThinkink === false ||
                currentHour === 14 && currentMinute >= 45 && currentMinute < 50 && isThinkink === false ||
                currentHour === 15 && currentMinute >= 45 && currentMinute < 50 && isThinkink === false ||
                currentHour === 17 && currentMinute >= 45 && currentMinute < 50 && isThinkink === false 
                
                ){
    
                gif.src = './gif/Elina/actions/thinking.gif';
                isThinkink = true;
               
                if(currentMinute >= 15 && currentMinute < 20 || currentMinute >= 45 && currentMinute < 50 ){
                    isWorkHour = true;
                }else{
                    isWorkHour = false;
                }

    
            }
            
            else if(
    
                currentHour === 10 && currentMinute >= 30 && currentMinute < 35 && isDrinkTime === false ||
                currentHour === 11 && currentMinute >= 30 && currentMinute < 35 && isDrinkTime === false ||
                currentHour === 13 && currentMinute >= 30 && currentMinute < 35 && isDrinkTime === false ||
                currentHour === 14 && currentMinute >= 30 && currentMinute < 35 && isDrinkTime === false ||
                currentHour === 15 && currentMinute >= 30 && currentMinute < 35 && isDrinkTime === false ||
                currentHour === 16 && currentMinute >= 30 && currentMinute < 35 && isDrinkTime === false
    
                ){
    
                gif.src = './gif/Elina/actions/drink_water.gif';
                isDrinkTime = true

                if(currentMinute >= 30 && currentMinute < 35){
                    isWorkHour = true;
                }else{
                    isWorkHour = false;
                }
              

            }

            else{
                if (
                    !(currentHour === 9 && currentMinute >= 15 && currentMinute < 20 && isThinkink === false ||
                        currentHour === 10 && currentMinute >= 15 && currentMinute < 20 && isThinkink === false ||
                        currentHour === 11 && currentMinute >= 15 && currentMinute < 20 && isThinkink === false ||
                        currentHour === 13 && currentMinute >= 15 && currentMinute < 20 && isThinkink === false ||
                        currentHour === 14 && currentMinute >= 15 && currentMinute < 20 && isThinkink === false ||
                        currentHour === 15 && currentMinute >= 15 && currentMinute < 20 && isThinkink === false ||
                        currentHour === 16 && currentMinute >= 15 && currentMinute < 20 && isThinkink === false ||
                        currentHour === 9 && currentMinute >= 45 && currentMinute < 50 && isThinkink === false ||
                        currentHour === 10 && currentMinute >= 45 && currentMinute < 50 && isThinkink === false ||
                        currentHour === 11 && currentMinute >= 45 && currentMinute < 50 && isThinkink === false ||
                        currentHour === 13 && currentMinute >= 45 && currentMinute < 50 && isThinkink === false ||
                        currentHour === 14 && currentMinute >= 45 && currentMinute < 50 && isThinkink === false ||
                        currentHour === 15 && currentMinute >= 45 && currentMinute < 50 && isThinkink === false ||
                        currentHour === 17 && currentMinute >= 12 && currentMinute < 13 && isThinkink === false) &&
                      !(currentHour === 10 && currentMinute >= 30 && currentMinute < 35 && isDrinkTime === false ||
                        currentHour === 11 && currentMinute >= 30 && currentMinute < 35 && isDrinkTime === false ||
                        currentHour === 13 && currentMinute >= 30 && currentMinute < 35 && isDrinkTime === false ||
                        currentHour === 14 && currentMinute >= 30 && currentMinute < 35 && isDrinkTime === false ||
                        currentHour === 15 && currentMinute >= 30 && currentMinute < 35 && isDrinkTime === false)   

                ){
                
                    if(isWorkHour === false){
                        gif.src = './gif/Elina/Elina.gif';
                        isWorkHour = true
                        isDrinkTime = false
                        isThinkink = false;

                    }
                }
            }
            
        }
        
     
    }
}

setInterval(updateImage, 1000) ; // Mise à jour toutes les 1000 millisecondes (1 seconde)
