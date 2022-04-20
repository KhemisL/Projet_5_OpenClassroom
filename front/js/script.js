

main();

//fonction global
async function main(){
    const articles = await getArticles();
    console.log(articles);
    for (let i = 0; i < articles.length; i++) {
        displayArticle(articles)
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
    document.getElementById("carte").innerHTML += `<a id="carte" href="./product.html?id=42">
    <article>
      <img class="images" src="" alt="Lorem ipsum dolor sit amet, Kanap name1">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
    </article>
  </a>`
}