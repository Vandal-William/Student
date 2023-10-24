function updatePreview() {
    const htmlContent = htmlEditor.getValue();
    const cssContent = "<style>" + cssEditor.getValue() + "</style>";
    const jsContent = "<script>" + jsEditor.getValue() + "</script";
    const combinedContent = htmlContent + cssContent + jsContent;

    // Définir le contenu combiné dans l'éditeur previewEditor
    previewEditor.setValue(combinedContent);

    // Obtenir le contenu interprété de l'éditeur et l'afficher dans la div preview-content
    const previewContent = document.getElementById("preview-content");
    previewContent.innerHTML = previewEditor.getValue();
}

// Fonction pour ouvrir un onglet
function openTab(tabName) {
    let i;
    const tabcontent = document.querySelectorAll('.tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    const tablinks = document.querySelectorAll('.tablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = '#f1f1f1';
    }
    if (tabName === "preview") {
        updatePreview();
    }
    document.getElementById(tabName + 'Tab').style.display = 'block';
}
  
// Initialisation des éditeurs Ace
const htmlEditor = ace.edit('htmlEditor');
htmlEditor.session.setMode('ace/mode/html');
htmlEditor.setOption("mergeUndoDeltas", "always");
htmlEditor.setOptions({
    autoScrollEditorIntoView: true,
    copyWithEmptySelection: true,
});
const content = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
`
htmlEditor.setValue(content);

const cssEditor = ace.edit('cssEditor');
cssEditor.session.setMode('ace/mode/css');
cssEditor.setOption("mergeUndoDeltas", "always");
cssEditor.setOptions({
    autoScrollEditorIntoView: true,
    copyWithEmptySelection: true,
});

const jsEditor = ace.edit('jsEditor');
jsEditor.session.setMode('ace/mode/javascript');
jsEditor.setOption("mergeUndoDeltas", "always");
jsEditor.setOptions({
    autoScrollEditorIntoView: true,
    copyWithEmptySelection: true,
});

const previewEditor = ace.edit('previewEditor');
jsEditor.session.setMode('ace/mode/html');
jsEditor.setOption("mergeUndoDeltas", "always");
jsEditor.setOptions({
    autoScrollEditorIntoView: true,
    copyWithEmptySelection: true,
});
  

const body = document.querySelector('body');
const resultDiv = document.querySelector('#result');

const resultH1 = document.createElement('p');

const consigneBlock = document.querySelector('#consigne');
consigneBlock.style.border = "1px solid black";
consigneBlock.style.padding = "10px";
consigneBlock.style.marginBottom = "10px";
consigneBlock.style.marginTop = "10px";

const verifyButton = document.querySelector('#verify-button');
verifyButton.textContent = "Vérifier l'exercice";
verifyButton.style.backgroundColor = "green";
verifyButton.style.border = "none";
verifyButton.style.padding = "10px";
verifyButton.style.cursor = "pointer";


const tab = [
    "Créer un formulaire de contact.",
    "Ajouter un champ de texte pour le nom d'utilisateur.",
    "Ajouter un champ email pour l'email de l'utilisateur.",
    "Ajouter un champ pour écrire un message sur plusieurs lignes.",
    "Ajouter un bouton pour soumettre le formulaire.",
    "Chaque champ doit avoir un label.",
];


for (let index = 0; index < tab.length; index++) {
    const element = tab[index];
    const rule = document.createElement('p');
    rule.textContent = element;
    consigneBlock.appendChild(rule);
    
}

function checkResult() {

    resultDiv.innerHTML = '';
    const editorContent = htmlEditor.getValue();
    const containsForm = /<form[^>]*>/i.test(editorContent);
    const inputTextFound = /<input.*?type="text"/.test(editorContent);
    const inputEmailFound = /<input.*?type="email"/.test(editorContent);
    const textareaFound = /<textarea/.test(editorContent);
    const containsSubmit = /<input[^>]*type=["']?submit["']?|<button[^>]*type=["']?submit["']?/i.test(editorContent);

    // Utilisez des expressions régulières pour rechercher les éléments HTML correspondants.
    const inputTextMatches = editorContent.match(/<input.*?type="text".*?id="([^"]+)"/);
    const inputEmailMatches = editorContent.match(/<input.*?type="email".*?id="([^"]+)"/);
    const textareaMatches = editorContent.match(/<textarea.*?id="([^"]+)"/);

    // Récupérez les valeurs des attributs "id" s'ils ont été trouvés.
    const inputTextId = inputTextMatches ? inputTextMatches[1] : null;
    const inputEmailId = inputEmailMatches ? inputEmailMatches[1] : null;
    const textareaId = textareaMatches ? textareaMatches[1] : null;

    // Utilisez des expressions régulières pour rechercher les balises <label> avec l'attribut "for" correspondant aux "id".
    const labelForInputTextMatches = editorContent.match(new RegExp(`<label[^>]*for=["']${inputTextId}["']`));
    const labelForInputEmailMatches = editorContent.match(new RegExp(`<label[^>]*for=["']${inputEmailId}["']`));
    const labelForTextareaMatches = editorContent.match(new RegExp(`<label[^>]*for=["']${textareaId}["']`));


    if (!containsForm) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "L'éditeur ne contient pas de formulaire.";
        resultDiv.appendChild(resultRow);
    }
    if (!inputTextFound) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "L'éditeur ne contient pas un champ texte ";
        resultDiv.appendChild(resultRow);
    }
    if (!inputEmailFound) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "L'éditeur ne contient pas un champ email ";
        resultDiv.appendChild(resultRow);
    }
    if (!textareaFound) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "L'éditeur ne contient pas champ pour écrire un message sur plusieurs lignes ";
        resultDiv.appendChild(resultRow);
    }
    if (!containsSubmit) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "L'éditeur ne contient pas un bouton pour soumettre le formulaire.";
        resultDiv.appendChild(resultRow);
    }
    if(!labelForInputTextMatches){
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "L'éditeur ne contient pas de label pour le champ texte ou il n'est pas bien définie";
        resultDiv.appendChild(resultRow);
    }
    if(!labelForInputEmailMatches){
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "L'éditeur ne contient pas de label pour le champ email ou il n'est pas bien définie";
        resultDiv.appendChild(resultRow);
    }
    if(!labelForTextareaMatches){
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "L'éditeur ne contient pas de label pour le champ message ou il n'est pas bien définie";
        resultDiv.appendChild(resultRow);

    }
    if(containsForm && inputTextFound && inputEmailFound && textareaFound && containsSubmit && labelForInputTextMatches && labelForInputEmailMatches && labelForTextareaMatches){
        const resultRow = document.createElement('p');
        resultRow.style.color = "green";
        resultRow.textContent = "Bravos vous avez terminer l'exercice";
        resultDiv.appendChild(resultRow);
    }



}

body.appendChild(verifyButton);


verifyButton.addEventListener("click", checkResult);