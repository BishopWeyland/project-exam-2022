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

async function getComments() {
  try {
    const response = await fetch(commentsUrl);
    const results = await response.json();

    console.log("comments", results);
  } catch (error) {}
}

getComments();
