import { getCollectionInFirestore } from "../fireBase/firestore.js";
import { global } from "../global.js";
import { activeMarked } from "./marked.js";


export async function getLessonTitle(content){

    // Sélectionnez le conteneur de l'accordéon
    const user = global.userId;
    const access = await getCollectionInFirestore('access');
    const languages =  await getCollectionInFirestore('language');

    const accordionContainer = document.getElementById('recaps-menu');

    accordionContainer.innerHTML= "";

    languages.forEach((section, index) => {
        access.forEach(lang => {

            const sectionElement = document.createElement('div');
            sectionElement.classList.add('accordion-section');
            
            const headerElement = document.createElement('div');
            headerElement.classList.add('accordion-header');
            headerElement.style.background = "grey";
            headerElement.style.color = "white"
            headerElement.style.cursor = "pointer";
            headerElement.style.padding = "10px";
            headerElement.style.borderBottom = "1px solid black";
            headerElement.textContent = section.data.title;
            
            if(lang.data.access_lang.includes(section.data.title) && user === lang.data.userId){
                sectionElement.appendChild(headerElement);
            }
          
            section.data.lesson.forEach(l => {
                    const contentElement = document.createElement('div');
                    contentElement.classList.add('accordion-content');
                    contentElement.style.cursor = "pointer";
                    contentElement.style.borderBottom = "1px solid black";
                    contentElement.style.padding = "10px";
                    contentElement.style.display = "none";
                    contentElement.textContent = l.lesson_title;
    
                    if(l.user.includes(user)){
                        sectionElement.appendChild(contentElement);
                    }
    
                    headerElement.addEventListener('click', () => {
                        contentElement.style.display = contentElement.style.display === 'block' ? 'none' : 'block';
                    });

                    contentElement.addEventListener('click', () => {
                        activeMarked(l.content, content)
                        
                    })

                    // contentElement.addEventListener('click', () => {
                    //     generateRepoButton.style.display = 'block'
                    //     activeMarked(l.path)
                    //     const path = l.path;
                    //     const match = path.match(/_(.*?)\./);
                    //     if(match && match[1]){
                    //         const repoName = match[1]
                    //         generateRepoButton.addEventListener("click", async () => {
                    //             createRepositoryFromTemplate(lang.token, lang.pseudoGit, repoName)
                    //         });
                    //     } 
                    // });
            })
    
            accordionContainer.appendChild(sectionElement);
    
        })
        })

   

}