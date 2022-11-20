const url = `https://willand.tech/blog/wp-json/wp/v2/posts`;
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");
const track = document.querySelector(".track");
const carouselInfo = document.querySelector(".carousel-info");

async function getCarousel(url) {
  try {
    const response = await fetch(url);
    const results = await response.json();
    console.log(results);
    let a = 0;

    track.innerHTML = `<a class="slide" href="post.html?id=${results[a].id}"><img src="${results[a].jetpack_featured_media_url}">`;
    carouselInfo.innerHTML = `<h2>${results[a].title.rendered}</h2>
    ${results[a].excerpt.rendered}
    <a href="post.html?id=${results[a].id}" class="btn">Read more</a>`;

    nextButton.addEventListener("click", () => {
      a++;
      if (a > 5) {
        a = 0;
      }
      track.innerHTML = `<a class="slide" href="post.html?id=${results[a].id}"><img src="${results[a].jetpack_featured_media_url}">`;
      carouselInfo.innerHTML = `<h2>${results[a].title.rendered}</h2>
    ${results[a].excerpt.rendered}
    <a href="post.html?id=${results[a].id}" class="btn">Read more</a>`;
    });

    prevButton.addEventListener("click", () => {
      a--;
      if (a < 0) {
        a = 5;
      }
      track.innerHTML = `<a class="slide" href="post.html?id=${results[a].id}"><img src="${results[a].jetpack_featured_media_url}">`;
      carouselInfo.innerHTML = `<h2>${results[a].title.rendered}</h2>
    ${results[a].excerpt.rendered}
    <a href="post.html?id=${results[a].id}" class="btn">Read more</a>`;
    });
  } catch (error) {
    console.log(Error);
  }
}

getCarousel(url);
