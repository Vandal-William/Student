  
const chatHistory = document.querySelector(".chat_history");

export function assistantResponse(message, container, tag) {
    
    const assistantLine = document.createElement('p');
    const assistantLineSpan = document.createElement('span')
    assistantLineSpan.textContent = ` (${tag}) Elina :`;
    assistantLineSpan.style.fontWeight = "bold";
    assistantLineSpan.style.color = "red";
    assistantLine.textContent = `  ${message}`;
    assistantLine.style.padding = "15px 15px 5px 15px";
    assistantLine.insertBefore(assistantLineSpan, assistantLine.firstChild);
    container.appendChild(assistantLine);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}