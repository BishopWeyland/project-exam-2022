const scrollContainer = document.querySelector(".scroll-container");
const scrollButton = document.querySelector(".scroll-btn");

scrollButton.addEventListener("click", () => {
  scrollContainer.scroll({
    top: 0,
    behavior: "smooth",
  });
});
