const apiKey = "a310b28ce33e429cb7a7ce23791395d2";
var defaultImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"

let countryCode = "us";
let category = "general"
async function getNews(countryCode, category) {
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&apiKey=${apiKey}`)
  const data = await response.json();
  console.log(countryCode, category);
  displayNews(data.articles)
}

function displayNews(newsArr) {
  let article = "";
  for (var i = 0; i < newsArr.length; i++) {
    article += `
   <div class="col-md-3">
    <div class="card">
      <img src="${newsArr[i].urlToImage || defaultImg}" class="card-img-top">
      <div class="card-body d-flex flex-column justify-content-between">
        <h5 class="card-title">${newsArr[i].title?.split(" ").slice(0, 10).join(" ")}</h5>
        <p class="card-text">${newsArr[i].description ? newsArr[i].description?.split(" ").slice(0, 10).join(" ") : ""}</p>
        <a href="${newsArr[i].url}" class="btn btn-primary">Read More...</a>
      </div>
    </div>
   </div>
  `
  }

  document.getElementById("newsContainer").innerHTML = article
}

// !======> Onload get usa sports news
getNews(countryCode, category);


const countriesLinks = document.querySelectorAll("nav ul li a")

for (let i = 0; i < countriesLinks.length; i++) {
  countriesLinks[i].addEventListener("click", function (event) {
    event.preventDefault();
    var activeCountry = document.querySelector("nav ul a.active");
    activeCountry.classList.remove("active");
    countriesLinks[i].classList.add("active")
    countryCode = countriesLinks[i].dataset.country
    getNews(countryCode, category)
  })
}

const categoriesLinks = document.querySelectorAll("aside ul li a")

for (let i = 0; i < categoriesLinks.length; i++) {
  categoriesLinks[i].addEventListener("click", function (event) {
    event.preventDefault();
    var activeCategory = document.querySelector("aside ul a.active");
    activeCategory.classList.remove("active");
    categoriesLinks[i].classList.add("active")
    category = categoriesLinks[i].dataset.category
    getNews(countryCode, category)
  })
}