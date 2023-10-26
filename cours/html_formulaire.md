# Les Formulaire en HTML

Un formulaire en HTML est un élément essentiel permettant aux utilisateurs de saisir des données et de les envoyer au serveur web pour traitement. Les formulaires sont couramment utilisés pour recueillir des informations, comme des informations de contact, des commentaires, des identifiants et des mots de passe, et bien plus encore

## Un formulaire HTML est composé de plusieurs éléments :

`form` : C'est l'élément racine du formulaire. Il définit où les données du formulaire seront envoyées lors de la soumission, généralement à une URL spécifiée dans l'attribut "action". Il spécifie également la méthode HTTP utilisée pour l'envoi des données, généralement "GET" ou "POST".

```html

<form action="https://traitement" method="POST">

  <!-- Les éléments de formulaire vont ici -->

</form>

```
`input` : Il s'agit de l'élément le plus couramment utilisé pour la saisie de données. Il peut prendre différents types, tels que "text" (champ de texte), "password" (mot de passe), "radio" (bouton radio), "checkbox" (case à cocher), etc. Le type est spécifié via l'attribut "type".

```html

<form action="https://traitement" method="POST">

  <input type="text" name="nom" placeholder="Votre nom">

</form>

```

`textarea` : Il permet aux utilisateurs de saisir du texte sur plusieurs lignes.

```html

<form action="https://traitement" method="POST">

  <input type="text" name="nom" placeholder="Votre nom">

  <textarea name="commentaire" rows="4" cols="50"></textarea>

</form>

```
`select` : Il permet aux utilisateurs de sélectionner des options à partir d'une liste déroulante (élément `select`) avec des options (éléments `option`)

```html

<form action="https://traitement" method="POST">

  <input type="text" name="nom" placeholder="Votre nom">

  <textarea name="commentaire" rows="4" cols="50"></textarea>

  <select name="pays">
    <option value="france">France</option>
    <option value="espagne">Espagne</option>
    <option value="italie">Italie</option>
  </select>

</form>

```

`label` est utilisé pour créer une étiquette ou un libellé associé à un élément `input`, `textarea`, ou `select`.La relation entre un label et un élément de formulaire se fait grâce à l'attribut `for` de l'élément `label` et l'attribut `id` de l'élément de formulaire correspondant.

```html

<form action="https://traitement" method="POST">

  <label for="nom-de-famille"> Nom : </label>
  <input type="text" name="nom" id="nom-de-famille" placeholder="Votre nom">

  <label for="comment"> commentaire :</label>
  <textarea name="commentaire" id="comment" rows="4" cols="50"></textarea>

  <label for="country"> Pays :</label>
  <select name="pays" id="country">
    <option value="france">France</option>
    <option value="espagne">Espagne</option>
    <option value="italie">Italie</option>
  </select>

</form>

```
`button`: Il peut être utilisé pour créer des boutons de soumission de formulaire ou des boutons d'annulation.

```html

<form action="https://traitement" method="POST">

  <label for="nom-de-famille"> Nom : </label>
  <input type="text" name="nom" id="nom-de-famille" placeholder="Votre nom">

  <label for="comment"> commentaire :</label>
  <textarea name="commentaire" id="comment" rows="4" cols="50"></textarea>

  <label for="country"> Pays :</label>
  <select name="pays" id="country">
    <option value="france">France</option>
    <option value="espagne">Espagne</option>
    <option value="italie">Italie</option>
  </select>

  <button type="submit">Envoyer</button>
  <button type="reset">Réinitialiser</button>

</form>

```
## Résultat Finale

<form action="" method="GET">

  <label for="nom-de-famille"> Nom : </label>
  <input type="text" name="nom" id="nom-de-famille" placeholder="Votre nom">

  <label for="comment"> commentaire :</label>
  <textarea name="commentaire" id="comment" rows="4" cols="50"></textarea>

  <label for="country"> Pays :</label>
  <select name="pays" id="country">
    <option value="france">France</option>
    <option value="espagne">Espagne</option>
    <option value="italie">Italie</option>
  </select>

  <button type="submit">Envoyer</button>
  <button type="reset">Réinitialiser</button>

</form>

## Les types d'éléments input 

``text`` : Crée une zone de texte où les utilisateurs peuvent saisir du texte. Par défaut, il s'agit d'un champ de texte simple.

```html
<input type="text" />
```
<input type="text" style="margin-bottom:20px;"/>

``password`` : Crée une zone de texte où les caractères saisis sont masqués pour des champs de mot de passe.

```html
<input type="password" />
```
<input type="password" style="margin-bottom:20px;"/>

``radio`` : Permet aux utilisateurs de sélectionner une seule option parmi un groupe d'options. Les boutons radio sont souvent utilisés dans les formulaires où vous voulez que l'utilisateur choisisse une seule option parmi plusieurs.

```html
<input type="radio" />
```
<input type="radio" style="margin-bottom:20px;"/>

``checkbox`` : Permet aux utilisateurs de sélectionner une ou plusieurs options parmi un groupe d'options. Les cases à cocher sont couramment utilisées pour les cases à cocher multiples.

