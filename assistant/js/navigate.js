export function navigate(){

    const doc = document.querySelector('.doc');
    const assist = document.querySelector('.assist');
    const review = document.querySelector('.review');
    const calendar = document.querySelector('.calendar');
    const homeInfo = document.querySelector('.home')
    const results_docs = document.querySelector('.results-docs')
    const results_assistFlow = document.querySelector('.results-assistFlow')
    const results_review = document.querySelector('.results-review')
    const results_calendar = document.querySelector('.results-calendar')

    doc.addEventListener('click', () => {
        results_docs.style.display = "block";
        results_assistFlow.style.display = "none";
        results_review.style.display = "none";
        results_calendar.style.display = "none";
        homeInfo.style.display = "none";
    })
    assist.addEventListener('click', () => {
        results_assistFlow.style.display = "block";
        results_docs.style.display = "none";
        results_review.style.display = "none";
        results_calendar.style.display = "none";
        homeInfo.style.display = "none";
    })
    review.addEventListener('click', () => {
        results_review.style.display = "block";
        results_docs.style.display = "none";
        results_docs.style.display = "none";
        results_assistFlow.style.display = "none";
        results_calendar.style.display = "none";
    })
    calendar.addEventListener('click', () => {
        results_calendar.style.display = "block";
        results_docs.style.display = "none";
        results_assistFlow.style.display = "none";
        results_review.style.display = "none";
        homeInfo.style.display = "none";
    })
}