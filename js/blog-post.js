const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const url = `https://willand.tech/blog/wp-json/wp/v2/posts/${id}`;
const commentsUrl = `https://willand.tech/blog/wp-json/wp/v2/comments?post=${id}`;

const postImage = document.querySelector(".carousel");
const postHeader = document.querySelector(".carousel-info");
const postContainer = document.querySelector(".post-container");
const overlay = document.querySelector("#overlay");
const largerImage = document.querySelector("#larger-image");

// meta content
const title = document.querySelector("title");
const metaContent = document.querySelector(".meta-content");

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
        <small>${results.formatted_date}</small>
    </div>`;

    const image = document.querySelector(".wp-block-image");

    const imageButton = image.firstChild;
    console.log(image);

    document.onclick = function (event) {
      if (event.target.id === "overlay" || "largerImage") {
        largerImage.style.display = "none";
        overlay.style.display = "none";
      }
      if (event.target === imageButton) {
        largerImage.style.display = "block";
        overlay.style.display = "flex";
      }
      console.log("click");
    };
    largerImage.innerHTML = `<div>${results.content.rendered}</div>`;

    title.innerHTML = `${results.title.rendered} | Locating Japan`;
    metaContent.innerHTML = `
    name="description"
    content="${results.excerpt.rendered}"`;
  } catch (error) {
    postContainer.innerHTML = `<div class="error-message"><p><i class="fa-solid fa-circle-exclamation"></i>I am sorry, an error has occured. Please try to refresh the page.</p>
    <p>${error}</p></div>`;
  }
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
    commentForm.innerHTML = `<div class="error-message"><p><i class="fa-solid fa-circle-exclamation"></i>I am sorry, an error has occured. Please try to refresh the page.</p>
    <p>${error}</p></div>`;
  } finally {
    commentForm.reset();
  }
}