```html
<input type="checkbox" />
```
<input type="checkbox" style="margin-bottom:20px;"/>

``submit`` : Crée un bouton de soumission qui est utilisé pour envoyer le formulaire.

```html
<input type="submit" />
```
<input type="submit" style="margin-bottom:20px;"/>

``reset`` : Crée un bouton de réinitialisation qui réinitialise les champs du formulaire à leurs valeurs par défaut.

```html
<input type="reset" />
```
<input type="reset" style="margin-bottom:20px;"/>

``number`` : Permet aux utilisateurs de saisir des valeurs numériques.

```html
<input type="number" />
```
<input type="number" style="margin-bottom:20px;"/>

``email`` : Utilisé pour la saisie d'adresses e-mail et peut inclure une validation pour garantir que l'adresse est bien formée.

```html
<input type="email" />
```
<input type="email" style="margin-bottom:20px;"/>

``url`` : Utilisé pour la saisie d'URL (adresses de sites web) et peut inclure une validation pour garantir que l'URL est bien formée.

```html
<input type="url" />
```
<input type="url" style="margin-bottom:20px;"/>

``date`` : Permet aux utilisateurs de sélectionner une date à partir d'un calendrier.

```html
<input type="date" />
```
<input type="date" style="margin-bottom:20px;"/>

``time`` : Permet aux utilisateurs de sélectionner une heure.

```html
<input type="time" />
```
<input type="time" style="margin-bottom:20px;"/>

``color`` : Permet aux utilisateurs de sélectionner une couleur à l'aide d'un sélecteur de couleur.

```html
<input type="color" />
```
<input type="color" style="margin-bottom:20px;"/>

``file`` : Crée un bouton "Parcourir" qui permet aux utilisateurs de sélectionner un fichier à télécharger.

```html
<input type="file" />
```
<input type="file" style="margin-bottom:20px;"/>

``image`` : Crée un bouton sous forme d'image qui peut être utilisé pour déclencher une action JavaScript.

```html
<input type="image" src="../images/n.png" alt="Bouton de soumission" name="submitButton/>
```
<input type="image" src="../images/n.png" alt="Bouton de soumission" name="submitButton" width="100px" style="margin-bottom:20px;"/>

``tel`` : Utilisé pour la saisie de numéros de téléphone.

```html
<input type="tel" />
```
<input type="tel" style="margin-bottom:20px;"/>

``search`` : Utilisé pour la saisie de termes de recherche.

```html
<input type="search" />
```
<input type="search" style="margin-bottom:20px;"/>

``hidden`` : Crée un champ de formulaire masqué qui n'est pas visible pour l'utilisateur. Il est utilisé pour stocker des données dans le formulaire.

```html
<input type="hidden" />
```

## Les attributs des champs de formulaire

``type`` : Définit le type du champ de formulaire. Les valeurs courantes incluent "text", "password", "radio", "checkbox", "submit", "button", "file", "number", "email", "date", "color", "tel", "url", etc.

``name`` : Spécifie le nom du champ de formulaire. C'est cet attribut qui est utilisé pour identifier les données envoyées lorsque le formulaire est soumis.

``value`` : Définit la valeur initiale du champ de formulaire. Par exemple, pour les champs de texte, c'est le texte prérempli. Pour les boutons, c'est le texte du bouton.

``placeholder`` : Fournit un texte indicatif qui s'affiche dans le champ de formulaire pour guider les utilisateurs sur ce qu'ils doivent saisir.

``required`` : Un attribut booléen qui indique que le champ est obligatoire. L'utilisateur doit remplir ce champ pour soumettre le formulaire.

``disabled`` : Désactive le champ de formulaire, ce qui signifie qu'il n'est pas éditable ou sélectionnable par l'utilisateur.

``readonly`` : Rend le champ de formulaire en lecture seule, ce qui signifie que l'utilisateur peut voir la valeur mais ne peut pas la modifier.

``maxlength`` : Définit la longueur maximale du texte qui peut être entré dans un champ de texte.

``min et max`` : Pour les champs numériques, ils définissent la valeur minimale et maximale autorisée.

``multiple`` : Pour les champs "select", permet de sélectionner plusieurs options en même temps.

``size`` : Pour les champs de texte, il définit la largeur visible du champ en caractères.

``autofocus`` : Un attribut booléen qui indique que le champ de formulaire doit recevoir le focus automatiquement lorsque la page est chargée.

``autocomplete`` : Spécifie si le navigateur doit activer l'autocomplétion pour le champ.

``pattern`` : Pour les champs de texte, il spécifie une expression régulière qui définit un modèle de saisie valide.

``minlength`` : Pour les champs de texte, détermine le nombre minimum de caractères requis.

``maxlength`` : Pour les champs de texte, il définit la longueur maximale du texte autorisée.

``checked`` : Pour les boutons radio et les cases à cocher, il spécifie que l'option est préalablement cochée ou sélectionnée.

``accept`` : Pour les champs de type "file", spécifie les types de fichiers acceptés pour l'envoi.

## Liste d'exercices
