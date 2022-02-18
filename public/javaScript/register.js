/**
 * Input validation module.
 */
const validatorModule = (function () {
    const MSG_EMPTY_INPUT = 'Input is required here';
    const MSG_ONLY_LATTERS = 'Please enter only alphabetic letters';
    const MSG_EMAIL_FORMAT = 'Please enter the correct Email format';
    const MSG_SHORT_PASS = "Please enter at least 8 characters";
    const MSG_CONFIRM_PASS = "The password confirmation does not match";
    const MSG_EMAIL_EXIST = "a user with this email adress already exists";

    const isNotEmpty = function (str) {
        return {
            isValid: (str.length !== 0),
            message: MSG_EMPTY_INPUT
        };
    }

    const hasLetter = function (str) {
        return {
            isValid: (/^[a-zA-Z]+$/.test(str)),
            message: MSG_ONLY_LATTERS
        }
    }
    const isEmail = function (str) {
        return {
            isValid: (/\S+@\S+\.\S+/.test(str)),
            message: MSG_EMAIL_FORMAT
        }
    }
    const isBiggerThan = function (str) {
        return {
            isValid: (str.length > 7),
            message: MSG_SHORT_PASS
        }
    }
    const isEqual = function (strA, strB) {
        return {
            isValid: (strA === strB),
            message: MSG_CONFIRM_PASS
        }
    }
    const isExist = function (email) {
        return {
            isValid: false,
            message: MSG_EMAIL_EXIST
        }
    }
    return {
        isNotEmpty: isNotEmpty,
        hasLetter: hasLetter,
        isEmail: isEmail,
        isBiggerThan: isBiggerThan,
        isEqual: isEqual,
        isExist: isExist
    }
})();

