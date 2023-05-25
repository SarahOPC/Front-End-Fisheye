/* eslint-disable no-unused-vars */
function photographerFactory(data) {
    const { name, portrait, city, country, price, tagline, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", "photographer profile photo");
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.setAttribute("ariaLabel", "name");
        const a = document.createElement( 'a' );
        const linkDiv = document.createElement( 'div' );
        linkDiv.appendChild(img);
        linkDiv.appendChild(h2);
        a.appendChild(linkDiv);
        a.href = `./photographer.html?id=${id}`;
        a.setAttribute("ariaLabel", "Link to the photographer's personal page");
        const h4 = document.createElement( 'h4' );
        h4.textContent = city + ', ' + country;
        const h5 = document.createElement( 'h5' );
        h5.textContent = tagline;
        const h6 = document.createElement( 'h6' );
        h6.textContent = price + " € / jour";
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