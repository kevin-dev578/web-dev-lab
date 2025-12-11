/*
Get our items input and button

if the input doesnt contain @.com 
    Throw an error message (use css) Please enter a valid email address
    clear the user input
else
    "Thanks! We’ll get you started."

 */

const emailAddress = document.getElementById("email-address-field");
const submitBtn = document.getElementById("submit-Btn");
let listOfEmails = JSON.parse(localStorage.getItem("netflix-emails")) || [];

function saveEmailToStorage(list) {
    localStorage.setItem("netflix-emails", JSON.stringify(list));
}

submitBtn.addEventListener("click", () => {

    const emailInput = emailAddress.value;

    if (!emailInput.includes("@") || !emailInput.includes(".com"))
    {
        alert("Please enter a valid email address!");
        emailAddress.value = "";
    } else {
        alert("Thanks! We’ll get you started.");
        listOfEmails.push(emailInput);
        saveEmailToStorage(listOfEmails);
        emailAddress.value = "";
    } 
});