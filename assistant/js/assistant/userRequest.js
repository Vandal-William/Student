const chatHistory = document.querySelector(".chat-history");
const pseudo = sessionStorage.getItem('pseudo') ? sessionStorage.getItem('pseudo') : "vous";
export function userRequest(message, container) {

    const chatLine = document.createElement('p');
    const chatLineSpan = document.createElement('span')
    chatLineSpan.textContent = `${pseudo} :`;
    chatLineSpan.style.fontWeight = "bold";
    chatLineSpan.style.color = "green";
    chatLine.textContent = `  ${message}`;
    chatLine.style.color = "#fff";
    chatLine.style.padding = "15px 15px 5px 15px";
    chatLine.insertBefore(chatLineSpan, chatLine.firstChild);
    container.appendChild(chatLine);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}