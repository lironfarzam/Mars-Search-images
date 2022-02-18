"use strict";

(function () {

    //the global input element of the form
    let emailInputElement = null;
    let passwordInputElement = null;
    let loadingBufferElement = null;


    //check if the api connection is ok or failed
    function status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    }

    /**
     * Set an error message in a particular 
     * element in the Bahamas for the message that the function received.
     * If the message is empty ("") it removes an error message (if there was one before)
     * @param {the input element} inputElement 
     * @param {Error message display} msg 
     */
    const setErrorMsg = (inputElement, msg) => {
        let errorElement = inputElement.parentElement.nextElementSibling;
        errorElement.innerHTML = msg; // display the error message
        msg === "" ? inputElement.classList.remove("is-invalid") : inputElement.classList.add("is-invalid");
    }

    /**
     * Check if the input is empty or not
     * @param {input element} elemntsList 
     * @returns if the input empty or not
     */
    const isNotEmpty = (elemntsList) => {

        let valid = true;

        for (let e of elemntsList)
            if (e.value === "") {
                setErrorMsg(e, "Please fill out this field");
                valid = false;
            } else
                setErrorMsg(e, "");

        return valid;
    }


    /**
     * Captures the SUBMIT of the LOGIN form.
     * Checking that the input is not empty -
     *      If empty: Error message name.
     *      If not empty: Sends Fetch API to server and 
     * checks if the user is registered and exists -
     *      If not: Error message.
     *      If present: Moves to the Home Page.
     * @param {SUBMIT form} e 
     */
    let checkLogin = (e) => {
        e.preventDefault();

        emailInputElement.value =  emailInputElement.value.trim().toLowerCase();
        passwordInputElement.value =   passwordInputElement.value.trim();

        if (isNotEmpty([emailInputElement, passwordInputElement])) {
            loadingBufferElement.classList.remove("d-none");
            fetch("/api/verify-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "email": emailInputElement.value,
                    "password": passwordInputElement.value
                })
            }).then(status)
                .then(function (response) {
                    return response.json();
                }).then((data) => {

                    loadingBufferElement.classList.add("d-none");

                    if (data.verify) {
                        localStorage.setItem("auth-token", data.token);
                        document.getElementById("loginForm").submit();

                    } else {

                        !data.verifyEmail ? setErrorMsg(emailInputElement, "") :
                            setErrorMsg(emailInputElement, data.verifyEmail);

                        !data.verifyPassword ? setErrorMsg(passwordInputElement, "") :
                            (setErrorMsg(passwordInputElement, data.verifyPassword),
                                setErrorMsg(emailInputElement, data.verifyPassword));
                    }

                }).catch(function (error) {
                    loadingBufferElement.classList.add("d-none");
                    window.location.href = "/login";
                });
        }
    }

    document.addEventListener('DOMContentLoaded', function () {

        emailInputElement = document.getElementById("emailInput");
        passwordInputElement = document.getElementById("passwordInput");
        loadingBufferElement = document.querySelector("#loadingBuffering");

        document.getElementById("loginForm").addEventListener("submit", checkLogin);
    });
})();
