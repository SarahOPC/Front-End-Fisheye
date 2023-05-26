/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
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
}

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
                    likes: photographerMedias.media[i].likes,
                    date: photographerMedias.media[i].date
                }
                medias.push(media);
            }
            if (photographerMedias.media[i].image == undefined) {
                let media = 
                {
                    video: photographerMedias.media[i].video,
                    title: photographerMedias.media[i].title,
                    likes: photographerMedias.media[i].likes,
                    date: photographerMedias.media[i].date
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
}

displayMedia().then(()=>{
    addToLike();
});

//---------------------------FIXEDDIV---------------------------//

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

//---------------------------FIXEDDIV---------------------------//

//---------------------------LIGHTBOX---------------------------//

function openLightbox(event, id) {
    const media = document.getElementById(id);
    if(event === 13) { // keycode of Enter key
        if (media.controls === true) {
            videoLightbox(media);
        } else {
            imageLightbox(media);
        }
    } else if(event === 'click') {
        if (media.controls === true) {
            videoLightbox(media);
        } else {
            imageLightbox(media);
        }
    }
}

function videoLightbox(media) {
    const myNewMedia = document.createElement( 'video' );
    myNewMedia.src = media.src;
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
}

function imageLightbox(media) {
    const myNewMedia = document.createElement( 'img' );
    myNewMedia.src = media.src;
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

async function leftArrowScroll() {
    let photographerMediaArray = await getMediaFromPhotographer();
    // map() method create a new array with the result of the split
    let mediaArray = [];
    photographerMediaArray.forEach(media => {
        if (media.image) {
            mediaArray.push(media.image.split('.')[0]);
        }
        if (media.video) {
            mediaArray.push(media.video.split('.')[0]);
        }
    });
    let nameOfPhotographArray = await getPersonnalInformationsPhotographer();
    let nameOfPhotograph = nameOfPhotographArray.name.split(" ")[0];
    const container_medias = document.getElementById("container_medias");
    let currentImage = document.querySelector("#container_medias img");
    let currentVideo = document.querySelector("#container_medias video");
    
    if(currentImage !== null) {
        if(mediaArray.includes(currentImage.id)) {
            let currentMedia = mediaArray.indexOf(currentImage.id);
            // if there's already a media, remove it
            let currentImageVideoElement = container_medias.querySelector("img, video");
            if (currentImageVideoElement) {
                currentImageVideoElement.remove();
            }
            // change the index of the media to go to the previous
            currentMedia = (currentMedia - 1 + photographerMediaArray.length) % photographerMediaArray.length;
            if(photographerMediaArray[currentMedia].image !== undefined) {
                // looking for the title of the new media if image
                const fileName = photographerMediaArray[currentMedia].title;
                const title = document.querySelector("#container_medias .title_medias_lb");
                title.textContent = fileName;
                const img = document.createElement( 'img' );
                img.setAttribute("src", "./assets/images/" + nameOfPhotograph + "/" + photographerMediaArray[currentMedia].image);
                img.setAttribute("id", photographerMediaArray[currentMedia].image.split(".")[0]);
                img.setAttribute("alt", photographerMediaArray[currentMedia].image.split(".")[0]);
                container_medias.appendChild(img);
            } else {
                // looking for the title of the new media if video
                const fileName = photographerMediaArray[currentMedia].title;
                const title = document.querySelector("#container_medias .title_medias_lb");
                title.textContent = fileName;
                const video = document.createElement( 'video' );
                video.setAttribute("src", "./assets/images/" + nameOfPhotograph + "/" + photographerMediaArray[currentMedia].video);
                video.setAttribute("id", photographerMediaArray[currentMedia].video.split(".")[0]);
                video.setAttribute("alt", photographerMediaArray[currentMedia].video.split(".")[0]);
                video.setAttribute("controls", "");
                container_medias.appendChild(video);
            }
        }
    } else if (mediaArray.includes(currentVideo.id)) {
        let currentMedia = mediaArray.indexOf(currentVideo.id);
        // if there's already a media, remove it
        let currentImageVideoElement = container_medias.querySelector("img, video");
        if (currentImageVideoElement) {
            currentImageVideoElement.remove();
        }
        // change the index of the media to go to the previous
        currentMedia = (currentMedia - 1 + photographerMediaArray.length) % photographerMediaArray.length;
        if(photographerMediaArray[currentMedia].image !== undefined) {
            // looking for the title of the new media if image
            const fileName = photographerMediaArray[currentMedia].title;
            const title = document.querySelector("#container_medias .title_medias_lb");
            title.textContent = fileName;
            const img = document.createElement( 'img' );
            img.setAttribute("src", "./assets/images/" + nameOfPhotograph + "/" + photographerMediaArray[currentMedia].image);
            img.setAttribute("id", photographerMediaArray[currentMedia].image.split(".")[0]);
            img.setAttribute("alt", photographerMediaArray[currentMedia].image.split(".")[0]);
            container_medias.appendChild(img);
        } else {
            // looking for the title of the new media if video
            const fileName = photographerMediaArray[currentMedia].title;
            const title = document.querySelector("#container_medias .title_medias_lb");
            title.textContent = fileName;
            const video = document.createElement( 'video' );
            video.setAttribute("src", "./assets/images/" + nameOfPhotograph + "/" + photographerMediaArray[currentMedia].video);
            video.setAttribute("id", photographerMediaArray[currentMedia].video.split(".")[0]);
            video.setAttribute("alt", photographerMediaArray[currentMedia].video.split(".")[0]);
            video.setAttribute("controls", "");
            container_medias.appendChild(video);
        }
    }
}

async function rightArrowScroll() {
    let photographerMediaArray = await getMediaFromPhotographer();
    // map() method create a new array with the result of the split
    let mediaArray = [];
    photographerMediaArray.forEach(media => {
        if (media.image) {
            mediaArray.push(media.image.split('.')[0]);
        }
        if (media.video) {
            mediaArray.push(media.video.split('.')[0]);
        }
    });
    let nameOfPhotographArray = await getPersonnalInformationsPhotographer();
    let nameOfPhotograph = nameOfPhotographArray.name.split(" ")[0];
    const container_medias = document.getElementById("container_medias");
    let currentImage = document.querySelector("#container_medias img");
    let currentVideo = document.querySelector("#container_medias video");
    
    if(currentImage !== null) {
        if(mediaArray.includes(currentImage.id)) {
            let currentMedia = mediaArray.indexOf(currentImage.id);
            // if there's already a media, remove it
            let currentImageVideoElement = container_medias.querySelector("img, video");
            if (currentImageVideoElement) {
                currentImageVideoElement.remove();
            }
            // change the index of the media to go to the previous
            currentMedia = (currentMedia + 1) % photographerMediaArray.length;
            if(photographerMediaArray[currentMedia].image !== undefined) {
                // looking for the title of the new media if image
                const fileName = photographerMediaArray[currentMedia].title;
                const title = document.querySelector("#container_medias .title_medias_lb");
                title.textContent = fileName;
                const img = document.createElement( 'img' );
                img.setAttribute("src", "./assets/images/" + nameOfPhotograph + "/" + photographerMediaArray[currentMedia].image);
                img.setAttribute("id", photographerMediaArray[currentMedia].image.split(".")[0]);
                img.setAttribute("alt", photographerMediaArray[currentMedia].image.split(".")[0]);
                container_medias.appendChild(img);
            } else {
                // looking for the title of the new media if video
                const fileName = photographerMediaArray[currentMedia].title;
                const title = document.querySelector("#container_medias .title_medias_lb");
                title.textContent = fileName;
                const video = document.createElement( 'video' );
                video.setAttribute("src", "./assets/images/" + nameOfPhotograph + "/" + photographerMediaArray[currentMedia].video);
                video.setAttribute("id", photographerMediaArray[currentMedia].video.split(".")[0]);
                video.setAttribute("alt", photographerMediaArray[currentMedia].video.split(".")[0]);
                video.setAttribute("controls", "");
                container_medias.appendChild(video);
            }
        }
    } else if (mediaArray.includes(currentVideo.id)) {
        let currentMedia = mediaArray.indexOf(currentVideo.id);
        // if there's already a media, remove it
        let currentImageVideoElement = container_medias.querySelector("img, video");
        if (currentImageVideoElement) {
            currentImageVideoElement.remove();
        }
        // change the index of the media to go to the previous
        currentMedia = (currentMedia + 1) % photographerMediaArray.length;
        if(photographerMediaArray[currentMedia].image !== undefined) {
            // looking for the title of the new media if image
            const fileName = photographerMediaArray[currentMedia].title;
            const title = document.querySelector("#container_medias .title_medias_lb");
            title.textContent = fileName;
            const img = document.createElement( 'img' );
            img.setAttribute("src", "./assets/images/" + nameOfPhotograph + "/" + photographerMediaArray[currentMedia].image);
            img.setAttribute("id", photographerMediaArray[currentMedia].image.split(".")[0]);
            img.setAttribute("alt", photographerMediaArray[currentMedia].image.split(".")[0]);
            container_medias.appendChild(img);
        } else {
            // looking for the title of the new media if video
            const fileName = photographerMediaArray[currentMedia].title;
            const title = document.querySelector("#container_medias .title_medias_lb");
            title.textContent = fileName;
            const video = document.createElement( 'video' );
            video.setAttribute("src", "./assets/images/" + nameOfPhotograph + "/" + photographerMediaArray[currentMedia].video);
            video.setAttribute("id", photographerMediaArray[currentMedia].video.split(".")[0]);
            video.setAttribute("alt", photographerMediaArray[currentMedia].video.split(".")[0]);
            video.setAttribute("controls", "");
            container_medias.appendChild(video);
        }
    }
}

//---------------------------LIGHTBOX---------------------------//

//---------------------------LIKE-DISLIKE---------------------------//

async function addToLike() {
    const medias = await getMediaFromPhotographer();
    let heartForLike = document.querySelectorAll("article.work .infos p");
    heartForLike.forEach(heart => heart.addEventListener("click", function() {
        // parent = to not use the same query selector
        // this = for the element clicked
        let parent = this.closest("article.work");
        if (!parent) {
            console.error('Parent element not found');
            return;
        }
        let imageLiked = parent.querySelector("img");
        let videoLiked = parent.querySelector("video");
        if(imageLiked != null) {
            let imageLikedArray = imageLiked.src.split("/");
            let imageTitleAndExtension = imageLikedArray[imageLikedArray.length - 1];
            for (let i = 0; i < medias.length; i ++) {
                if(medias[i].image === imageTitleAndExtension) {
                    changeDomLike(parent);
                    break;
                }
            }
        } else {
            let videoLikedArray = videoLiked.src.split("/");
            let videoTitleAndExtension = videoLikedArray[videoLikedArray.length - 1];
            for (let i = 0; i < medias.length; i ++) {
                if(medias[i].video === videoTitleAndExtension) {
                    changeDomLike(parent);
                    break;
                }
            }
        } return;
    }));
}

function changeDomLike(parent) {
    let alreadyLike = parseInt(parent.querySelector(".infos").children[1].textContent);
    let likeHeart = parent.querySelector(".infos i.fa-thumbs-up");
    let dislikeHeart = parent.querySelector(".infos i.fa-thumbs-down");
    
    if (likeHeart == null || dislikeHeart) {
        // like
        let addedLike = parseInt(1);
        let newLikes = alreadyLike + addedLike;
        parent.querySelector(".infos").children[1].textContent = newLikes;
        likeHeart = document.createElement( 'i' );
        likeHeart.setAttribute("class", "fa fa-thumbs-up");
        parent.querySelector(".infos").children[1].appendChild(likeHeart);
        const totalHeart = document.createElement( 'i' );
        totalHeart.setAttribute("class", "fa fa-heart");
        let actualTotalLike = document.querySelector(".photograph-body .fixedDiv p").textContent;
        let newTotalLike = parseInt(actualTotalLike) + 1;
        document.querySelector(".photograph-body .fixedDiv p").textContent = newTotalLike;
        document.querySelector(".photograph-body .fixedDiv p").appendChild(totalHeart);
        return;
    } else {
        // dislike
        let removedLike = parseInt(1);
        let newLikes = alreadyLike - removedLike;
        parent.querySelector(".infos").children[1].textContent = newLikes;
        likeHeart.remove();
        dislikeHeart = document.createElement('i');
        dislikeHeart.setAttribute("class", "fa fa-thumbs-down");
        parent.querySelector(".infos").children[1].appendChild(dislikeHeart);
        const totalHeart = document.createElement( 'i' );
        totalHeart.setAttribute("class", "fa fa-heart");
        let actualTotalLike = document.querySelector(".photograph-body .fixedDiv p").textContent;
        let newTotalLike = parseInt(actualTotalLike) - 1;
        document.querySelector(".photograph-body .fixedDiv p").textContent = newTotalLike;
        document.querySelector(".photograph-body .fixedDiv p").appendChild(totalHeart);
        return;
    }
}

//---------------------------LIKE-DISLIKE---------------------------//

//---------------------------SORTING---------------------------//

function openMenu() {
    const buttonDate = document.createElement( 'button' );
    buttonDate.setAttribute("class", "date");
    buttonDate.setAttribute("onclick", "displayMediaByDate()");
    buttonDate.textContent = "Date";
    const buttonTitle = document.createElement( 'button' );
    buttonTitle.setAttribute("class", "title");
    buttonTitle.setAttribute("onclick", "displayMediaByTitle()");
    buttonTitle.textContent = "Titre";
    buttonDate.setAttribute("role", "listbox");
    buttonDate.setAttribute("aria-activedescendant", "");
    buttonDate.setAttribute("aria-selected", "");
    buttonDate.setAttribute("aria-labelledby", "sorted");
    buttonTitle.setAttribute("role", "listbox");
    buttonTitle.setAttribute("aria-activedescendant", "");
    buttonTitle.setAttribute("aria-selected", "");
    buttonTitle.setAttribute("aria-labelledby", "sorted");
    let appendDiv = document.querySelector(".sortItems");
    appendDiv.appendChild(buttonDate);
    appendDiv.appendChild(buttonTitle);
    const replacedI = document.querySelector(".fa.fa-chevron-down");
    replacedI.removeAttribute("class");
    replacedI.setAttribute("class", "fa fa-chevron-up");
    replacedI.setAttribute("onclick", "closeMenu()");
    return;
}

function closeMenu() {
    const parentDiv = document.querySelector(".sortItems");
    const buttonDate = document.querySelector(".date");
    const buttonTitle = document.querySelector(".title");
    const i = document.querySelector(".fa.fa-chevron-up");
    let firstRemovedElement = parentDiv.removeChild(buttonDate);
    let secondRemovedElement = parentDiv.removeChild(buttonTitle);
    i.removeAttribute("class");
    i.setAttribute("class", "fa fa-chevron-down");
    i.setAttribute("onclick", "openMenu()");
    return;
}

async function displayMediaByPopularity() {
    const medias = await getMediaFromPhotographer();
    medias.sort((a, b) => {
        return b.likes - a.likes;
    })
    const main = document.querySelector("main");
    const mediaSection = document.querySelector(".photograph-body");
    main.removeChild(mediaSection);
    const divMediaSection = document.createElement( 'div' );
    divMediaSection.setAttribute("class", "photograph-body");
    const mediaModel = mediaFactory(medias);
    const getmediaDOM = mediaModel.getmediaDOM();
    divMediaSection.appendChild(getmediaDOM);
    main.appendChild(divMediaSection);
}

async function displayMediaByDate() {
    const medias = await getMediaFromPhotographer();
    medias.sort((a, b) => {
        return b.date - a.date;
    })
    const main = document.querySelector("main");
    const mediaSection = document.querySelector(".photograph-body");
    main.removeChild(mediaSection);
    const divMediaSection = document.createElement( 'div' );
    divMediaSection.setAttribute("class", "photograph-body");
    const mediaModel = mediaFactory(medias);
    const getmediaDOM = mediaModel.getmediaDOM();
    divMediaSection.appendChild(getmediaDOM);
    main.appendChild(divMediaSection);
}

async function displayMediaByTitle() {
    const medias = await getMediaFromPhotographer();
    medias.sort((a, b) => {
        const titleA = a.title.toUpperCase(); // ignore upper and lowercase
        const titleB = b.title.toUpperCase(); // ignore upper and lowercase
        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        if (titleA == titleB) {
            return 0;
        }
    })
    const main = document.querySelector("main");
    const mediaSection = document.querySelector(".photograph-body");
    main.removeChild(mediaSection);
    const divMediaSection = document.createElement( 'div' );
    divMediaSection.setAttribute("class", "photograph-body");
    const mediaModel = mediaFactory(medias);
    const getmediaDOM = mediaModel.getmediaDOM();
    divMediaSection.appendChild(getmediaDOM);
    main.appendChild(divMediaSection);
}

//---------------------------SORTING---------------------------//