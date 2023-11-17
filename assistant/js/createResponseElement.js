export function createResponseElement(resultsDiv, {message, point, resume, exemple}) {

    const div = document.createElement('div');
    div.classList.add('results-analysis')
    const p = document.createElement('p');
    const span = document.createElement('span');
    span.classList.add('point');
    p.classList.add("response");
    p.textContent = message;
    span.textContent = point;
    div.appendChild(p);
    div.appendChild(span);

    if(point.includes('1')){
        div.style.background = "lightgreen"
    }else{
        div.style.background = "lightpink"
    }

    if(resume){
        const pResume = document.createElement('p');
        pResume.classList.add('resume');
        pResume.textContent = resume;
        div.appendChild(pResume);
    }
    if(exemple){
        const ex = document.createElement('p');
        ex.classList.add('exemple');
        ex.textContent = exemple;
        div.appendChild(ex);
    }
    setTimeout(() => {
        resultsDiv.appendChild(div);
        resultsDiv.style.transition = 'opacity 0.5s ease-in-out'; 
        resultsDiv.style.opacity = '1'; 
    }, 4200)
}