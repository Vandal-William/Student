export function navigate(value){

    const chat = document.getElementById('chat');
    const form_review = document.getElementById('review-form');
    const form_overflow = document.getElementById('overflow-form');

    switch (value) {
        case "tchat":
            chat.style.display = "flex";
            break;
        case "review":
            form_review.style.display = "flex";
            break;
        case "stack-overflow":
            form_overflow.style.display = "flex";
            break;
        case "task":
    
            break;
     
        default:
            break;
    }

}