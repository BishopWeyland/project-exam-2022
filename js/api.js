const url = `https://willand.tech/blog/wp-json/wp/v2/posts?per_page=10`;
const showAllUrl = `https://willand.tech/blog/wp-json/wp/v2/posts?per_page=100`;
const blogList = document.querySelector(".blog-list");
const contentContainer = document.querySelector(".content-container");
const showAll = document.querySelector(".show-all");

async function getBlogs() {
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
            <h3>${results[i].excerpt.rendered}</h3>
        </a>
    </div>`;
    }
  } catch (error) {
    contentContainer.innerHTML = "<p>An error has occured</p>";
    console.log(error);
  }
}

getBlogs(url);

showAll.addEventListener("click", () => {
  blogList.innerHTML = "";
  getAllBlogs(showAllUrl);
});

async function getAllBlogs() {
  try {
    const response = await fetch(showAllUrl);
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
    contentContainer.innerHTML = "<p>An error has occured</p>";
    console.log(error);
  }
}
