export {
  form,
  name,
  email,
  subject,
  message,
  submitMessage,
  comment,
  nameError,
  emailError,
  subjectError,
  messageError,
  commentError,
};

const form = document.querySelector("#form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");
const submitMessage = document.querySelector("#submit-message");
const comment = document.querySelector("#comment");

//Error containers

const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const subjectError = document.querySelector("#subject-error");
const messageError = document.querySelector("#message-error");
const commentError = document.querySelector("#comment-error");
