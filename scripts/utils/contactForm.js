/* eslint-disable no-unused-vars */
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.setAttribute("tabindex", "0");
	modal.style.display = "block";
    insertName();

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
    bodyHeader.removeAttribute("class");
    bodyMain.removeAttribute("class");
}

function handleModalEscapeKey(event) {
    if(event.key === 'Escape') {
        closeModal();
    }
}

function insertName() {
    const firstH2 = document.querySelector("#contact_modal .modal header h2");
    const name = document.querySelector("article a div h2").textContent;
    const h2 = document.createElement( 'h2' );
    h2.textContent = name;
    firstH2.insertAdjacentElement("afterend", h2);
    const textInputUserFirstName = document.getElementById("userFirstName");
    textInputUserFirstName.setAttribute("tabindex", "0");
    textInputUserFirstName.focus(); // add a focus to be sure the input receives the focus when the modal is displayed
}

function retrieveDataFromForm(event) {
    const userFirstName = document.querySelector(".modal-form #userFirstName").value;
    const userLastName = document.querySelector(".modal-form #userLastName").value;
    const userEmail = document.querySelector(".modal-form #userEmail").value;
    const userMessage = document.querySelector(".modal-form #userMessage").value;
    console.log(userFirstName);
    console.log(userLastName);
    console.log(userEmail);
    console.log(userMessage);
    if(event === 13) {
        console.log(userFirstName);
        console.log(userLastName);
        console.log(userEmail);
        console.log(userMessage);
    }
}

document.getElementById("contact_button_send").addEventListener("click", function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    closeModal();
    });