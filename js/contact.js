const form = document.querySelector("#form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");
const submitMessage = document.querySelector("#submit-message");

//Error containers

const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const subjectError = document.querySelector("#subject-error");
const messageError = document.querySelector("#message-error");

// contact form validation

function validateForm(event) {
  event.preventDefault();

  if (!checkLength(name.value, 5)) {
    nameError.innerHTML = "Your name need to be atlest 5 characters.";
  }

  if (!validateEmail(email.value)) {
    emailError.innerHTML = "You need to input a valid e-mail.";
  }

  if (!checkLength(message.value, 15)) {
    subjectError.innerHTML = "Your subject needs to be atleast 15 characters.";
  }

  if (!checkLength(message.value, 25)) {
    messageError.innerHTML = "Your message needs to be atleast 25 characters.";
  }

  if (
    checkLength(name.value, 5) &&
    validateEmail(email.value) &&
    checkLength(subject.value, 15) &&
    checkLength(message.value, 25)
  ) {
    submitMessage.innerHTML = `
    <div class="form-message">
      <p>Your message has been sent. You will receive a response on your e-mail.</p>
    </div>`;
    form.reset();
  }
}

form.addEventListener("submit", validateForm);

//check length of inputs

function checkLength(value, length) {
  if (value.trim().length >= length) {
    return true;
  }
  return false;
}

// validate e-mail

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatch = regEx.test(email);
  return patternMatch;
}
