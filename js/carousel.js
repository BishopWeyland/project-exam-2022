const url = `https://willand.tech/blog/wp-json/wp/v2/posts`;
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");
const track = document.querySelector(".track");

async function getCarousel(url) {
  try {
    const response = await fetch(url);
    const results = await response.json();

    let a = 0;

    track.innerHTML += `<li class="slide"><img src="${results[a].jetpack_featured_media_url}"></li>`;

    nextButton.addEventListener("click", () => {
      a++;
      if (a > 5) {
        a = 0;
      }
      track.innerHTML += `<li class="slide"><img src="${results[a].jetpack_featured_media_url}"></li>`;
      console.log(a);
    });

    prevButton.addEventListener("click", () => {
      a--;
      if (a < 0) {
        a = 5;
      }
      track.innerHTML += `<li class="slide"><img src="${results[a].jetpack_featured_media_url}"></li>`;
    });
  } catch (error) {
    console.log(Error);
  }
}

getCarousel(url);
