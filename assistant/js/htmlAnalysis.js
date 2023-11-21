import { createResponseElement } from "./createResponseElement.js";
import { loading } from './loading.js';

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
    const hasMetaDescription = doc.querySelector('meta[name="description"]') !== null;
    const hasH1 = doc.querySelector('h1') !== null;
    const hasValidImgAlt = Array.from(doc.querySelectorAll('img')).every(img => img.alt.trim() !== '');
 
    // La balise title est renseigner
    if(hasTitle.textContent !== null || hasTitle.textContent !== "Document"){
        const message ="Vous avez reiseigner la balise title";
        const point = "+1p"
        createResponseElement(resultsDiv, {message:message, point:point});
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
    
    setTimeout(() => {
        resultsDiv.removeChild(loadingIndicator);
        resultsDiv.style.opacity = '0';
    }, 4000)



    
     
}


