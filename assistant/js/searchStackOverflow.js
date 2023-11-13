const apiKey = 'saqRSu6vJ1AkbHM8FSrr1A((';

export function searchStackOverflow(message) {
  
  const apiUrl = 'https://api.stackexchange.com/2.3/search';

  const url = `${apiUrl}?key=${apiKey}&site=stackoverflow&order=desc&sort=activity&intitle=${message}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data.items)
      displayResults(data.items);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données:', error);
    });
}

function displayResults(results) {

  const resultsDiv = document.querySelector('.results-assistFlow');
  resultsDiv.innerHTML = '';

  if (results.length === 0) {
    resultsDiv.innerHTML = 'Aucun résultat trouvé.';
    return;
  }

  results.forEach(result => {
    const resultDiv = document.createElement('div');
    resultDiv.innerHTML = `<div class="result-row"><p class="result-title"><a class="result-link" target="_blank" href="${result.link}"><span class="result-id">${result.question_id}</span></a>${result.title}</p></div>`;
    resultsDiv.appendChild(resultDiv);
    
    
  });
  
}



