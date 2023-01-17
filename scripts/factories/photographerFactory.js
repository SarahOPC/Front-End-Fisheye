function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", "photo de profil du photographe");
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const a = document.createElement( 'a' );
        const linkDiv = document.createElement( 'div' );
        linkDiv.appendChild(img);
        linkDiv.appendChild(h2);
        a.appendChild(linkDiv);
        a.href = `./photographer.html?id=${id}`;
        a.ariaLabel = "Lien vers la page personnelle du photographe";
        const h4 = document.createElement( 'h4' );
        h4.textContent = city + ', ' + country;
        const h5 = document.createElement( 'h5' );
        h5.textContent = tagline;
        const h6 = document. createElement( 'h6' );
        h6.textContent = price + '€/jour';
        const div = document.createElement( 'div' );
        article.appendChild(a);
        article.appendChild(div);
        div.appendChild(h4);
        div.appendChild(h5);
        div.appendChild(h6);
        return (article);
    }
    return { name, picture, city, country, getUserCardDOM }
}