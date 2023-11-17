export function searchInReddit(message){

    const redditAPIURL = `https://www.reddit.com/r/DevBlogs/search.json?q=${message}&restrict_sr=on&sort=relevance`;

    fetch(redditAPIURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données Reddit:', error);
        });
}