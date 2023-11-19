  
const chatHistory = document.querySelector(".chat-history");

export function assistantResponse(message, container) {
    
    const assistantLine = document.createElement('p');
    const assistantLineSpan = document.createElement('span')
    assistantLineSpan.textContent = `Amanda :`;
    assistantLineSpan.style.fontWeight = "bold";
    assistantLineSpan.style.color = "orange";
    assistantLine.textContent = `  ${message}`;
    assistantLine.style.color = "#fff";
    assistantLine.style.padding = "15px 15px 5px 15px";
    assistantLine.insertBefore(assistantLineSpan, assistantLine.firstChild);
    container.appendChild(assistantLine);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}