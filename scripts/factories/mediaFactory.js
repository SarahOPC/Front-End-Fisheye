function mediaFactory(data) {
    const {photographerId, title, image, likes, name} = data; 

    const picture = `assets/images/${name}/${image}`;

    function getmediaDOM() {
        const section = document.createElement( 'section' );
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", title);
        const p = document.createElement( 'p' );
        p.textContent(title);
        p.textContent(likes);
        article.appendChild(img);
        article.appendChild(p);
        section.appendChild(article);
        return (section);
    }
    return { getmediaDOM }
}