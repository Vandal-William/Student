export function loading (resultsDiv){ 
    resultsDiv.innerHTML = '';
    const loadingIndicator = document.createElement('p');
    loadingIndicator.classList.add('loader');
    resultsDiv.appendChild(loadingIndicator);
    return loadingIndicator
}