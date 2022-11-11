const url =
  "https://willand.tech/blog/wp-json/wp/v2/posts?consumer_key=ck_d3b6f472d19e7c6bd1a1fc3044c8d9681a2cd8e1?consumer_secret=cs_27e6a8da637b31c79a1092c7a6949163c02acbad";

async function getBlogs() {
  try {
    const response = await fetch(url);
    const results = await response.json();
    console.log(results);
  } catch {
    error;
  }
}

getBlogs();
