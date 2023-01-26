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
    const lightbox = document.getElementById("myLightbox");
	lightbox.style.display = "block";
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

async function getLightboxDom() {
    let title = await getTitleForLightbox();
    let number = await getNumberForLightbox();
    let media = await getMediasForLightbox();
    
    const div = document.createElement( 'div' );
    div.setAttribute("id", "myLightbox");
    div.setAttribute("class", "lightbox");

    const span = document.createElement( 'span' );
    span.setAttribute("class", "close cursor");
    span.setAttribute("onclick", "closeLightbox");

    const divContent = document.createElement( 'div' );
    divContent.setAttribute("class", "lb-content");

    const divSlide = document.createElement( 'div' );
    divSlide.setAttribute("class", "mySlides");

    const divNumber = document.createElement( 'div' );
    divNumber.setAttribute("class", "numberText");
    //divNumber.textContent = 
    const imgLb = document.createElement( 'img' );
    //imgLb.setAttribute("src", )

    // Next/previous controls
    const aPrev = document.createElement( 'a' );
    aPrev.setAttribute("class", "prev");
    aPrev.setAttribute("onclick", "plusSlides(-1)");
    aPrev.textContent = "&#10094;";

    const aNext = document.createElement( 'a' );
    aNext.setAttribute("class", "next");
    aNext.setAttribute("onclick", "plusSlides(1)");
    aNext.textContent = "&#10095;";

    // Caption text
    const divCaption = document.createElement( 'div' );
    divCaption.setAttribute("class", "caption-container");
    const pCaption = document.createElement( 'p' );
    pCaption.setAttribute("id", "caption");

    // Thumbnail image controls
    const divColumn = document.createElement( 'div' );
    divColumn.setAttribute("class", "column");

    const imgLightbox = document.createElement( 'img' );
    imgLightbox.setAttribute("class", "lbLightbox");
    //imgLightbox.setAttribute("src", );
    //imgLightbox.setAttribute("alt", );

    divCaption.appendChild(pCaption);
    divColumn.appendChild(imgLightbox);
    divNumber.appendChild(imgLb);
    divSlide.appendChild(divNumber);
    divContent.appendChild(divColumn);
    divContent.appendChild(divCaption);
    divContent.appendChild(aPrev);
    divContent.appendChild(aNext);
    divContent.appendChild(divSlide);
    div.appendChild(span);
    div.appendChild(divContent); 
    }

getLightboxDom();
*/

function openLightbox() {
    document.getElementById("myLightbox").style.display = "block";
}
/*

function closeLightbox() {
    document.getElementById("myLightbox").style.display = "none";
}

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("lbLightbox");
    let captionText = document.getElementById("caption");

    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    captionText.innerHTML = dots[slideIndex-1].alt;
}
 */