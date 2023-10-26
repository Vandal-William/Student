# Les tableaux

En HTML, un tableau est utilisé pour organiser et afficher des données dans une structure à deux dimensions composée de lignes et de colonnes. Pour créer un tableau, vous utilisez des balises HTML spécifiques.

```html
<table>
  <tr>
    <th>En-tête de colonne 1</th>
    <th>En-tête de colonne 2</th>
  </tr>
  <tr>
    <td>Ligne 1, Colonne 1</td>
    <td>Ligne 1, Colonne 2</td>
  </tr>
  <tr>
    <td>Ligne 2, Colonne 1</td>
    <td>Ligne 2, Colonne 2</td>
  </tr>
</table>

```
`table` : C'est la balise principale pour définir un tableau. Elle englobe l'ensemble du tableau, y compris ses en-têtes de colonne et ses données.<br>

`tr` : Cette balise est utilisée pour définir une ligne dans le tableau. Les lignes contiennent les en-têtes de colonne et les données.<br>

`th` : Ces balises sont utilisées pour créer des en-têtes de colonne. Les cellules `th` sont généralement mises en gras et centrées par défaut. Elles sont utilisées pour décrire le contenu des colonnes.<br>

`td` : Ces balises sont utilisées pour créer des cellules de données. Chaque cellule contient les informations que vous souhaitez afficher dans le tableau.<br>

## Résultat

<table>
  <tr>
    <th>En-tête de colonne 1</th>
    <th>En-tête de colonne 2</th>
  </tr>
  <tr>
    <td>Ligne 1, Colonne 1</td>
    <td>Ligne 1, Colonne 2</td>
  </tr>
  <tr>
    <td>Ligne 2, Colonne 1</td>
    <td>Ligne 2, Colonne 2</td>
  </tr>
</table>


## Autre Balises
Les tableaux HTML peuvent également être enrichis avec d'autres balises pour contrôler l'apparence et la structure du tableau.

`caption` : Utilisée pour ajouter un titre ou une légende au tableau.<br>

`thead` : Utilisée pour définir la section d'en-tête du tableau.<br>

`tbody` : Utilisée pour définir la section principale du tableau.<br>

`tfoot` : Utilisée pour définir la section de pied de tableau.<br>

`colgroup` et `col` : Utilisées pour spécifier les groupes de colonnes et les colonnes individuelles.<br>

`th scope=""` : Utilisée pour spécifier la portée de l'en-tête de colonne (par exemple, scope="col" pour les en-têtes de colonne et scope="row" pour les en-têtes de ligne).<br>

`colspan` Permet de spécifier qu'une cellule doit occuper deux colonnes (ou plus).<br>

```html
<td colspan="2">Cette cellule occupe deux colonnes</td>
```

```html
<table>
  <caption>Résultats du sondage sur les animaux préférés</caption>
  <colgroup>
    <col span="1" style="background-color: #f2f2f2;">
    <col span="1" style="background-color: #e6e6e6;">
  </colgroup>
  <thead>
    <tr>
      <th scope="col">Animal</th>
      <th scope="col">Nombre de Votes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Chien</th>
      <td>35</td>
    </tr>
    <tr>
      <th scope="row">Chat</th>
      <td>28</td>
    </tr>
    <tr>
      <th scope="row">Oiseau</th>
      <td>12</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>75</td>
    </tr>
  </tfoot>
</table>

```
## Résultat

<table>
  <caption>Résultats du sondage sur les animaux préférés</caption>
  <colgroup>
    <col span="1" style="background-color: #f2f2f2;">
    <col span="1" style="background-color: #e6e6e6;">
  </colgroup>
  <thead>
    <tr>
      <th scope="col">Animal</th>
      <th scope="col">Nombre de Votes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Chien</th>
      <td>35</td>
    </tr>
    <tr>
      <th scope="row">Chat</th>
      <td>28</td>
    </tr>
    <tr>
      <th scope="row">Oiseau</th>
      <td>12</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>75</td>
    </tr>
  </tfoot>
</table>

## Liste d'exercices

https://vscode.dev/github/students-com/exemple