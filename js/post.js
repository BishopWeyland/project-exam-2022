export { id };

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const url = `https://willand.tech/blog/wp-json/wp/v2/posts/${id}`;

const postImage = document.querySelector(".carousel");
const postHeader = document.querySelector(".carousel-info");
const postContainer = document.querySelector(".post-container");
const overlay = document.querySelector("#overlay");
const largerImage = document.querySelector("#larger-image");

// meta content.
const title = document.querySelector("title");
const metaContent = document.querySelector(".meta-content");

// get post.
async function getPost() {
  try {
    const response = await fetch(url);
    const results = await response.json();

    postImage.innerHTML = `
    <img src="${results.jetpack_featured_media_url}">`;

    postHeader.innerHTML = `
    <h1>${results.title.rendered}</h1>
        ${results.excerpt.rendered}`;

    postContainer.innerHTML = `
    ${results.content.rendered}
    <div class="date">
      <small>${results.formatted_date}</small>
    </div>`;

    //larger image

    const image = document.querySelector(".wp-block-image");
    const imageButton = image.firstChild;

    document.onclick = function (event) {
      if (event.target.id === "overlay" || "largerImage") {
        largerImage.style.display = "none";
        overlay.style.display = "none";
      }
      if (event.target === imageButton) {
        largerImage.style.display = "block";
        overlay.style.display = "flex";
      }
    };
    largerImage.innerHTML = `
    <div>${results.content.rendered}</div>`;

    //meta data

    title.innerHTML = `
    ${results.title.rendered} | Locating Japan`;

    metaContent.innerHTML = `
    name="description"
    content="${results.excerpt.rendered}"`;
  } catch (error) {
    postContainer.innerHTML = `
    <div class="error-message">
      <p><i class="fa-solid fa-circle-exclamation"></i>I am sorry, an error has occured. Please try to refresh the page.</p>
      <p>${error}</p>
    </div>`;
  }
}

getPost();
