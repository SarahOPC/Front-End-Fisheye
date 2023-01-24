function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";

    const bodyHeader = document.querySelector("body header");
    const bodyMain = document.querySelector("body main");
    bodyHeader.setAttribute("class", "modalBlur");
    bodyMain.setAttribute("class", "modalBlur");
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";

    const bodyHeader = document.querySelector("body header");
    const bodyMain = document.querySelector("body main");
    bodyHeader.setAttribute("class", "");
    bodyMain.setAttribute("class", "");
}

function insertName() {
    const firstH2 = document.querySelector("#contact_modal .modal header h2");
    const name = document.querySelector("article a div h2").textContent;
    const h2 = document.createElement( 'h2' );
    h2.textContent = name;
    firstH2.insertAdjacentElement("afterend", h2);
}

insertName();