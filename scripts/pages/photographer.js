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
                let photographer = 
                    {
                        name: photographersInformations.photographers[i].name,
                        id: photographersInformations.photographers[i].id,
                        city: photographersInformations.photographers[i].city,
                        country: photographersInformations.photographers[i].country,
                        tagline: photographersInformations.photographers[i].tagline,
                        price: photographersInformations.photographers[i].price,
                        portrait: photographersInformations.photographers[i].portrait
                    }
                return photographer;
            }
    } throw "An error has occured";
}

async function displayData() {
    const photographer = await getPersonnalInformationsPhotographer();
    const photographersSection = document.querySelector(".photograph-header");
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
};

displayData();

async function getMediaFromPhotographer() {
    let photographerMedias = JSON.parse(photographersData);
    let getIdFromUrl = retrieveIdInParams();

    let medias = [];
    for (let i = 0; i < photographerMedias.media.length; i ++) {
        if (getIdFromUrl == photographerMedias.media[i].photographerId) {
            if (photographerMedias.media[i].image != undefined) {
                let media = 
                    {
                        image: photographerMedias.media[i].image,
                        alt: photographerMedias.media[i].title,
                        title: photographerMedias.media[i].title,
                        likes: photographerMedias.media[i].likes
                    }
                medias.push(media);
            };
            if (photographerMedias.media[i].image == undefined) {
                let media = 
                    {
                        video: photographerMedias.media[i].video,
                        title: photographerMedias.media[i].title,
                        likes: photographerMedias.media[i].likes
                    }
                medias.push(media);
            }
        }
    }
    return medias;
}

async function displayMedia() {
    const medias = await getMediaFromPhotographer();
    const mediaSection = document.querySelector(".photograph-body");
    const mediaModel = mediaFactory(medias);
    const getmediaDOM = mediaModel.getmediaDOM();
    mediaSection.appendChild(getmediaDOM);
};

displayMedia();

async function getTotalLikes() {
    const medias = await getMediaFromPhotographer();
    let totalLikes = 0;
    for (let i = 0; i < medias.length; i ++) {
        totalLikes += medias[i].likes;
    }
    return totalLikes;
}

async function getDailyPrice() {
    const price = await getPersonnalInformationsPhotographer();
    const dailyPrice = price.price;
    return dailyPrice;
}

async function displayFixedDiv() {
    const likes = await getTotalLikes();
    const price = await getDailyPrice();
    const photographerBody = document.querySelector(".photograph-body");
    const div = document.createElement( 'div' );
    div.setAttribute("class", "fixedDiv");
    const pTotalLikes = document.createElement( 'p' );
    const pDailyPrice = document.createElement( 'p' );
    pTotalLikes.textContent = likes;
    pDailyPrice.textContent = price + " € / jour";
    const heart = document.createElement( 'i' );
    heart.setAttribute("class", "fa fa-heart");
    pTotalLikes.appendChild(heart);
    div.appendChild(pTotalLikes);
    div.appendChild(pDailyPrice);
    photographerBody.appendChild(div);
}

displayFixedDiv();

//---------------------------LIGHTBOX---------------------------//

function openLightbox() {
    const myMedia = document.querySelectorAll(".myMedias");
    for(let i = 0; i < myMedia.length; i ++) {
        if(myMedia[i].controls === true){
            myMedia[i].addEventListener('click', function() {
                const myNewMedia = document.createElement( 'video' );
                myNewMedia.src = myMedia[i].src;
                myNewMedia.setAttribute("type", "video/mp4");
                myNewMedia.setAttribute("controls", "");
                const container_medias = document.getElementById("container_medias");
                container_medias.appendChild(myNewMedia);
                const lightbox = document.getElementById("myLightbox");
                lightbox.style.display = "block";
            })
        } else {
            myMedia[i].addEventListener('click', function() {
                const myNewMedia = document.createElement( 'img' );
                myNewMedia.src = myMedia[i].src;
                const container_medias = document.getElementById("container_medias");
                container_medias.appendChild(myNewMedia);
                const lightbox = document.getElementById("myLightbox");
                lightbox.style.display = "block";
            })
        }
    }
}

function closeLightbox() {
    const lightbox = document.getElementById("myLightbox");
    lightbox.style.display = "none";
}


//---------------------------LIGHTBOX---------------------------//
/* 
async function getTitleForLightbox() {
    const medias = await getMediaFromPhotographer();
    let allTitle = [];
    for (let i = 0; i < medias.length; i ++) {
        let title = medias[i].title;
        allTitle.push(title);
    }
    return allTitle;
}

async function getNumberForLightbox() {
    const medias = await getMediaFromPhotographer();
    let number = 0;
    for (let i = 0; i < medias.length; i ++) {
        number = medias.length;
    }
    return number;
}

async function getMediasForLightbox() {
    const medias = await getMediaFromPhotographer();
    let allMedia = [];
    for (let i = 0; i < medias.length; i ++) {
        if(medias[i].video != undefined) {
            let media = medias[i].video;
            allMedia.push(media);
        } else {
            let media = medias[i].image;
            allMedia.push(media);
        }
    }
    return allMedia;
}
*/