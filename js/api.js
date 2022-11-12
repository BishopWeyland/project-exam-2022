const url =
  "https://willand.tech/blog/wp-json/wp/v2/posts?consumer_key=ck_d3b6f472d19e7c6bd1a1fc3044c8d9681a2cd8e1?consumer_secret=cs_27e6a8da637b31c79a1092c7a6949163c02acbad";
const blogList = document.querySelector(".blog-list");
const contentContainer = document.querySelector(".content-container");
async function getBlogs() {
  try {
    const response = await fetch(url);
    const results = await response.json();
    console.log(results);

    for (let i = 0; i < results.length; i++) {
      if (i === 10) {
        break;
      }
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

//   for (let i = 0; i < blogList.length; i++) {
//     results.forEach(function (results) {
//       blogList[
//         i
//       ].innerHTML += `<div class="blog-card"><h2>${results.id}</h2><img src"${results.jetpack_featured_media_url[0]}"></div>`;
//     });
//   }
