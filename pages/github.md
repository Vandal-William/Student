<div style="width: 90%; margin:auto;">

# GitHub

<h2>Mon compte sur GitHub</h2>

Tout d'abord, vous allez devoir créer votre compte : <a target="_blank" style="color:lightcoral; text-decoration:none;" href="https://github.com/">créer mon compte</a>

<h2>Générer une clé SSH</h2>

Maintenant que votre compte est créé, il va falloir le lier à votre machine, et pour cela, on va utiliser Git ! <br> (vous devriez l'avoir déjà installé normalement, sinon <a target="_blank" style="color:lightcoral; text-decoration:none;" href="index.html?id=installation">Installez-le ici</a>)

1. Accédez à Git depuis votre machine : Démarrer > tapez dans la barre de recherche: git bash
<img src="./pages/images/menu_demarre_git.PNG" alt="vscode" width="29%">
<br>

2. Après avoir démarré Git, vous devriez voir ceci :
<img src="./pages/images/console_git.PNG" alt="vscode" width="100%">
<br>

3. Dans ce terminal, vous allez devoir taper la commande suivante pour générer votre clé :

```git
# Attention à bien remplacer l'email par le vôtre (celui sur GitHub)
ssh-keygen -t ed25519 -C "votre-email@exemple.fr"
```

Il vous sera posé diverses questions, tapez sur Entrée sans vous en soucier, jusqu'à la génération de la clé. Vous devriez donc arriver à ce résultat :

<img src="./pages/images/key_generated.PNG" alt="vscode" width="100%">
<br>

4. Maintenant, il va falloir copier votre clé générée, tapez la commande suivante dans le terminal Git :

```git
# Pour récupérer le contenu de notre clé publique
cat ~/.ssh/id_ed25519.pub
```
Votre clé devrait ressembler à ça :

```git
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFYL/ZEPHOHSd8rnoR9/HC2+cfEiyXaRdPGsxx0uhYRE vandal.william@hotmail.com
```
Copiez-la !
<br>

5. Allez sur GitHub > settings > ssh and gpg keys > new ssh key

<img src="./pages/images/github_account.png" alt="vscode" width="750px" height="683px">
<img src="./pages/images/github_menu.png" alt="vscode" width="250px">
<img src="./pages/images/github_settings.png" alt="vscode" width="1000px">
<br>
<img src="./pages/images/github_add_ssh.png" alt="vscode" width="1000px">
<br>
<img src="./pages/images/paste_key.png" alt="vscode" width="1000px">
<br>
<br>
<strong>Et voilà, votre machine et votre compte GitHub sont reliés ensemble !</strong>

## Générer mon token

Bon, nous avons presque terminé. La dernière étape consiste à générer un token sur GitHub. Celui-ci vous permettra de générer les challenges sur GitHub depuis la plateforme students.

1. Sur GitHub, allez dans settings > developer settings > personal access tokens > generate new token (classic)
<br>

<img src="./pages/images/github_menu.png" alt="vscode" width="20%">
<br>
<img src="./pages/images/choose_dev_settings.png" alt="vscode" width="1000px">
<br>
<img src="./pages/images/choose_personnal_token.png" alt="vscode" width="1000px">
<br>
<br>

2. Choisissez un titre pour le token, donnez-lui aucune date d'expiration et cochez toutes les autorisations pour repo, workflow et admin:org, puis générez le token
<br>

<img src="./pages/images/choose_config_token.png" alt="vscode" width="1000px">
<br>
<img src="./pages/images/choose_generate_token.png" alt="vscode" width="1000px">
<br>
<img src="./pages/images/tokken_generated_result.png" alt="vscode" width="1000px">
<br>
<br>
<strong> <span style="color:red;">Attention :</span> vous devez copier ce token car vous en aurez besoin pour remplir <a target="_blank" style="color:lightcoral; text-decoration:none;" href="https://forms.gle/e5GmFyYdW64g7rs97">ce formulaire </a>, le token ne sera visible qu'une seule fois ! Si vous le perdez avant de le renseigner dans le formulaire, vous devrez en générer un autre car vous en aurez besoin pour récupérer les challenges. </strong>
<br>
<h3 style="color:grey;">Et maintenant ?</h3>
Si vous avez bien soumis le formulaire, c'est que vous êtes fin prêt pour les ateliers ! Nous verrons ensemble comment fonctionnent tous ces outils.
<br>
<br>
<br>
<div>