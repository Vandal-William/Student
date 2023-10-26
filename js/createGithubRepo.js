export function createRepositoryFromTemplate(token, githubPseudo, template){

    const tokenGit = token;
    const pseudo = githubPseudo;
    const orgName = "students-com";
    const templateName = template;
    const newRepoName = `${templateName}-${pseudo}`;

    // Utilisez cette URL pour créer un dépôt à partir d'un modèle d'organisation
    const apiUrl = `https://api.github.com/repos/${orgName}/${templateName}/generate`;

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${tokenGit}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            owner: pseudo, // Spécifiez l'utilisateur en tant que propriétaire du nouveau dépôt
            name: newRepoName
        })
    })
    .then(response => {
        if (response.status === 201) {
            console.log(`https://github.com/${pseudo}/${newRepoName}`);
        } else {
            console.error(`Erreur lors de la création du dépôt : ${response.status} - ${response.statusText}`);
        }
    })
    .catch(error => {
        console.error(`Erreur lors de la création du dépôt : ${error}`);
    });
}

  

