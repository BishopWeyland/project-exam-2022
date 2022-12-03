import { checkLength, validateEmail } from "./form-validation.js";
import {
  form,
  name,
  email,
  subject,
  message,
  submitMessage,
  nameError,
  emailError,
  subjectError,
  messageError,
} from "./form-variables.js";

// contact form validation

async function validateForm(event) {
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
    try {
      const formElement = event.target,
        { action, method } = formElement,
        body = new FormData(formElement);
      console.log(formElement);
      fetch(action, {
        method,
        body,
      });
    } catch (error) {
      form.innerHTML = `
      <div class="error-message">
        <p><i class="fa-solid fa-circle-exclamation"></i>I am sorry, an error has occured. Please try to refresh the page.</p>
        <p>${error}</p>
      </div>`;
    } finally {
      submitMessage.innerHTML = `
    <div class="form-message">
      <p>Your message has been sent. You will receive a response on your e-mail.</p>
    </div>`;
      form.reset();
    }
  }
}

form.addEventListener("submit", validateForm);