(function () {

    let emailInputElem = null;
    let firstNameInputElem = null;
    let lastNameInputElem = null;
    let passwordInputElem = null;
    let confirmPasswordInputElem = null;
    let loadingBufferingElem = null;

    /**
     * The function sets cookies for the user
     * @param {the name of the cookie} cname 
     * @param {the value of cookie header} cvalue 
     */
    function setCookie(cname, cvalue) {
        const d = new Date();
        d.setTime(d.getTime() + (60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    /**
     * Check if there is a cookie with that name and if so, return it
     * @param {cookie name}} cname 
     * @returns the cookie
     */
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    /**
     * delete cookie
     * @param {cookie name} name 
     */
    function delete_cookie(name) {
        if (getCookie(name)) {
            document.cookie = name + "=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
        }
    }

    /**
     * The function can have one or two input elements list,
     * the function validates with a function it has received as a parameter, 
     * and if there is a validation problem it puts an error message in DIV below the input element.
     * @param {input elemnt to valid} inputElement 
     * @param {function to validate with her} validateFunc 
     * @returns if the validation is ok or not
     */
    const validateInput = (inputElement, validateFunc) => {
        let v;
        let errorElement;

        if (inputElement.length === 1) {
            v = validateFunc(inputElement[0].value); // call the validation function
            errorElement = inputElement[0].parentElement.nextElementSibling; // the error message div
        } else {
            v = validateFunc(inputElement[0].value, inputElement[1].value); // call the validation function
            errorElement = inputElement[0].parentElement.nextElementSibling; // the error message div
        }

        errorElement.innerHTML = v.isValid ? '' : v.message; // display the error message
        v.isValid ? inputElement[0].classList.remove("is-invalid") : inputElement[0].classList.add("is-invalid");
        return v.isValid;
    }

    /**
     * The function receives the elements of the input in the form,
     *  and checks if they are validated with a function that is suitable for each type of input.
     * @param {the first name input element} firstNameInputElem 
     * @param {the last name input element} lastNameInputElem 
     * @param {the email input element} emailInputElem 
     * @param {The extent to which we received back the api asks
     *  to check if the email is in the database already or not} data 
     * @returns if the validation ok or not
     */
    const validateFirstRegisterInput = (firstNameInputElem, lastNameInputElem, emailInputElem, data) => {
        firstNameInputElem.value = firstNameInputElem.value.trim().toLowerCase();
        lastNameInputElem.value = lastNameInputElem.value.trim().toLowerCase();
        emailInputElem.value = emailInputElem.value.trim().toLowerCase();

        let v1 = validateInput([firstNameInputElem], validatorModule.isNotEmpty);
        v1 = v1 ? validateInput([firstNameInputElem], validatorModule.hasLetter) : false;


        let v2 = validateInput([lastNameInputElem], validatorModule.isNotEmpty);
        v2 = v2 ? validateInput([lastNameInputElem], validatorModule.hasLetter) : false;

        let v3 = validateInput([emailInputElem], validatorModule.isNotEmpty);
        v3 = v3 ? validateInput([emailInputElem], validatorModule.isEmail) : false;

        if (data)
            validateInput([emailInputElem], validatorModule.isExist);

        //if all validate - return true, else - return false
        return v1 && v2 && v3 && (!data);

    }

    /**
     * The function receives the elements of the input in the form,
     *  and checks if they are validated with a function that is suitable for each type of input.
     * @param {the password element} passwordInputElem 
     * @param {the confirm password element} confirmPasswordInputElem 
     * @returns if the validation ok or not
     */
    const validationPasswordsInput = (passwordInputElem, confirmPasswordInputElem) => {
        passwordInputElem.value = passwordInputElem.value.trim();
        confirmPasswordInputElem.value = confirmPasswordInputElem.value.trim();

        let v1 = validateInput([passwordInputElem], validatorModule.isNotEmpty);
        v1 = v1 ? validateInput([passwordInputElem], validatorModule.isBiggerThan) : false;

        let v2 = validateInput([confirmPasswordInputElem], validatorModule.isNotEmpty);
        v2 = v1 && v2 ? validateInput([confirmPasswordInputElem, passwordInputElem], validatorModule.isEqual) : false;

        return v1 && v2;
    }

    /**
     * Set a timer on the registration page
     * @param {how much time the timer set} duration 
     * @param {what time to show} display 
     */
    function startTimer(duration, display) {
        var timer = duration,
            minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }
    /**
     * The first part of the listing, check the inputs of first name, last name, email.
     *  Send an API request to the server to check if such an email exists or not.
     * If all goes well, set a one-minute clock to complete the registration and proceed to the next step of the registration
     */
    let registerFirstPart = () => {

        loadingBufferingElem.classList.remove('d-none');




        fetch("/api/is-valid-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "email": emailInputElem.value.trim() })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {

            if (validateFirstRegisterInput(firstNameInputElem, lastNameInputElem, emailInputElem, data.email_exist)) {
                var oneMinutes = 60 * 1,
                    display = document.querySelector('#time');
                startTimer(oneMinutes, display);

                setCookie("registerTimer", "");
                //change to password part register
                document.getElementById("registerForm").classList.add('d-none');
                document.getElementById("passwordDiv").classList.remove('d-none');

                setTimeout((() => { document.getElementById("timeOutForm").submit(); }), (60 + 1) * 1000);
            }
            loadingBufferingElem.classList.add('d-none');

        }).catch(function () {
            //if somthing wrong with the server ask, we erload again the register page
            loadingBufferingElem.classList.add('d-none');
            window.location.href = "/register";
        });
    }


    /**
     * Grab the SUBMIT button of the form, perform validation,
     *  if everything worked validation, activate the SUBMIT of the form and it will register the user.
     *  If the server failed to register the user, we will get a suitable error window.
     * @param {the click event of register form} event 
     */
    let registerSecondPart = (event) => {
        event.preventDefault();

        
        if (validationPasswordsInput(passwordInputElem, confirmPasswordInputElem)) {
            delete_cookie("registerTimer");

            document.getElementById("passwordForm").submit();
        }
    }

    document.addEventListener('DOMContentLoaded', function () {

        emailInputElem = document.getElementById("emailInput");
        firstNameInputElem = document.getElementById("firstNameInput");
        lastNameInputElem = document.getElementById("lastNameInput");
        passwordInputElem = document.getElementById("passwordInput");
        confirmPasswordInputElem = document.getElementById("confirmPasswordInput");
        loadingBufferingElem = document.querySelector("#loadingBuffering");

       //if the client try back to password page, after he finished the register, the page will refresh
        window.addEventListener("pageshow", () => {
            if(emailInputElem.value.trim() != "")
                window.location.href = "/register";
          });


        document.getElementById("registerFirstPart").addEventListener("click", registerFirstPart);
        document.getElementById("passwordForm").addEventListener("submit", registerSecondPart);

    });
})();

