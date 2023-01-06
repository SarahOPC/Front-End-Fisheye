async function getPhotographers() {
    fetch('http://127.0.0.1:8080/data/photographers.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            return data;
        })
        .catch(function (err) {
            console.log(err);
        });
}

async function renderPhotographers() {
    let data = await getPhotographers();
    let photographers = [
        {
            "name": data.photographers.name,
            "id": data.photographers.id,
            "city": data.photographers.city,
            "country": data.photographers.country,
            "tagline": data.photographers.tagline,
            "price": data.photographers.price,
            "portrait": data.photographers.portrait
        }
    ]
    // et bien retourner le tableau photographers seulement une fois récupéré
    return ({
        photographers: [...photographers, ...photographers, ...photographers]})
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
    const { photographers } = await renderPhotographers();
    displayData(photographers);
};

init();

