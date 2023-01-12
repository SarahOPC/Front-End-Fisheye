//Mettre le code JavaScript lié à la page photographer.html
function retrieveIdInParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let idInUrlParams = urlParams.get('id');
}

retrieveIdInParams();