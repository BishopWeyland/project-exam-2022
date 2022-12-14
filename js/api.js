const url = `https://willand.tech/blog/wp-json/wp/v2/posts`;
const blogList = document.querySelector(".blog-list");
const contentContainer = document.querySelector(".content-container");

// Get array of blog-posts from API.

async function getBlogs(url) {
  try {
    const response = await fetch(url);
    const results = await response.json();
    blogList.innerHTML = "";

    for (let i = 0; i < results.length; i++) {
      blogList.innerHTML += `
      <div class="blog-card">
        <a href="post.html?id=${results[i].id}">
        <img src="${results[i].jetpack_featured_media_url}">
        <h2>${results[i].title.rendered}</h2>
        ${results[i].excerpt.rendered}
        </a>
    </div>`;
    }
  } catch (error) {
    contentContainer.innerHTML = `
      <div class="error-message">
        <p><i class="fa-solid fa-circle-exclamation"></i>I am sorry, an error has occured. Please try to refresh the page.</p>
        <p>${error}</p>
      </div>`;
  }
}
getBlogs(url);

// Show 10 more results each time the "show-more" button is pressed.
const showMore = document.querySelector(".show-more");

let morePages = 20;
let moreUrl = `${url}?per_page=${morePages}`;

showMore.addEventListener("click", () => {
  morePages += 10;
  moreUrl = `${url}?per_page=${morePages}`;
  blogList.innerHTML = "";
  getMoreBlogs(moreUrl);
});

async function getMoreBlogs() {
  try {
    const response = await fetch(moreUrl);
    const results = await response.json();

    for (let i = 0; i < results.length; i++) {
      blogList.innerHTML += `
      <div class="blog-card">
        <a href="post.html?id=${results[i].id}">
          <img src="${results[i].jetpack_featured_media_url}">
          <h2>${results[i].title.rendered}</h2>
          <h3>${results[i].excerpt.rendered}</h3>
        </a>
      </div>`;
    }
  } catch (error) {
    contentContainer.innerHTML = `
    <div class="error-message">
      <p><i class="fa-solid fa-circle-exclamation"></i>I am sorry, an error has occured. Please try to refresh the page.</p>
      <p>${error}</p>
    </div>`;
  }
}

// Use radio buttons to show posts by category.

const categories = document.querySelectorAll(".category");

categories.forEach(function (category) {
  category.onclick = function (event) {
    let newUrl;
    if (event.target.id === "all") {
      newUrl = url;
    } else {
      const chosenCategory = event.target.value;
      newUrl = url + `?categories=${chosenCategory}`;
    }

    blogList.innerHTML = "";

    getBlogs(newUrl);
  };
});

// search for posts.

const searchButton = document.querySelector(".search-button");

searchButton.onclick = function () {
  searchInput = document.querySelector(".search-input").value;
  let newUrl = url + `?search=${searchInput}`;
  blogList.innerHTML = "";
  getBlogs(newUrl);
};
