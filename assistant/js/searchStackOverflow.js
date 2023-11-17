import { assistantResponse } from "./assistantResponse.js";
import { userRequest } from "./userRequest.js";
import { loading } from './loading.js';

const apiKey = 'saqRSu6vJ1AkbHM8FSrr1A((';
const gif = document.querySelector(".elina");
const chatHistory = document.querySelector(".chat_history");
const resultAssistFlow = document.querySelector('.results-assistFlow');
const resultsDiv = document.createElement('div');

export function searchStackOverflow(message) {
  
  const apiUrl = 'https://api.stackexchange.com/2.3/search';

  if(message !== ""){
      
    userRequest(message, chatHistory, '@assistFlow');
    
    resultAssistFlow.appendChild(resultsDiv);
    const loadingIndicator = loading(resultsDiv);

    setTimeout(()=>{
      gif.src = './gif/Elina/actions/talking.gif';
      assistantResponse(`Je recherche sur stackOverFlow !`, chatHistory, '@assistFlow');
    }, 1000)
    setTimeout(() => {
        sessionStorage.setItem('isdrinking', "false");
    }, 4000)
    
    const url = `${apiUrl}?key=${apiKey}&site=stackoverflow&order=desc&sort=activity&intitle=${message}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data.items) 
        setTimeout(() => {
          assistantResponse(`Voici les résultats de la recherche`, chatHistory, '@assistFlow');
          gif.src = './gif/Elina/Elina.gif';
          resultsDiv.removeChild(loadingIndicator);
          displayResults(data.items);
      }, 6000)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }

}

function displayResults(results) {

  resultsDiv.innerHTML = '';

  if (results.length === 0) {
    resultsDiv.innerHTML = 'Aucun résultat trouvé.';
    return;
  }

  Array.from(results.entries()).forEach(([index, result])  => {

    const resultDiv = document.createElement('div');
    if(result.is_answered && result.score >= 0 && result.score <= 10 ){
      resultDiv.innerHTML = `<div class="result-row"><p class="result-title"><a class="result-link" target="_blank" href="${result.link}"><span class="result-id" style="background:lightgreen;">${result.question_id}</span></a>${result.title}</p></div>`;
    }else if (result.is_answered === false && result.score === 0){
      resultDiv.innerHTML = `<div class="result-row"><p class="result-title"><a class="result-link" target="_blank" href="${result.link}"><span class="result-id" style="background:grey;">${result.question_id}</span></a>${result.title}</p></div>`;
    }else if (result.is_answered === false && result.score > 0 && result.score <= 5 ){
      resultDiv.innerHTML = `<div class="result-row"><p class="result-title"><a class="result-link" target="_blank" href="${result.link}"><span class="result-id" style="background:lightblue;">${result.question_id}</span></a>${result.title}</p></div>`;
    }else if (result.is_answered === false && result.score > 5 && result.score <= 10 ){
      resultDiv.innerHTML = `<div class="result-row"><p class="result-title"><a class="result-link" target="_blank" href="${result.link}"><span class="result-id" style="background:lightyellow;">${result.question_id}</span></a>${result.title}</p></div>`;
    }else if(result.is_answered === false && result.score > 10 ){
      resultDiv.innerHTML = `<div class="result-row"><p class="result-title"><a class="result-link" target="_blank" href="${result.link}"><span class="result-id" style="background:lightcoral;">${result.question_id}</span></a>${result.title}</p></div>`;
    }else if(result.is_answered && result.score > 10 ){
      resultDiv.innerHTML = `<div class="result-row"><p class="result-title"><a class="result-link" target="_blank" href="${result.link}"><span class="result-id" style="background:green;">${result.question_id}</span></a>${result.title}</p></div>`;
    }
    resultDiv.style.opacity = '0';
    setTimeout(() => {
      resultsDiv.appendChild(resultDiv);

      setTimeout(() => {
        resultDiv.style.transition = 'opacity 0.5s ease-in-out'; 
        resultDiv.style.opacity = '1'; 
      }, 100);

    }, index * 200);
  }); 
     
}



