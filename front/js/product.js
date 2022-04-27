pageProduct();
//fonction principale
async function pageProduct(){
    const productId = getIdProduct();
    console.log(productId);
    const product = await getProduct(productId);
    console.log(product);

    changeProduct(product);
    getOption();
};

//récupérer l'id depuis URL
function getIdProduct() {
    const recoveryId = window.location.search;
    return recoveryId.slice(4);
};

//rcuperer les produit depuis API
function getProduct(id) {
    return  fetch(`http://localhost:3000/api/products/${id}`)
     
        .then(function (res){
            return res.json()
        }) 
        .then(function (product) {
            return product;
        })
        .catch(function(err) {
            alert(err)
        })
         
};




// aficher le donner du produit
   function changeProduct(product) {
       const title = document.querySelector("#title").innerHTML = product.name;
       const price = document.querySelector("#price").innerHTML = product.price;
       const description = document.querySelector("#description").innerHTML = product.description;
       const divImg = document.querySelector(".item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

       let color =  product.colors
       for (let i = 0; i < color.length; i++) {
        const colorOption = document.querySelector("#colors").innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
        
       };

       const addCart = document.querySelector("#addToCart")
       addCart.addEventListener("click", getOption)
   };


//récuperer les donnée du formulaire option

function getOption() {
    const idForm = document.querySelector("#colors");
    const choiceForm = idForm.value

    console.log(choiceForm);

    
}

   

    


