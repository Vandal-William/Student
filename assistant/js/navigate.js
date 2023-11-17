export function navigate(value){

    const chat = document.querySelector('.chat');

    switch (value) {
        case "tchat":
            chat.classList.toggle('display-chat');
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