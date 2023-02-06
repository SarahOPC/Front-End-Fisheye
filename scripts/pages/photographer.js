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
    myMedia.forEach(media => media.addEventListener('click', function() {
        if (media.controls === true) {
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
        } else {
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
    }))
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
            currentMedia = mediaArray.indexOf(currentImage.id);
            // if there's already a media, remove it
            let currentImageVideoElement = container_medias.querySelector("img, video");
            if (currentImageVideoElement) {
                currentImageVideoElement.remove();
            }
            // change the index of the media to go to the previous
            currentMedia = (currentMedia - 1 + photographerMediaArray.length) % photographerMediaArray.length;
            if(photographerMediaArray[currentMedia].image !== undefined) {
                // looking for the title of the new media if image
                const fileName = photographerMediaArray[currentMedia].image.split(".")[0];
                const title = document.querySelector("#container_medias .title_medias_lb");
                title.textContent = fileName;
                const img = document.createElement( 'img' );
                img.setAttribute("src", "./assets/images/" + nameOfPhotograph + "/" + photographerMediaArray[currentMedia].image);
                img.setAttribute("id", photographerMediaArray[currentMedia].image.split(".")[0]);
                img.setAttribute("alt", photographerMediaArray[currentMedia].image.split(".")[0]);
                container_medias.appendChild(img);
            } else {
                // looking for the title of the new media if video
                const fileName = photographerMediaArray[currentMedia].video.split(".")[0];
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
        currentMedia = mediaArray.indexOf(currentVideo.id);
        // if there's already a media, remove it
        let currentImageVideoElement = container_medias.querySelector("img, video");
        if (currentImageVideoElement) {
            currentImageVideoElement.remove();
        }
        // change the index of the media to go to the previous
        currentMedia = (currentMedia - 1 + photographerMediaArray.length) % photographerMediaArray.length;
        if(photographerMediaArray[currentMedia].image !== undefined) {
            // looking for the title of the new media if image
            const fileName = photographerMediaArray[currentMedia].image.split(".")[0];
            const title = document.querySelector("#container_medias .title_medias_lb");
            title.textContent = fileName;
            const img = document.createElement( 'img' );
            img.setAttribute("src", "./assets/images/" + nameOfPhotograph + "/" + photographerMediaArray[currentMedia].image);
            img.setAttribute("id", photographerMediaArray[currentMedia].image.split(".")[0]);
            img.setAttribute("alt", photographerMediaArray[currentMedia].image.split(".")[0]);
            container_medias.appendChild(img);
        } else {
            // looking for the title of the new media if video
            const fileName = photographerMediaArray[currentMedia].video.split(".")[0];
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
            currentMedia = mediaArray.indexOf(currentImage.id);
            // if there's already a media, remove it
            let currentImageVideoElement = container_medias.querySelector("img, video");
            if (currentImageVideoElement) {
                currentImageVideoElement.remove();
            }
            // change the index of the media to go to the previous
            currentMedia = (currentMedia + 1) % photographerMediaArray.length;
            if(photographerMediaArray[currentMedia].image !== undefined) {
                // looking for the title of the new media if image
                const fileName = photographerMediaArray[currentMedia].image.split(".")[0];
                const title = document.querySelector("#container_medias .title_medias_lb");
                title.textContent = fileName;
                const img = document.createElement( 'img' );
                img.setAttribute("src", "./assets/images/" + nameOfPhotograph + "/" + photographerMediaArray[currentMedia].image);
                img.setAttribute("id", photographerMediaArray[currentMedia].image.split(".")[0]);
                img.setAttribute("alt", photographerMediaArray[currentMedia].image.split(".")[0]);
                container_medias.appendChild(img);
            } else {
                // looking for the title of the new media if video
                const fileName = photographerMediaArray[currentMedia].video.split(".")[0];
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
        currentMedia = mediaArray.indexOf(currentVideo.id);
        // if there's already a media, remove it
        let currentImageVideoElement = container_medias.querySelector("img, video");
        if (currentImageVideoElement) {
            currentImageVideoElement.remove();
        }
        // change the index of the media to go to the previous
        currentMedia = (currentMedia + 1) % photographerMediaArray.length;
        if(photographerMediaArray[currentMedia].image !== undefined) {
            // looking for the title of the new media if image
            const fileName = photographerMediaArray[currentMedia].image.split(".")[0];
            const title = document.querySelector("#container_medias .title_medias_lb");
            title.textContent = fileName;
            const img = document.createElement( 'img' );
            img.setAttribute("src", "./assets/images/" + nameOfPhotograph + "/" + photographerMediaArray[currentMedia].image);
            img.setAttribute("id", photographerMediaArray[currentMedia].image.split(".")[0]);
            img.setAttribute("alt", photographerMediaArray[currentMedia].image.split(".")[0]);
            container_medias.appendChild(img);
        } else {
            // looking for the title of the new media if video
            const fileName = photographerMediaArray[currentMedia].video.split(".")[0];
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

async function addToLike() {
    const medias = await getMediaFromPhotographer();
    let heartForLike = document.querySelectorAll("article.work .infos i");
    heartForLike.forEach(heart => heart.addEventListener("click", function() {
        // to not use the same query selector
        let parent = this.closest("article.work");
        let imageLiked = parent.querySelector("img");
        let videoLiked = parent.querySelector("video");
        if(imageLiked != null) {
            let imageLikedArray = imageLiked.src.split("/");
            let imageTitleAndExtension = imageLikedArray[imageLikedArray.length - 1];
            for (let i = 0; i < medias.length; i ++) {
                if(medias[i].image === imageTitleAndExtension) {
                    let alreadyLike = parseInt(parent.querySelector(".infos").children[1].textContent);
                    let addedLike = parseInt(1);
                    let newLikes = alreadyLike + addedLike;
                    parent.querySelector(".infos").children[1].textContent = newLikes;
                    break;
                }
            }
        } else {
            let videoLikedArray = videoLiked.src.split("/");
            let videoTitleAndExtension = videoLikedArray[videoLikedArray.length - 1];
            for (let i = 0; i < medias.length; i ++) {
                if(medias[i].video === videoTitleAndExtension) {
                    let alreadyLike = parseInt(parent.querySelector(".infos").children[1].textContent);
                    let addedLike = parseInt(1);
                    let newLikes = alreadyLike + addedLike;
                    parent.querySelector(".infos").children[1].textContent = newLikes;
                    break;
                }
            }
        }
    }));
}