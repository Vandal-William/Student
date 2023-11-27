<div style="overflow:auto">

# Qu'est ce que le css ?

Le CSS, ou Cascading Style Sheets (Feuilles de style en cascade), est un langage de programmation utilisé pour définir la présentation, la mise en page et l'apparence visuelle des pages web. 

## Lier un fichier HTML et CSS

La balise <link> en HTML est principalement utilisée pour établir des liens entre la page HTML actuelle et d'autres ressources externes, telles que des feuilles de style CSS, des icônes de favoris, des polices de caractères, des fichiers de pré-chargement, etc. Elle est utilisée dans l'élément <head> de votre document HTML.

```HTML
<link rel="stylesheet" type="text/css" href="Lien vers le fichier css">
```

## Id et Class

Les attributs id et class en CSS servent à cibler et appliquer des styles à des éléments HTML spécifiques, mais ils sont utilisés dans des contextes légèrement différents.

`L'attribut id` est utilisé pour donner un identifiant unique à un élément HTML. Cela signifie qu'aucun autre élément dans la même page ne devrait avoir le même id.

```HTML
<p id="mon-unique-identifiant">Ceci est un paragraphe avec un identifiant unique.</p>
```
Vous pouvez cibler un élément avec un attribut id en CSS en utilisant un sélecteur # suivi de l'identifiant, comme ceci : #mon-unique-identifiant.

```CSS
#mon-unique-identifiant{

}
```

`L'attribut class` est utilisé pour attribuer une ou plusieurs classes à un élément HTML. Les classes sont réutilisables, ce qui signifie que plusieurs éléments peuvent avoir la même classe.

```HTML
<p class="paragraphe-important">Ceci est un paragraphe important.</p>
<p class="paragraphe-important">Ceci est un autre paragraphe important.</p>
```
Vous pouvez cibler des éléments avec une classe en CSS en utilisant un sélecteur '.' suivi du nom de la classe, comme ceci : .paragraphe-important.

```CSS
.paragraphe-important{

}
```

## Propriétés CSS de texte 

Cette catégorie concerne les styles de texte, tels que la taille de police, la graisse, l'espacement des lignes, la décoration du texte, etc.

`color` : Cette propriété définit la couleur du texte. Vous pouvez spécifier la couleur en utilisant un nom de couleur, une valeur hexadécimale ou une valeur RVB.

```CSS
.ma-class{
    color : red;
}
```

`font-family` : Elle détermine la famille de polices utilisée pour le texte. Vous pouvez spécifier plusieurs polices de secours en cas de non-disponibilité de la première.

```CSS
.ma-class{
    font-family: 'Courier New', Courier, monospace;
}
```

`font-size` : Cette propriété définit la taille de la police pour le texte. Vous pouvez spécifier la taille en pixels, em, rem, pourcentage, etc.

```CSS
.ma-class{
    font-size: 16px;
}
```

`font-weight` : Utilisée pour contrôler l'épaisseur de la police (gras ou normal). Les valeurs courantes sont "bold" et "normal".

```CSS
.ma-class{
    font-weight: bold;
}
```

`font-style` : Vous pouvez utiliser cette propriété pour définir le style de la police (normal, italique, oblique).

```CSS
.ma-class{
    font-style: italic;
}
```

`text-align` : Elle permet d'aligner le texte à gauche, à droite, au centre ou justifié dans son contenant.

```CSS
.ma-class{
    text-align: center;
}
```

`text-decoration` : Vous pouvez utiliser cette propriété pour ajouter des décorations au texte, comme le soulignement, la ligne à travers le texte ou la surbrillance.

```CSS
.ma-class{
    text-decoration: underline;
}
```

`text-transform` : Cette propriété permet de transformer le texte en majuscules, minuscules ou en capitalisant la première lettre de chaque mot.

```CSS
.ma-class{
    text-transform:capitalize;
}
```

`text-shadow` : Cette propriété ajoute une ombre au texte. Vous pouvez spécifier la couleur, l'offset horizontal, l'offset vertical et le flou.

```CSS
.ma-class{
    text-shadow: 1px 1px 2px black;
}
```

