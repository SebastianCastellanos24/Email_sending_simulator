
document.addEventListener("DOMContentLoaded", () => {

    const inputEmail = document.querySelector("#email");
    const inputSubject = document.querySelector("#subject");
    const inputMessage = document.querySelector("#message");
    const inputCopy = document.querySelector("#copy");

    const btnSubmit = document.querySelector('#form button[type="submit"]');
    const btnReset = document.querySelector('#form button[type="reset"]');
    const btnAtivateCopy = document.querySelector('#form button[type="button"]')

    const form = document.querySelector("#form");
    const spinner = document.querySelector("#spinner");

    const email = {
        email: "",
        subject: "",
        message: ""
    }

    //Events
    inputEmail.addEventListener("blur", validate);

    inputSubject.addEventListener("blur", validate);

    inputMessage.addEventListener("blur", validate);

    inputCopy.addEventListener("blur", copyMail);

    form.addEventListener("submit", sendMail);

    btnAtivateCopy.addEventListener("click", function(e) {
        if(inputCopy.disabled) {
            inputCopy.disabled = false;
            inputCopy.classList.add("border-green-300");
        } else {
            inputCopy.value = "";
            inputCopy.disabled = true;
            inputCopy.classList.remove("border-green-300");
            delete email.copy
            cleanAlert(e.target.parentElement);
        }
    })

    btnReset.addEventListener("click", function(e) {
        e.preventDefault();
        resetForm();
    });

    function copyMail (e) {
        const searchKey = Object.keys(email);
        const copyIshere = searchKey.includes("copy");
        if(!copyIshere) {
            copyValidate(e.target.value, e.target.parentElement);
            email.copy = e.target.value
            console.log(email)
        } else {
            copyValidate(e.target.value, e.target.parentElement);
        }
    }

    function copyValidate (reference, reference2) {

        if(reference.trim() === "") {
            Alert("The copy email field is required", reference2);
            return;
        }

        if(!validateEmail(reference)) {
            Alert("The email is not valid", reference2);
            return;
        }
        cleanAlert(reference2);
    }

    function validate (e) {
        const check = e.target;
        if (e.target.value.trim() === "") {
            Alert(`The ${e.target.id} field is required`, e.target.parentElement); 
            email[e.target.name] = "";
            check.classList.remove("border-green-300");
            check.classList.add("border-red-300");
            checkEmail();
            return;
        } 

        if(e.target.id === "email" && !validateEmail(e.target.value)){
            Alert("The email is not valid", e.target.parentElement);
            email[e.target.name] = "";
            check.classList.remove("border-green-300");
            check.classList.add("border-red-300");
            checkEmail();
            return;
        }

        check.classList.add("border-green-300");
        cleanAlert(e.target.parentElement);

        //Add values to object
        email[e.target.name] = e.target.value.trim().toLowerCase();

        checkEmail();
    }

    function Alert (message, reference) {
        cleanAlert(reference)

        const error = document.createElement("p");
        error.textContent = message;
        error.classList.add("bg-red-600", "text-white", "p-2", "text-center");
        
        //Add error to HTML
        reference.appendChild(error);

    }

    function cleanAlert (reference) {
        //An alert is here?
        const alert = reference.querySelector(".bg-red-600");
        if(alert) { alert.remove();}
    }

    function validateEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const result = regex.test(email);
        return result;
    }

    function checkEmail () {
        if(Object.values(email).includes("")) {
            btnSubmit.classList.add("opacity-50");
            btnSubmit.disabled = true;
        }
        else {
            btnSubmit.classList.remove("opacity-50");
            btnSubmit.disabled = false;
        }
    }

    function sendMail (e) {
        e.preventDefault();
        spinner.classList.add("flex")
        spinner.classList.remove("hidden")

        setTimeout(() => {
            spinner.classList.add("hidden");

            const alertGood = document.createElement("p");
            alertGood.classList.add("bg-green-500", "text-white", "p-2", "text-center", "rounded", "mt-12", "font-bold");
            alertGood.textContent = "Message sent successfully";

            form.appendChild(alertGood);

            setTimeout(() => {
                alertGood.remove()
            }, 3000)
    
        }, 3000)

        setTimeout(() => {
            resetForm();
        }, 5000);

    }

    function resetForm () {
        email.email = "";
        email.subject = "";
        email.message = "";
        email.copy= "";

        inputEmail.value = "";
        inputMessage.value = "";
        inputSubject.value = "";
        inputCopy.value = "";

        checkEmail();
        location.reload();

    }

})