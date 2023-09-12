let curentCountry="us";
let curentCategoury="general";


const defaultImg="https://media.istockphoto.com/id/1177794485/vector/person-gray-photo-placeholder-woman.jpg?s=612x612&w=0&k=20&c=B41l9xgyu4bR63vPqt49mKZIRGh8ewpewN7zXnYPOsI=";
async function getNews(countryCode, category) {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&apiKey=e0871005b3684aaf9a9d809e0bf2008b`)
    const data = await response.json();
    console.log(data.articles);
    displayNews(data.articles)
  }
  
  

  getNews(curentCountry , curentCategoury);


  function displayNews(newsArry) {
    let articlesHtml="";
    for (let i = 0; i < newsArry.length; i++) {
        articlesHtml +=`
        <div class="col-md-3">
  <img src="${newsArry[i].urlToImage || defaultImg}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${newsArry[i].title}</h5>
    <p class="card-text">${newsArry[i].description?.split(" ").slice(0, 10).join(" ")||""}</p>
    <a href="${newsArry[i].url}" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
    `
    }
   
    document.getElementById("newsContainer").innerHTML=articlesHtml;
    
  }

const countriesLinks = document.querySelectorAll("nav ul a");
for (let i = 0; i < countriesLinks.length; i++) {
    countriesLinks[i].addEventListener("click",function () {
        let activeCountry=document.querySelector("nav ul a.active");
        activeCountry.classList.remove("active");
        countriesLinks[i].classList.add("active");
        curentCountry=countriesLinks[i].dataset.country;
        getNews(curentCountry,curentCategoury)
    })
  
    
}

const categoriesLinks = document.querySelectorAll("aside ul a");

for (let i = 0; i < categoriesLinks.length; i++) {
    categoriesLinks[i].addEventListener("click",function () {
        let activeCategory=document.querySelector("aside ul a.active");
        activeCategory.classList.remove("active");
        categoriesLinks[i].classList.add("active");
        curentCategoury=categoriesLinks[i].dataset.category
        getNews(curentCountry,curentCategoury)
    })
  
    
}