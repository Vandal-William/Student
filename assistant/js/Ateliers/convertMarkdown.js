export function convertMarkdown(url){

    const markdownPreview = document.getElementById("markdownPreview");
    fetch(url)
        .then(response => response.text())
        .then(text => {
            const html = marked(text);
            markdownPreview.innerHTML = html;
       })
        .catch(error => {
        console.error('Une erreur s\'est produite :', error);
        });
}
