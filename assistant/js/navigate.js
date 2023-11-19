export function navigate(value){

    const chat = document.getElementById('chat');

    switch (value) {
        case "tchat":
            chat.style.display = "flex";
            break;
        case "review":
            
            break;
        case "stack-overflow":
           
            break;
        case "task":
    
            break;
     
        default:
            break;
    }

}