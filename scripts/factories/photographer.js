function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", "photo de profil du photographe");
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h4 = document.createElement( 'h4' );
        h4.textContent = city + ', ' + country;
        const h5 = document.createElement( 'h5' );
        h5.textContent = tagline;
        const h6 = document. createElement( 'h6' );
        h6.textContent = price + '€/jour';
        const div = document.createElement( 'div' );
        article.appendChild(img);
        article.appendChild(div);
        div.appendChild(h2);
        div.appendChild(h4);
        div.appendChild(h5);
        div.appendChild(h6);
        return (article);
    }
    return { name, picture, city, country, getUserCardDOM }
}