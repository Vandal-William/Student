import { menu } from "../data/menu.js";
import { users } from "../data/users.js"
import { activeMarked } from "./marked.js";

export function createMenuConnect( ){

    const accordionData = menu;

    // Sélectionnez le conteneur de l'accordéon
    const accordionContainer = document.querySelector('.menu');
    const submitButton = document.querySelector('#submit-info');
    
    
    submitButton.addEventListener("click", () => {
        
        accordionContainer.innerHTML= "";
        const username = document.querySelector('#user-info').value.trim();
        const password = document.querySelector('#password').value.trim();
    
        if(users){
            const user = users.find(user => user.name === username && user.password === password);
            if(user){
                // Créez l'accordéon en JavaScript
                accordionData.forEach((section, index) => {
                    
                    const lang = users.find(lang => lang.language.includes(section.title) && lang.name === username);
                    const sectionElement = document.createElement('div');
                    sectionElement.classList.add('accordion-section');
            
                    const headerElement = document.createElement('div');
                    headerElement.classList.add('accordion-header');
                    headerElement.style.background = "grey";
                    headerElement.style.color = "white"
                    headerElement.style.cursor = "pointer";
                    headerElement.style.padding = "10px";
                    headerElement.style.borderBottom = "1px solid black";
                    headerElement.textContent = section.title;
                    
                    if(lang){
                        sectionElement.appendChild(headerElement);
                    }
                    
                    section.lesson.forEach(l => {
        
                        l.user.forEach(u => {
                            const contentElement = document.createElement('div');
                            contentElement.classList.add('accordion-content');
                            contentElement.style.cursor = "pointer";
                            contentElement.style.borderBottom = "1px solid black";
                            contentElement.style.padding = "10px";
                            contentElement.style.display = "none";
                            contentElement.textContent = l.lesson_title;

                            if(u.name === username && u.isActive){
                                sectionElement.appendChild(contentElement);
                            }
    
                            headerElement.addEventListener('click', () => {
                                contentElement.style.display = contentElement.style.display === 'block' ? 'none' : 'block';
                            });
                
                            contentElement.addEventListener('click', () => {
                                activeMarked(l.path)
                            });
        
                        })
                    })
            
                    accordionContainer.appendChild(sectionElement);
    
                })

            }
        
        }
    });    

}