async function getPhotographers() {
    let photographersInformations = JSON.parse(photographersData);

    let photographers = [
        {
            "name": photographersInformations.photographers.name,
            "id": photographersInformations.photographers.id,
            "city": photographersInformations.photographers.city,
            "country": photographersInformations.photographers.country,
            "tagline": photographersInformations.photographers.tagline,
            "price": photographersInformations.photographers.price,
            "portrait": photographersInformations.photographers.portrait
        }
    ]
    // data console log
    for (let i = 0; i < photographersInformations.photographers.length; i ++) {
        console.log(photographersInformations.photographers[i]);
    }
    // et bien retourner le tableau photographers seulement une fois récupéré
    return ({
        photographers: [...photographersInformations.photographers]})
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
    

};

init();