
main();

//fonction global
async function main(){
    const articles = await getArticles();
    
    for (let i = 0; i < articles.length; i++) {
        displayArticle(articles[i])
        
    }

    getId();
};

//fonction pour récupérer les articles
function getArticles() {
    return fetch("http://localhost:3000/api/products")
        .then(function (httpBody){
            return httpBody.json()
        }) 
        .then(function (articles) {
            return articles;
        })
        .catch(function(err) {
            alert(err)
        })
};

//fonction pour afficher les articles
 function displayArticle(article) {
    const items = document.createElement("section");
    items.classList.add("items");
    items.innerHTML += `<a href="./product.html?id=${article._id}">
    <article>
        <input type="hidden" value="${article._id}" id="id">
      <img class="images" src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article>
  </a>` 

  const containerItems = document.querySelector(".content-items");

  containerItems.appendChild(items)

};


  function getId() {

    const a = document.querySelectorAll("#card")
    const id = document.querySelectorAll("#id");
};
    