## Propriétés de mise en page

`width` et `height` : Ces propriétés définissent la largeur et la hauteur d'un élément. Vous pouvez spécifier les dimensions en pixels, pourcentage ou d'autres unités.

`max-width` et `max-height` : Ces propriétés définissent les dimensions maximales qu'un élément peut avoir, ce qui est utile pour garantir que le contenu ne devienne pas trop large ou trop haut.

`min-width` et `min-height` : Elles sont utilisées pour définir les dimensions minimales d'un élément, garantissant qu'il ne devienne pas trop petit.

```CSS
.ma-class{
    width : 300px;
    height: 200px;
}
```

## Propriétés de bordure 

`border` : Utilisée pour définir les propriétés de la bordure autour d'un élément. Vous pouvez spécifier la largeur, le style et la couleur de la bordure.

```CSS
.ma-class{
    border: 1px solid black;
}
```

`border-top`, `border-right`, `border-bottom`, `border-left` : Ces propriétés vous permettent de définir individuellement les caractéristiques de la bordure pour chaque côté d'un élément.

```CSS
.ma-class{
    border-top: 1px dashed #999;
}
```
`border-radius` : Elle définit le rayon des coins de l'élément, créant ainsi des coins arrondis. Vous pouvez spécifier un seul rayon pour tous les coins ou quatre rayons individuels pour chaque coin (haut gauche, haut droite, bas droite, bas gauche).

```CSS
.ma-class{
    border-radius: 10px; 
    border-radius: 5px 10px 15px 20px; 
}
```
## Propriétés de couleur

`background-color` : Cette propriété définit la couleur de fond d'un élément. Vous pouvez utiliser les mêmes types de valeurs que pour color.

```CSS
.ma-class{
    background-color: #FFFFCC;
}
```
`opacity` : Elle règle le degré de transparence d'un élément, où 1 est complètement opaque et 0 est complètement transparent. Vous pouvez utiliser des valeurs décimales pour régler l'opacité.

```CSS
.ma-class{
    opacity: 0.5; 
}
```
`rgba` : Cette fonction permet de définir une couleur en utilisant les composantes RVB et un canal alpha pour la transparence.

```CSS
.ma-class{
    background-color: rgba(255, 0, 0, 0.5);
}
```
`hsl` : Cette fonction permet de définir une couleur en utilisant les valeurs de teinte, de saturation et de luminosité.

```CSS
.ma-class{
    color: hsl(120, 100%, 50%); /* Texte vert (teinte), saturation à 100%, luminosité à 50% */

}
```

`background-image` : Vous pouvez définir une image comme arrière-plan d'un élément en utilisant cette propriété. L'image sera répétée par défaut, mais vous pouvez ajuster son comportement avec d'autres propriétés.

```CSS
.ma-class{
    background-image: url('monimage.jpg');
}
```
`background-repeat` : Cette propriété contrôle la répétition de l'image d'arrière-plan. Les valeurs courantes sont repeat, no-repeat, repeat-x (horizontal), repeat-y (vertical).

```CSS
.ma-class{
    background-repeat: no-repeat; 
}
```
`background-size` : Elle permet de spécifier la taille de l'image d'arrière-plan, en pourcentage, en pixels ou en d'autres unités.

```CSS
.ma-class{
    background-size: 50% 50%; /* Image d'arrière-plan à moitié de la taille de son contenant */
}
```
`background-position` : Cette propriété règle la position de l'image d'arrière-plan par rapport à son contenant. Vous pouvez spécifier les valeurs en pourcentage ou en pixels pour les positions horizontales et verticales.

```CSS
.ma-class{
   background-position: center top; /* Position au centre en haut */
}
```
`background` : C'est une propriété raccourcie qui vous permet de définir en une seule ligne la couleur, l'image d'arrière-plan, la répétition, la taille et la position. L'ordre des valeurs est : couleur, image, répétition, taille, position.

```CSS
.ma-class{
   background: #FFFFCC url('monimage.jpg') no-repeat center top;
}
```

## Liste d'exercices

<br>
<br>
<br>
<br>
<br>
<br>
<div>