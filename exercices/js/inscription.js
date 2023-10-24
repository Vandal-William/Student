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
    "Créer un formulaire d'inscription",
    "Ajouter un champ email",
    "Ajouter un champ texte pour le nom d'utilisateur",
    "Ajouter un champ pour le mot de passe",
    "Ajouter deux cases à cocher 'Particulier' et 'Professionnel'",
    "Ajouter la possibilité de choisir un genre 'Homme' ou 'Femme'",
    "Ajouter une liste pour sélectionner un pays entre 'France', 'Angleterre' et 'Allemagne'",
    "Ajouter un bouton pour soumettre le formulaire",
    "Ajouter un bouton pour réinitialiser le formulaire",
    "Ajouter un label pour chaque champ de formulaire"
   
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

    // Vérification de la présence d'une balise <form>
    const containsForm = /<form[^>]*>/i.test(editorContent);

    // Vérification des éléments d'entrée (input)
    const containsEmailInput = /<input[^>]*type=["']?email["']?[^>]*\s+id=["']?\w+["']?\s+for=["']?\w+["']?/i.test(editorContent);
    const containsTextInput = /<input[^>]*type=["']?text["']?[^>]*\s+id=["']?\w+["']?\s+for=["']?\w+["']?/i.test(editorContent);
    const containsPasswordInput = /<input[^>]*type=["']?password["']?[^>]*\s+id=["']?\w+["']?\s+for=["']?\w+["']?/i.test(editorContent);

    // Vérification des cases à cocher (checkbox) et boutons radio (radio)
    const containsCheckboxes = /<input[^>]*type=["']?(checkbox|radio)["']?[^>]*\s+id=["']?\w+["']?\s+for=["']?\w+["']?/ig.test(editorContent);

    // Vérification de la balise <select> avec attribut id
    const selectMatch = /<select[^>]*\s+id=["']?(\w+)["']?[^>]*\s+for=["']?\1["']?/i.test(editorContent);

    // Vérification du nombre de balises <option> dans la balise <select>
    const optionCount = (editorContent.match(/<select[^>]*>\s*<option[^>]*>/ig) || []).length;

    // Vérification des boutons de soumission et de réinitialisation
    const containsSubmitButton = /<button[^>]*type=["']?submit["']?[^>]*>|<input[^>]*type=["']?submit["']?[^>]*>/i.test(editorContent);
    const containsResetButton = /<button[^>]*type=["']?reset["']?[^>]*>|<input[^>]*type=["']?reset["']?[^>]*>/i.test(editorContent);

    // Comptage des cases à cocher (checkbox)
    const checkboxCount = (editorContent.match(/<input[^>]*type=["']?checkbox["']?[^>]*\s+id=["']?\w+["']?\s+for=["']?\w+["']?/ig) || []).length;

    // Comptage des boutons radio (radio)
    const radioCount = (editorContent.match(/<input[^>]*type=["']?radio["']?[^>]*\s+id=["']?\w+["']?\s+for=["']?\w+["']?/ig) || []).length;

    if (!containsForm) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "Le contenu ne contient pas de formulaire.";
        resultDiv.appendChild(resultRow);
    }

    if (!containsEmailInput) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "Le contenu ne contient pas de champ email avec un label correspondant";
        resultDiv.appendChild(resultRow);
    }

    if (!containsTextInput) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "Le contenu ne contient pas de champ texte avec un label correspondant.";
        resultDiv.appendChild(resultRow);
    }

    if (!containsPasswordInput) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "Le contenu ne contient pas un champ de mot de passe avec un label correspondant.";
        resultDiv.appendChild(resultRow);
    }

    if (!containsCheckboxes && checkboxCount < 2 && radioCount < 2) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "Le contenu ne contient pas 2 cases à cocher et/ou 2 boutons radio avec des labels correspondants.";
        resultDiv.appendChild(resultRow);
    }

    if (!selectMatch && optionCount < 3) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "Le contenu ne contient pas de liste d'option et/ou n'a pas 3 options.";
        resultDiv.appendChild(resultRow);
    }

    if (!containsSubmitButton) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "Le contenu ne contient un bouton de soumission.";
        resultDiv.appendChild(resultRow);
    }

    if (!containsResetButton) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "Le contenu ne contient pas  un bouton de réinitialisation.";
        resultDiv.appendChild(resultRow);
    }

    if(
        containsForm && 
        containsEmailInput && 
        containsTextInput && 
        containsPasswordInput && 
        containsSubmitButton && 
        containsResetButton &&
        containsCheckboxes && checkboxCount === 2 && radioCount === 2 &&
        selectMatch && optionCount === 3
    ){
        const resultRow = document.createElement('p');
        resultRow.style.color = "green";
        resultRow.textContent = "Bravos vous avez terminer l'exercice";
        resultDiv.appendChild(resultRow);
    }


}

body.appendChild(verifyButton);


verifyButton.addEventListener("click", checkResult);