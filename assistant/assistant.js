const gif = document.querySelector(".elina");

let isEating = false
let isSleeping = false
let isFooting = false
let isWorkHour = false
// Fonction pour mettre à jour l'image en fonction de l'heure
function updateImage() {
  // Obtenez la date actuelle
  const now = new Date();

  // Obtenez l'heure actuelle (heures et minutes)
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Vérifiez si l'heure actuelle est entre 19h00 (19:00) et 20h00 (20:00)
    if (
        currentHour === 19 && currentMinute >= 0 && currentMinute < 60 && isEating === false ||
        currentHour === 12 && currentMinute >= 0 && currentMinute < 60 && isEating === false
    ) {
        gif.src = './gif/Elina/actions/eating.gif';
        isEating = true;
        isSleeping = false;
        isFooting = false;
        isWorkHour = false;

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

    }else if (currentHour >= 7 && currentHour < 9 && isFooting === false) {
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
        }
    }
}

setInterval(updateImage, 1000) ; // Mise à jour toutes les 1000 millisecondes (1 seconde)
