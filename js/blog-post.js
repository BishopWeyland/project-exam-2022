const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const url = `https://willand.tech/blog/wp-json/wp/v2/posts/${id}`;
const commentsUrl = `https://willand.tech/blog/wp-json/wp/v2/comments?post=${id}`;

const postImage = document.querySelector(".carousel");
const postHeader = document.querySelector(".carousel-info");
const postContainer = document.querySelector(".post-container");

async function getPost() {
  try {
    const response = await fetch(url);
    const results = await response.json();

    postImage.innerHTML = ` <img src="${results.jetpack_featured_media_url}">`;

    postHeader.innerHTML = `
    <h1>${results.title.rendered}</h1>
        ${results.excerpt.rendered}`;

    postContainer.innerHTML = `${results.content.rendered}
    <div class="date">
        <small>${results.date}</small>
    </div>`;

    console.log("post", results);
  } catch (error) {}
}

getPost();

const commentSection = document.querySelector(".comment-section");

async function getComments() {
  try {
    const response = await fetch(commentsUrl);
    const results = await response.json();
    console.log("comments", results);
    for (let i = 0; i < results.length; i++) {
      commentSection.innerHTML += `
      <div class="comment-container">
        <div class="comment-info">
          <img src="${results[i].author_avatar_urls[24]}">
            <div class="comment-name">
              <h3>${results[i].author_name}</h3>
              <small>${results[i].date}</small>
            </div>
        </div>
          <p>${results[i].content.rendered}</p>
      </div>`;
    }
  } catch (error) {}
}

getComments();

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

  console.log(data);

  try {
    await fetch(commentsUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
  } catch (error) {
    console.log("error", error);
  } finally {
    commentForm.reset();
  }
}
