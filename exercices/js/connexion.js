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
    "Créer un formulaire ", 
    "Celui-ci doit avoir un champ texte ", 
    "Il dois y avoir un champ pour le mot de passe",
    "Et enfin il doit y avoir un bouton de soumission du formulaire"
];


for (let index = 0; index < tab.length; index++) {
    const element = tab[index];
    const rule = document.createElement('p');
    rule.style.marginTop= "10px"
    rule.textContent = element;
    consigneBlock.appendChild(rule);
    
}

function checkResult() {

    resultDiv.innerHTML = '';

    const editorContent = htmlEditor.getValue();
    // Vérifiez si le contenu de l'éditeur contient un formulaire HTML
    const containsForm = /<form[^>]*>/.test(editorContent);
    // Vérifiez si le contenu de l'éditeur contient un champ de saisie de texte (input de type texte)
    const containsTextInput = /<input[^>]*type=["']?text["']?[^>]*>/.test(editorContent);
    // Vérifiez si le contenu de l'éditeur contient un champ de saisie de type "password"
    const containsPasswordInput = /<input[^>]*type=["']?password["']?[^>]*>/.test(editorContent);
    // Vérifiez si le contenu de l'éditeur contient soit une balise <button> soit un champ de saisie de type "submit"
    const containsButtonOrSubmitInput = /<button[^>]*>|<input[^>]*type=["']?submit["']?[^>]*>/.test(editorContent); 

    if (!containsForm) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "L'éditeur ne contient pas un formulaire HTML.";
        resultDiv.appendChild(resultRow);
    }

    if (!containsTextInput) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "L'éditeur ne contient pas un champ de saisie de texte";
        resultDiv.appendChild(resultRow);
    }

    if (!containsPasswordInput) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent ="L'éditeur ne contient pas un champ de saisie de mot de passe";
        resultDiv.appendChild(resultRow);
    }

    if (!containsButtonOrSubmitInput) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "L'éditeur ne contient pas un bouton de soumition de formulaire";
        resultDiv.appendChild(resultRow);
    }

    if(containsForm && containsTextInput && containsPasswordInput && containsButtonOrSubmitInput){
        const resultRow = document.createElement('p');
        resultRow.style.color = "green";
        resultRow.textContent = "Bravos vous avez terminer l'exercice";
        resultDiv.appendChild(resultRow);
    }    
}

body.appendChild(verifyButton);


verifyButton.addEventListener("click", checkResult);