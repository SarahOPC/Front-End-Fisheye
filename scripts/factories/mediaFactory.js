function mediaFactory(data) {
    const name = document.getElementsByTagName( 'h2' )[0].innerText;
    console.log(name);
    const firstName = name.split(" ").shift();
    console.log(firstName);

    function getmediaDOM() {
        if (data.video !== undefined) {
            const { title, video, likes } = data;
            const videoMedia = `assets/images/${firstName}/${video}`;
            const videos = document.createElement( 'video' );
            videos.setAttribute("src" , videoMedia);
            videos.setAttribute("type", "video/mp4");
            const p = document.createElement( 'p' );
            p.textContent = title;
            p.textContent = likes;
            const section = document.createElement( 'section' );
            const article = document.createElement( 'article' );
            article.appendChild(p);
            section.appendChild(article);
            return (section);
        } else {
            const { title, image, likes } = data;
            const picture = `assets/images/${firstName}/${image}`;
            const img = document.createElement( 'img' );
            img.setAttribute("src", picture);
            img.setAttribute("alt", title);
            const p = document.createElement( 'p' );
            p.textContent = title;
            p.textContent = likes;
            const section = document.createElement( 'section' );
            const article = document.createElement( 'article' );
            article.appendChild(img);
            article.appendChild(p);
            section.appendChild(article);
            return (section);
        };
    }
    return { getmediaDOM };
}