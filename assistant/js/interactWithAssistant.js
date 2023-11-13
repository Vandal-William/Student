
const gif = document.querySelector(".elina");
const chatHistory = document.querySelector(".chat_history");

export function interactWithAssistant(message) {
  
    if(message !== ""){
      
        const chatLine = document.createElement('p');
        const chatLineSpan = document.createElement('span')
        chatLineSpan.textContent = `(@any) ${sessionStorage.getItem('pseudo')} :`;
        chatLineSpan.style.fontWeight = "bold";
        chatLineSpan.style.color = "green";
        chatLine.textContent = `  ${message}`;
        chatLine.style.padding = "15px 15px 5px 15px";
        chatLine.insertBefore(chatLineSpan, chatLine.firstChild);
        chatHistory.appendChild(chatLine);
        
    }

    if (message.toLowerCase().includes("bonjour") ) {
        setTimeout(()=>{
            gif.src = './gif/Elina/actions/hello.gif';
            assistantResponse(`Bonjour ${sessionStorage.getItem('pseudo')} que puis-je faire pour vous ?`);
        }, 1000)
        setTimeout(() => {
            gif.src = './gif/Elina/Elina.gif';
        }, 3000)
        setTimeout(() => {
            sessionStorage.setItem('isdrinking', "false");
        }, 4000)
     
    }
    
    function assistantResponse(message) {
        const assistantLine = document.createElement('p');
        const assistantLineSpan = document.createElement('span')
        assistantLineSpan.textContent = ` (@any) Elina :`;
        assistantLineSpan.style.fontWeight = "bold";
        assistantLineSpan.style.color = "red";
        assistantLine.textContent = `  ${message}`;
        assistantLine.style.padding = "15px 15px 5px 15px";
        assistantLine.insertBefore(assistantLineSpan, assistantLine.firstChild);
        chatHistory.appendChild(assistantLine);
    }
}

