import { createResponseElement } from "./createResponseElement.js";
import { loading } from '../site/loading.js';

const resultsDiv = document.createElement('div');
const results = document.getElementById('result-div');
const parentDiv = document.getElementById('results');

export function htmlAnalysis(content) {

    parentDiv.style.display = "block";

    results.appendChild(resultsDiv);
    const loadingIndicator = loading(resultsDiv);

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    const hasTitle = doc.querySelector('title');
    console.log(hasTitle)
    const hasMetaDescription = doc.querySelector('meta[name="description"]') !== null;
    const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    console.log(headings)
    const hasImg = document.querySelectorAll('img');
    const imgHasAlt = Array.from(doc.querySelectorAll('img')).every(img => img.alt.trim() !== '');
    const semanticTags = ['article', 'section', 'header', 'footer'];
    const semanticElements = {};
    
    semanticTags.forEach(tag => {
        semanticElements[tag] = Array.from(doc.getElementsByTagName(tag));
    });
 
    // La balise title est renseigner
    if(hasTitle){ 
        if(hasTitle.textContent !== null || hasTitle.textContent !== "Document"){
            const message ="Vous avez reiseigner la balise title";
            const point = "+1p"
            createResponseElement(resultsDiv, {message:message, point:point});
        }
    }else{
        const message ="Vous avez oublier de renseigner la balise title ";
        const point = "+0p";
        createResponseElement(resultsDiv, {message:message, point:point});
    }
    // il y a une balise meta description
    if(hasMetaDescription){
        const message = "Vous avez une balise meta description +1p";
        const point = "+1p";
        createResponseElement(resultsDiv, {message:message, point:point});
    }else{
        const message = "Vous n'avez pas de balise meta description";
        const point = "+0p";
        const resume = "Une balise <meta> avec l'attribut 'description 'est utilisée dans le code HTML pour fournir une description concise et significative du contenu de la page web";
        const exemple = "<meta name='description' content='Ceci est la description de ma page web. Elle contient un résumé concis du contenu de la page.'>";
        createResponseElement(resultsDiv, {message:message, point:point, resume:resume, exemple:exemple})
    }
    if (hasImg && hasImg.length > 0) {
        if(imgHasAlt){
            const message = "Toute vos images ont un attribut ALT";
            const point = "+1p";
            createResponseElement(resultsDiv, {message:message, point:point});
        }else{
            const message = "Certaines de vos images n'ont pas d'attribut alt.";
            const point = "+0p";
            const resume = "Les utilisateurs ayant des déficiences visuelles ou utilisant des lecteurs d'écran dépendent de descriptions textuelles pour comprendre le contenu des images sur un site.";
            const exemple = "<img src='exemple.jpg' alt='cette image est un exemple'>";
            createResponseElement(resultsDiv, {message:message, point:point, resume:resume, exemple:exemple})
        }
    }
    if(headings && headings.length > 0){
        let previousLevel = 0;
        const errors = [];
        for (let i = 0; i < headings.length; i++) {
            const currentHeading = headings[i];
            const currentLevel = parseInt(currentHeading.tagName.charAt(1)); // Obtient le niveau de la balise de titre
    
            if (currentLevel - previousLevel > 1) {
                const message = `votre balise de titre ne suis pas une hiérarchie correcte à l'élément ${currentHeading.textContent}`;
                const point = "+0p";
                errors.push(1);
                createResponseElement(resultsDiv, {message:message, point:point})
            }else{
                const message = `votre balise de titre suis une hiérarchie correcte à l'élément ${currentHeading.textContent}`;
                const point = "+1p";
                createResponseElement(resultsDiv, {message:message, point:point})
            }
            previousLevel = currentLevel;
        }
        if (errors.length > 0){
            const point = "+0p";
            const resume = "Les balises de titre hiérarchiques (de <h1> à <h6>) aident à structurer et à organiser le contenu d'une page web. Elles indiquent la hiérarchie des informations, ce qui est essentiel pour la compréhension du contenu par les utilisateurs et les moteurs de recherche.";
            const exemple = "<h1>titre de niveau 1</h1> => <h2>Titre de niveau 2</h2> => <h3>Titre de niveau 3</h3>...";
            createResponseElement(resultsDiv, {resume:resume, exemple:exemple, point:point})
        }
    }else{
        const message = `Aucune balise de titre n'a été trouvée`;
        const point = "+0p";
        const resume = "Les balises de titre hiérarchiques (de <h1> à <h6>) aident à structurer et à organiser le contenu d'une page web. Elles indiquent la hiérarchie des informations, ce qui est essentiel pour la compréhension du contenu par les utilisateurs et les moteurs de recherche.";
        const exemple = "<h1>titre de niveau 1</h1> => <h2>Titre de niveau 2</h2> => <h3>Titre de niveau 3</h3>...";
        createResponseElement(resultsDiv, {message:message, point:point, resume:resume, exemple:exemple})
    }
    semanticTags.forEach(tag => {
        if (semanticElements[tag].length > 0) {
            const message = `Balise <${tag}> utilisée: ${semanticElements[tag].length} fois`;
            const point = "+1p";
            createResponseElement(resultsDiv, { message: message, point: point });
        } else {
            const message = `Aucune balise <${tag}> n'a été trouvée`;
            const point = "+0p";
            const resume = `Les balises sémantiques HTML5 telles que <${tag}> aident à organiser le contenu de manière sémantique et compréhensible pour les moteurs de recherche.`;
            createResponseElement(resultsDiv, { message: message, point: point, resume: resume });
        }
    });
    
    setTimeout(() => {
        resultsDiv.removeChild(loadingIndicator);
        resultsDiv.style.opacity = '0';
    }, 4000)



    
     
}


