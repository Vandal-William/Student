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
    const inputEmailFound = /<input[^>]*type="email"/.test(editorContent);
    const inputTextFound = /<input[^>]*type="text"/.test(editorContent);
    const inputPasswordFound = /<input[^>]*type="password"/.test(editorContent);
    const selectFound = /<select[^>]*>/.test(editorContent);
    const checkboxMatches = (editorContent.match(/<input[^>]*type="checkbox"/ig) || []).length;
    const radioMatches = (editorContent.match(/<input[^>]*type="radio"/ig) || []).length;
    const buttonOrSubmitFound = /<button[^>]*|<input[^>]*type="submit"/.test(editorContent);
    const resetButtonFound = /<button[^>]*type="reset"|<input[^>]*type="reset"/.test(editorContent);

    // Vérification du nombre de balises <option> dans la balise <select>
    const optionCount = (editorContent.match(/<option[^>]*>/ig) || []).length;

    function labelForAttributeExists(content, id) {
        var labelRegex = new RegExp('<label[^>]*for="' + id + '"', 'ig');
        return labelRegex.test(content);
    }


    // Vérifiez pour chaque ID
    const inputEmailIds = /<input[^>]*type="email"[^>]*id="([^"]+)"/i.exec(editorContent);
    if (
        !inputEmailFound || !inputEmailIds || !labelForAttributeExists(editorContent, inputEmailIds[1])
    ) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "Le contenu ne contient pas de champ email avec son label et/ou le label est incorrect.";
        resultDiv.appendChild(resultRow);
    }

    const inputTextIds = /<input[^>]*type="text"[^>]*id="([^"]+)"/i.exec(editorContent);
    if (
        !inputTextFound || !inputTextIds || !labelForAttributeExists(editorContent, inputTextIds[1])
    ) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "Le contenu ne contient pas de champ texte avec son label et/ou le label est incorrect.";
        resultDiv.appendChild(resultRow);
    }

    const inputPasswordIds = /<input[^>]*type="password"[^>]*id="([^"]+)"/i.exec(editorContent);
    if (
        !inputPasswordFound || !inputPasswordIds || !labelForAttributeExists(editorContent, inputPasswordIds[1])
    ) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "Le contenu ne contient pas de champ pour le mot de passe avec son label et/ou le label est incorrect.";
        resultDiv.appendChild(resultRow);
    }

    const selectIds = /<select[^>]*id="([^"]+)"/i.exec(editorContent);
    if (
        !selectFound || !selectIds || !labelForAttributeExists(editorContent, selectIds[1])
    ) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "Le contenu ne contient pas de champ de liste avec son label et/ou le label est incorrect.";
        resultDiv.appendChild(resultRow);
    }

    const checkboxIds = (editorContent.match(/<input[^>]*type="checkbox"[^>]*id="([^"]+)"/ig) || []).map(match => /id="([^"]+)"/.exec(match)[1]);
    for (const id of checkboxIds) {
        if (!labelForAttributeExists(editorContent, id)) {
            const resultRow = document.createElement('p');
            resultRow.style.color = "red";
            resultRow.textContent = "Le contenu ne contient pas de case à cocher avec son label et/ou le label est incorrect.";
            resultDiv.appendChild(resultRow);
        }
    }

    const radioIds = (editorContent.match(/<input[^>]*type="radio"[^>]*id="([^"]+)"/ig) || []).map(match => /id="([^"]+)"/.exec(match)[1]);
    for (const id of radioIds) {
        if (!labelForAttributeExists(editorContent, id)) {
            const resultRow = document.createElement('p');
            resultRow.style.color = "red";
            resultRow.textContent = "Le contenu ne contient pas de bouton radio avec son label et/ou le label est incorrect.";
            resultDiv.appendChild(resultRow);
        }
    }

    if (!containsForm) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "Le contenu ne contient pas de formulaire.";
        resultDiv.appendChild(resultRow);
    }


    if (checkboxMatches !== 2 && radioMatches !== 2) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "Le contenu ne contient pas 2 cases à cocher et/ou 2 boutons radio avec des labels correspondants.";
        resultDiv.appendChild(resultRow);
    }

    if (optionCount < 3) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "Le contenu ne contient pas de liste d'option et/ou n'a pas 3 options.";
        resultDiv.appendChild(resultRow);
    }

    if (!buttonOrSubmitFound) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "Le contenu ne contient un bouton de soumission.";
        resultDiv.appendChild(resultRow);
    }

    if (!resetButtonFound) {
        const resultRow = document.createElement('p');
        resultRow.style.color = "red";
        resultRow.textContent = "Le contenu ne contient pas  un bouton de réinitialisation.";
        resultDiv.appendChild(resultRow);
    }

    if(
        containsForm && 
        inputEmailFound && inputEmailIds && labelForAttributeExists(editorContent, inputEmailIds[1]) && 
        inputTextFound && inputTextIds && labelForAttributeExists(editorContent, inputTextIds[1]) && 
        inputPasswordFound && inputPasswordIds && labelForAttributeExists(editorContent, inputPasswordIds[1]) && 
        buttonOrSubmitFound && 
        resetButtonFound &&
        checkboxMatches === 2 && radioMatches === 2 &&
        selectFound && selectIds && labelForAttributeExists(editorContent, selectIds[1]) && optionCount === 3
    ){
        const resultRow = document.createElement('p');
        resultRow.style.color = "green";
        resultRow.textContent = "Bravos vous avez terminer l'exercice";
        resultDiv.appendChild(resultRow);
    }


}

body.appendChild(verifyButton);


verifyButton.addEventListener("click", checkResult);