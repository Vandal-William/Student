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

    
}


