
main();

//fonction global
async function main(){
    const articles = await getArticles();
    
    for (let i = 0; i < articles.length; i++) {
        displayArticle(articles[i])
    }
   
}

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
}

//fonction pour afficher les articles
function displayArticle(article) {
    const items = document.createElement("section");
    items.classList.add("items");
    items.innerHTML += `<a id="carte" href="./product.html?id=42">
    <article>
      <img class="images" src="${article.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article>
  </a>` 

  const containerItems = document.querySelector(".content-items");

  containerItems.appendChild(items)
  

  console.log(items);
  console.log(containerItems);
}