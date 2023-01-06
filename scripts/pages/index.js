    async function getPhotographers(url) {
        const res = await fetch(url);
        return await res.json();
    }
        getPhotographers('http://127.0.0.1:8080/data/photographers.json')
            .then(data => {
                console.log(data);
                let photographers = JSON.parse(data);

                //photographers = [
                //    {
                //        "name": data.photographers.name,
                //        "id": data.photographers.id,
                //        "city": data.photographers.city,
                //        "country": data.photographers.country,
                //        "tagline": data.photographers.tagline,
                //        "price": data.photographers.price,
                //        "portrait": data.photographers.portrait
                //    }
                //]
                // et bien retourner le tableau photographers seulement une fois récupéré
                return ({
                    photographers: [...photographers, ...photographers, ...photographers]})
            })
            .catch((err) => {
                console.error('Error:', err);
              });

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
    
