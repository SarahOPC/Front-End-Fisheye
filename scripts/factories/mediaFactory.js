/* eslint-disable no-unused-vars */
function mediaFactory(data) {
    const name = document.getElementsByTagName( 'h2' )[0].innerText;
    const firstName = name.split(" ").shift();

    function getmediaDOM() {
        const div = document.createElement( 'div' );
        for (let i = 0; i < data.length; i ++) {
            if (data[i].video != undefined) {
                const videoMedia = `./assets/images/${firstName}/${data[i].video}`;
                const videos = document.createElement( 'video' );
                videos.setAttribute("src" , videoMedia);
                videos.setAttribute("type", "video/mp4");
                videos.setAttribute("controls", "");
                videos.setAttribute("onclick", "openLightbox()");
                videos.setAttribute("onkeydown", "openLightbox()");
                videos.setAttribute("class", "myMedias");
                videos.setAttribute("tabindex", "0");
                const infos = document.createElement( 'div' );
                infos.setAttribute("class", "infos");
                const pTitle = document.createElement( 'p' );
                const pLikes = document.createElement( 'p' );
                pLikes.setAttribute("aria-label", "likes");
                pTitle.textContent = data[i].title;
                pTitle.setAttribute("class", "myMedias");
                pLikes.textContent = data[i].likes;
                const heart = document.createElement( 'i' );
                heart.setAttribute("class", "fa fa-heart");
                pLikes.appendChild(heart);
                infos.appendChild(pTitle);
                infos.appendChild(pLikes);
                const article = document.createElement( 'article' );
                article.setAttribute("class", "work");
                article.appendChild(videos);
                article.appendChild(infos);
                div.appendChild(article);
            } else {
                const picture = `./assets/images/${firstName}/${data[i].image}`;
                const img = document.createElement( 'img' );
                img.setAttribute("src", picture);
                img.setAttribute("alt", data[i].title);
                img.setAttribute("onclick", "openLightbox()");
                img.setAttribute("onkeydown", "openLightbox()");
                img.setAttribute("class", "myMedias");
                img.setAttribute("tabindex", "0");
                const infos = document.createElement( 'div' );
                infos.setAttribute("class", "infos");
                const pTitle = document.createElement( 'p' );
                const pLikes = document.createElement( 'p' );
                pLikes.setAttribute("aria-label", "likes");
                pTitle.textContent = data[i].title;
                pTitle.setAttribute("class", "myMedias");
                pLikes.textContent = data[i].likes;
                const heart = document.createElement( 'i' );
                heart.setAttribute("class", "fa fa-heart");
                pLikes.appendChild(heart);
                infos.appendChild(pTitle);
                infos.appendChild(pLikes);
                const article = document.createElement( 'article' );
                article.setAttribute("class", "work");
                article.appendChild(img);
                article.appendChild(infos);
                div.appendChild(article);
            }
        }
        return div;
    }
    return { getmediaDOM };
}