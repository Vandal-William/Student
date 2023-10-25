export function activeMarked(url){
    const urlPage = url;
    const markdownFileURL = urlPage
    const markdownPreview = document.getElementById("markdownPreview");
    fetch(markdownFileURL)
        .then(response => response.text())
        .then(markdownText => {
            var htmlText = marked(markdownText);
            markdownPreview.innerHTML = htmlText;
        })
        .catch(error => {
            console.error('Une erreur s\'est produite :', error);
        });
}
