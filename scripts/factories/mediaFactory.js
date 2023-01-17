function mediaFactory(data) {
    const {title, image, likes} = data;

    function getmediaDOM() {
        const section = document.createElement( 'section' );
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        const name = document.getElementsByTagName( 'h2' );
        const firstName = name.split(" ").shift();
        const picture = `assets/images/${firstName}/${image}`;
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