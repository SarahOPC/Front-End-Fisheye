function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function insertName() {
    const modal = document.querySelector("#contact_modal .modal header");
    const firstH2 = document.querySelector("#contact_modal .modal header h2");
    const name = document.querySelector("article a div h2").textContent;
    const h2 = document.createElement( 'h2' );
    h2.textContent = name;
    firstH2.insertAdjacentHTML("afterBegin", h2);
    modal.appendChild(h2);

}

insertName();