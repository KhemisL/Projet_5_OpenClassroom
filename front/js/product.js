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
    const quantity = document.querySelector("#quantity").value
    
    
    
    

    const objectOptionQuantity = {
        option : choiceForm,
        quantity : quantity,
    }
    
     return objectOptionQuantity;
}

//verifier le formulaire
function verifFormOptionColors() {
    const verifColorForm = document.querySelector("#colors").value;
    const verifNumberForm = document.querySelector("#quantity").value;
    const parseNumberForm = parseInt(verifNumberForm)
    
    if ( parseNumberForm != 0 && verifColorForm != "") {

        return true
      }else{
          
        return false
      }
}

// regrouper les option et quantity dans l'objet product
function regroupOptionQuantityAndProduct(product) {
    const addCart = document.querySelector("#addToCart")
       addCart.addEventListener("click", ()=>{
        
        if (verifFormOptionColors()) {
            const productWithOptionAndQantity = Object.assign(product, getOptionAndQuantity() );
            
            addBasket(productWithOptionAndQantity) 
            window.location.href = "cart.html"; 
        }else{
             alert("veuillez choisir une couleur et une quantité")
           }
          
       })
       
}

//mettre l'objet dans le local storage et le transformer en json
function saveProduct(product) {
     localStorage.setItem("product", JSON.stringify(product));
};

// recuperer l'objet dans le local storage 
function cartProduct() {
    let basket =  localStorage.getItem("product");
    if (basket === null) {
        return [];
    }else{
        return JSON.parse(basket);
    }
};

// Ajouter un produit
function addBasket(product) {
    let basket = cartProduct();
   
    let foundProduct = basket.find(p => p._id == product._id && p.option == product.option);

    if (foundProduct != undefined) {
        
         foundProduct.quantity++;
    }else{
        
        basket.push(product);
    }
    
    saveProduct(basket)
}

