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

    function carouselFunctionality() {
      track.innerHTML = `<a class="slide" href="post.html?id=${results[a].id}"><img src="${results[a].jetpack_featured_media_url}">`;

      carouselInfo.innerHTML = `<h2>${results[a].title.rendered}</h2>
        ${results[a].excerpt.rendered}
        <a href="post.html?id=${results[a].id}" class="btn">Read more</a>`;
    }

    carouselFunctionality();

    nextButton.addEventListener("click", () => {
      a++;
      if (a > 5) {
        a = 0;
      }
      carouselFunctionality();
    });

    prevButton.addEventListener("click", () => {
      a--;
      if (a < 0) {
        a = 5;
      }
      carouselFunctionality();
    });
  } catch (error) {
    carouselInfo.innerHTML = `<div class="error-message"><p><i class="fa-solid fa-circle-exclamation"></i>I am sorry, an error has occured. Please try to refresh the page.</p>
    <p>${error}</p></div>`;
  }
}

getCarousel(url);
