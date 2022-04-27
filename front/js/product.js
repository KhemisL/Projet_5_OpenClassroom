pageProduct();
//fonction principale
async function pageProduct(){
    const productId = getIdProduct();
    
    const product = await getProduct(productId);
    

    changeProduct(product);
    
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

        regroupOptionQuantityAndProduct(product);
   };


//récuperer les donnée du formulaire option

function getOptionAndQuantity() {
    const idForm = document.querySelector("#colors");
    const choiceForm = idForm.value;
    const numberForm = document.querySelector("#quantity");
    const quantity= parseInt(numberForm.value);
    
    
    

    const objectOptionQuantity = {
        option : choiceForm,
        quantity : quantity
    }
    
     return objectOptionQuantity;
}

// regrouper les option et quantity dans l'objet product

function regroupOptionQuantityAndProduct(product) {
    const addCart = document.querySelector("#addToCart")
       addCart.addEventListener("click", ()=>{
        
        
            const productWithOptionAndQantity = Object.assign(product, getOptionAndQuantity() );
            addBasket(productWithOptionAndQantity);
           
       })
}

//mettre l'objet dans le local storage et le transformer en json

function saveProduct(product) {
     localStorage.setItem("product", JSON.stringify(product));
};

// recuperer l'objet dans le local storage 
function cartProduct() {
    let basket =  localStorage.getItem("product");
    if (basket == null) {
        return [];
    }else{
        return JSON.parse(basket);
    }
};

function addBasket(product) {
    let basket = cartProduct();
    basket.push(product);
    saveProduct(basket)
}

