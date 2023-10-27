export function createRepositoryFromTemplate(token, githubPseudo, template){
    console.log(token + ' - ' + githubPseudo + ' - ' + template)
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
            const createError = document.querySelector('#error');
            createError.innerHTML= "";
            const dialog = document.querySelector('#dialog');
            const url = document.querySelector('#repo-url');
            url.href = `https://vscode.dev/github.com/${pseudo}/${newRepoName}`;
            url.textContent = `https://vscode.dev/github.com/${pseudo}/${newRepoName}`;
            dialog.style.display = "block";
           
        } else {
            const dialog = document.querySelector('#dialog');
            const createError = document.querySelector('#error');
            createError.innerHTML= "";
            createError.style.color = "red";
            createError.textContent = `Erreur lors de la création du dépôt : ${response.status} - ${response.statusText}`;
            dialog.style.display = "block";
        }
    })
    .catch(error => {
        const dialog = document.querySelector('#dialog');
        const createError = document.querySelector('#error');
        createError.innerHTML= "";
        createError.style.color = "red";
        createError.textContent = `Erreur lors de la création du dépôt : ${error}`;
        dialog.style.display = "block";
    });
}

  

