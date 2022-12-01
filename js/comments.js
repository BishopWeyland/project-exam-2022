import { id } from "./post.js";

const commentsUrl = `https://willand.tech/blog/wp-json/wp/v2/comments?post=${id}`;

//Comment section from API

const commentSection = document.querySelector(".comment-section");

async function getComments() {
  try {
    const response = await fetch(commentsUrl);
    const results = await response.json();
    for (let i = 0; i < results.length; i++) {
      commentSection.innerHTML += `
      <div class="comment-container">
        <div class="comment-info">
          <img src="${results[i].author_avatar_urls[24]}">
            <div class="comment-name">
              <h3>${results[i].author_name}:</h3>
            </div>
        </div>
          <p>${results[i].content.rendered}</p>
      </div>`;
    }
  } catch (error) {
    commentSection.innerHTML = `<div class="error-message"><p><i class="fa-solid fa-circle-exclamation"></i>I am sorry, an error has occured. Please try to refresh the page.</p>
    <p>${error}</p></div>`;
  }
}

getComments();

//Post comments on wordpress.

const commentForm = document.querySelector("#comment-form");
const postId = document.querySelector("#postId");
const name = document.querySelector("#name");
const comment = document.querySelector("#comment");

//comments cant be longer than 120 char!

postId.value = id;

commentForm.addEventListener("submit", submitComment);

async function submitComment(e) {
  e.preventDefault();

  const [postId, name, comment] = e.target.elements;

  const data = JSON.stringify({
    post: postId.value,
    author_name: name.value,
    content: comment.value,
  });

  try {
    await fetch(commentsUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
  } catch (error) {
    commentForm.innerHTML = `<div class="error-message"><p><i class="fa-solid fa-circle-exclamation"></i>I am sorry, an error has occured. Please try to refresh the page.</p>
    <p>${error}</p></div>`;
  } finally {
    commentForm.reset();
  }
}
