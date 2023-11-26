export function mainLoading (resultsDiv){ 
    const divContent = document.createElement('div')
    const loadingIndicator = document.createElement("p");
    loadingIndicator.classList.add('loader');
    divContent.classList.add('loaderContent');
    divContent.style.position = "absolute";
    divContent.style.zIndex = "2";
    divContent.style.width = "100%";
    divContent.style.height = "100vh";
    divContent.style.background = "#000";
    divContent.style.display = "flex";
    divContent.style.justifyContent = "center";
    divContent.style.alignItems = "center";
    divContent.appendChild(loadingIndicator)
    resultsDiv.appendChild(divContent);
    return loadingIndicator
}