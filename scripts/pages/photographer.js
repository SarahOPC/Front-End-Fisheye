//Mettre le code JavaScript lié à la page photographer.html
function retrieveIdInParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let idInUrlParams = urlParams.get('id');
    return idInUrlParams;
}

async function getPersonnalInformationsPhotographer() {
    let photographersInformations = JSON.parse(photographersData);
    let getIdFromUrl = retrieveIdInParams();
    
    for (let i = 0; i < photographersInformations.photographers.length; i ++) {
            if (getIdFromUrl == photographersInformations.photographers[i].id) {
                console.log(photographersInformations.photographers[i].name);
                console.log(photographersInformations.photographers[i].city);
                console.log(photographersInformations.photographers[i].country);
                console.log(photographersInformations.photographers[i].tagline);
                console.log(photographersInformations.photographers[i].price);
            }
    }
    return ({
        photographers: [...photographersInformations.photographers]})
}

getPersonnalInformationsPhotographer();