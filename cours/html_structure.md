# La structure d'une page web

## Qu'est ce que le HTML

Le HTML, ou Hypertext Markup Language, est un langage qui utilise des balises, ouvrantes et fermantes, encadrées par des chevrons < > pour marquer et structurer le contenu d'une page Web.

Exemple :

```HTML
<balise> Mon contenu </balise>
```
## Structure du HTML

```HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Titre de la page</title>
</head>
<body>

</body>
</html>
```

``!DOCTYPE html`` : Cela indique au navigateur que la page est au format HTML5.

``html`` : C'est l'élément racine de la page HTML, qui englobe tout le contenu de la page.

``head`` : Cette section contient des métadonnées et des informations sur la page, comme le titre et le jeu de caractères.

``meta charset="UTF-8"`` : Définit l'encodage des caractères à UTF-8, qui est recommandé pour la compatibilité multilingue.

``title`` : Définit le titre de la page qui s'affiche dans l'onglet du navigateur.
    
``body`` : C'est l'endroit où le contenu visible de la page, comme le texte, les images et les liens, est placé.


## Les balises structurantes 

Les balises structurantes, sont un ensemble de balises HTML qui sont utilisées pour donner une structure au contenu d'une page Web.


``header`` : Utilisée pour définir l'en-tête d'une page ou d'une section. Il peut contenir des éléments tels que le logo, le titre, la navigation, etc.

``nav`` : Cette balise est destinée à contenir la navigation principale d'une page Web. Elle peut inclure des liens vers d'autres parties du site ou vers d'autres pages.

``main`` : Définit la section principale du contenu d'une page. Il devrait contenir le contenu principal de la page, tel que les articles, les paragraphes et les images.

``article`` : Utilisé pour marquer un contenu autonome, comme un article, un billet de blog, une actualité, etc.

``section`` : Cette balise divise le contenu en sections logiques ou thématiques. Elle est utile pour organiser le contenu de manière hiérarchique.

``aside`` : Utilisé pour le contenu qui est lié à la section principale, mais qui peut être considéré comme complémentaire. Cela peut inclure des encadrés, des publicités, des widgets, etc.

``footer`` : Cette balise est utilisée pour le pied de page d'une page Web. Elle peut contenir des informations de copyright, des liens vers les politiques de confidentialité, des coordonnées, etc.

``div`` : Cette balise est un élément de type bloc utilisé pour diviser et grouper du contenu HTML




Exemple :

```HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Titre de la page</title>
</head>
<body>
    <header>
       <nav> </nav>
    </header>
    
    <main>
        <section> 

            <article> 

                <div> <div>

            </article>

        </section>
     
    </main>
    
    <footer>
        
    </footer>
</body>
</html>

```
## Execice