const chatHistory = document.querySelector(".chat_history");

export function userRequest(message, container, tag) {

    const chatLine = document.createElement('p');
    const chatLineSpan = document.createElement('span')
    chatLineSpan.textContent = `(${tag}) ${sessionStorage.getItem('pseudo')} :`;
    chatLineSpan.style.fontWeight = "bold";
    chatLineSpan.style.color = "green";
    chatLine.textContent = `  ${message}`;
    chatLine.style.padding = "15px 15px 5px 15px";
    chatLine.insertBefore(chatLineSpan, chatLine.firstChild);
    container.appendChild(chatLine);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}