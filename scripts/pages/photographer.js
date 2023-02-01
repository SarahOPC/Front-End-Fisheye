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
                let titleArray = myNewMedia.src.split("/");
                let titleAndExtension = titleArray[titleArray.length - 1];
                let title = titleAndExtension.split(".")[0];
                myNewMedia.setAttribute("id", title);
                const container_medias = document.getElementById("container_medias");
                container_medias.appendChild(myNewMedia);
                const lightbox = document.getElementById("myLightbox");
                lightbox.style.display = "block";
                const bodyHeader = document.querySelector("body header");
                const bodyMain = document.querySelector("body main");
                bodyHeader.setAttribute("class", "modalBlur");
                bodyMain.setAttribute("class", "modalBlur");
            })
        } else {
            myMedia[i].addEventListener('click', function() {
                const myNewMedia = document.createElement( 'img' );
                myNewMedia.src = myMedia[i].src;
                let titleArray = myNewMedia.src.split("/");
                let titleAndExtension = titleArray[titleArray.length - 1];
                let title = titleAndExtension.split(".")[0];
                myNewMedia.setAttribute("id", title);
                myNewMedia.setAttribute("alt", title);
                const container_medias = document.getElementById("container_medias");
                container_medias.appendChild(myNewMedia);
                const lightbox = document.getElementById("myLightbox");
                lightbox.style.display = "block";
                const bodyHeader = document.querySelector("body header");
                const bodyMain = document.querySelector("body main");
                bodyHeader.setAttribute("class", "modalBlur");
                bodyMain.setAttribute("class", "modalBlur");
            })
        }
    }
}

function closeLightbox() {
    const lightbox = document.getElementById("myLightbox");
    lightbox.style.display = "none";
    const container_medias = document.getElementById("container_medias");
    container_medias.innerHTML = '';
    const bodyHeader = document.querySelector("body header");
    const bodyMain = document.querySelector("body main");
    bodyHeader.removeAttribute("class");
    bodyMain.removeAttribute("class");
    location.reload();
}

let currentMedia = 0;

function leftArrowScroll() {
    const myMediaz = document.querySelectorAll(".photograph-body div article.work");
    const container_medias = document.getElementById("container_medias");
    
    // if there's already a media, remove it
    let currentImageVideoElement = container_medias.querySelector("img, video");
    if (currentImageVideoElement) {
        currentImageVideoElement.remove();
    }
    
    // change the index of the media to go to the previous
    currentMedia = (currentMedia - 1 + myMediaz.length) % myMediaz.length;
    myMediaz[currentMedia].children[0].src = myMediaz[currentMedia].children[0].getAttribute("src");
    
    // looking for the title of the media
    const fileName = myMediaz[currentMedia].children[1].children[0].textContent;
    const title = document.querySelector("#container_medias .title_medias_lb");
    title.textContent = fileName;

    // looking for the extension of the media
    const srcArray = myMediaz[currentMedia].children[0].src.split("/");
    const fileExtension = srcArray[srcArray.length - 1].split(".")[1];
    
    if(fileExtension === "jpg") {
        const img = document.createElement( 'img' );
        img.setAttribute("src", myMediaz[currentMedia].children[0].src);
        container_medias.appendChild(img);
    } else {
        const video = document.createElement( 'video' );
        video.setAttribute("src", myMediaz[currentMedia].children[0].src);
        video.setAttribute("controls", "");
        container_medias.appendChild(video);
    }
}

function rightArrowScroll() {
    const myMediaz = document.querySelectorAll(".photograph-body div article.work");
    const container_medias = document.getElementById("container_medias");
    
    // if there's already a media, remove it
    let currentImageVideoElement = container_medias.querySelector("img, video");
    if (currentImageVideoElement) {
        currentImageVideoElement.remove();
    }
    
    // change the index of the media to go to the following
    currentMedia = (currentMedia + 1) % myMediaz.length;
    myMediaz[currentMedia].children[0].src = myMediaz[currentMedia].children[0].getAttribute("src");
    
    // looking for the title of the media
    const fileName = myMediaz[currentMedia].children[1].children[0].textContent;
    const title = document.querySelector("#container_medias .title_medias_lb");
    title.textContent = fileName;
    
    // looking for the extension of the media
    const srcArray = myMediaz[currentMedia].children[0].src.split("/");
    const fileExtension = srcArray[srcArray.length - 1].split(".")[1];

    if(fileExtension === "jpg") {
        const img = document.createElement( 'img' );
        img.setAttribute("src", myMediaz[currentMedia].children[0].src);
        container_medias.appendChild(img);
    } else {
        const video = document.createElement( 'video' );
        video.setAttribute("src", myMediaz[currentMedia].children[0].src);
        video.setAttribute("controls", "");
        container_medias.appendChild(video);
    }
}
//---------------------------LIGHTBOX---------------------------//