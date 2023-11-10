<div style="overflow:auto">

# Flexbox(modèle de boîte flexible)

Les flexbox, sont une technique de mise en page en CSS qui permet de créer des mises en page complexes et réactives en alignant et en répartissant des éléments de manière dynamique à l'intérieur d'un conteneur.

<img src="./cours\Ressources\flexbox/container.svg" alt="container" width="300" height="200">
<img src="./cours\Ressources\flexbox/items.svg" alt="container" width="300" height="200">


## Les propriétés CSS Flexbox :

`display` : Cette propriété définit si un conteneur doit utiliser le modèle de boîte flexible. Pour activer Flexbox, vous utilisez display: flex;.

```css
.container{
    display: flex;
}
```

`flex-direction`: Cette propriété détermine l'axe principal du conteneur Flexbox, ce qui affecte la direction dans laquelle les éléments sont alignés. Les valeurs possibles sont row (valeur par défaut), row-reverse, column, et column-reverse.

```css
.container{
    flex-direction: column;
}
```
<img src="./cours\Ressources\flexbox/flex-direction.svg" alt="flex direction" width="300" height="200">

`flex-wrap` : Cette propriété contrôle le comportement des éléments flex à l'intérieur d'un conteneur Flexbox. Lorsque l'espace disponible est insuffisant pour les contenir tous dans une seule ligne (ou colonne), les éléments passe a la ligne suivante. Vous pouvez utiliser nowrap, wrap, ou wrap-reverse.

```css
.container{
    flex-wrap: wrap;
}
```
<img src="./cours\Ressources\flexbox/flex-wrap.svg" alt="flex-wrap" width="300" height="200">

`flex-flow` : Cette propriété est un raccourci pour flex-direction et flex-wrap. Par exemple, flex-flow: row wrap; définira la direction sur "row" et le wrap sur "wrap".

```css
.container{
    flex-flow: row wrap;
}
```

`justify-content` : Cette propriété aligne les éléments le long de l'axe principal (horizontal si flex-direction est row, vertical si flex-direction est column). Les valeurs possibles incluent flex-start, flex-end, center, space-between, et space-around.

```css
.container{
    justify-content: center;
}
```
<img src="./cours\Ressources\flexbox/justify-content.svg" alt="justify-content" width="600" height="500">

`align-items` : Cette propriété aligne les éléments le long de l'axe transversal (vertical si flex-direction est row, horizontal si flex-direction est column). Les valeurs courantes sont flex-start, flex-end, center, baseline, et stretch.

```css
.container{
    align-items: center;
}
```
<img src="./cours\Ressources\flexbox/align-items.svg" alt="align-items" width="600" height="500">

`flex` : Cette propriété est un raccourci pour flex-grow, flex-shrink, et flex-basis. Par exemple, flex: 1 0 50%; signifie que l'élément peut grandir (flex-grow: 1), ne peut pas rétrécir (flex-shrink: 0), et a une base de 50% (flex-basis: 50%).

```css
.item{
    flex: 1 0 50%;
}
```
<img src="./cours\Ressources\flexbox/flex-grow.svg" alt="flex-grow" width="300" height="200">

`align-self` : Cette propriété permet de remplacer l'alignement transversal spécifique pour un élément à l'intérieur du conteneur Flexbox. Elle accepte les mêmes valeurs que align-items.

```css
.item{
    align-self: flex-start;
}
```
<img src="./cours\Ressources\flexbox/align-self.svg" alt="align-self" width="300" height="200">

`align-content` : Cette propriété est utilisée pour aligner les lignes de contenu le long de l'axe transversal lorsque plusieurs lignes de contenu sont présentes dans un conteneur. Les valeurs comprennent flex-start, flex-end, center, space-between, et space-around.

```css
.container{
    align-content: space-between;
}
```
<img src="./cours\Ressources\flexbox/align-content.svg" alt="align-content" width="600" height="500">

`order` : Cette propriété permet de changer l'ordre d'affichage des éléments à l'intérieur du conteneur en utilisant des valeurs numériques. Les éléments avec un ordre plus élevé sont affichés en dernier.

```css
.item{
    order: 10;
}
```
<img src="./cours\Ressources\flexbox/flex-order.svg" alt="flex-order" width="400" height="300">

`gap, row-gap, column-gap` Cette propriété est utilisé  pour contrôler l'espacement horizontal et vertical entre les éléments flex items.


```css
.container{
    gap: 10px;
    gap: 10px 20px; /* row-gap column gap */
    row-gap: 10px;
    column-gap: 20px;
}
```
<img src="./cours\Ressources\flexbox/gap-1.svg" alt="gap" width="600" height="500">

## Liste d'exercices

<br>
<br>
<br>
<br>
<br>
<br>
<div>