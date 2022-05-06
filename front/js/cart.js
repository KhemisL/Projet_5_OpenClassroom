

mainCart();

//fonction global panier
async function mainCart(){
    const productInCart = await basketProduct();
    console.log(productInCart);
    
    for (let i = 0; i < productInCart.length; i++) {
        displayProductBasket(productInCart[i]);
    }
    
    removeItem(productInCart);
    displayTotalPriceProduct(productInCart);
    btnOrder(productInCart);
}

//recuperer les éléments du localStorage
function basketProduct() {
    let basket =  localStorage.getItem("product");
    if (basket === null) {
        return [];
    }else{
        return JSON.parse(basket);
    }
};
//sauvegarder le localstorage
function saveProductCart(productForCart) {
    localStorage.setItem("product", JSON.stringify(productForCart));
};
//afficher les élément du panier depuis le localStorage

function displayProductBasket(productBasket) {
    const sectionItems = document.querySelector("#cart__items");
    console.log(sectionItems);

    sectionItems.innerHTML += `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src="${productBasket.imageUrl}" alt="${productBasket.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${productBasket.name}</h2>
        <p>${productBasket.option}</p>
        <p>${productBasket.price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté :</p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productBasket.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="productInCart">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`
};

//supprimer un produit
function removeItem(productCart) {
        const deleteBtn = document.querySelectorAll(".productInCart")

        for (let j = 0; j < deleteBtn.length; j++) {
            deleteBtn[j].addEventListener("click", ()=>{
                
                let idSelectDelete = productCart[j]._id;
                let colorSelectDelete = productCart[j].option;
                

                productCart = productCart.filter(function(el){
                  if (el._id !== idSelectDelete || el.option !== colorSelectDelete) {
                    return true
                  }
                })
                 
                 saveProductCart(productCart)
                 
                 window.location.href = "cart.html"
            })
            
        }  
 }

 //avoir le prix total dans le panier
 function totalPriceBasket(priceProduct) {
     let productBasket = priceProduct;
     let price = 0;
     for (let product of productBasket) {
         price += product.quantity * product.price
         saveProductCart(priceProduct)
     }
     
     return price
 }

//avoir le nombres total d'articles dans le panier
 function totalItems(numberProduct) {
    let productBasket = numberProduct;
    let number = 0;
    for (let items of productBasket) {
        number += parseInt(items.quantity ) 
        saveProductCart(numberProduct)
    }
    
   return number
}

//afficher le prix et nombre d'articles dans le panier au changement de quantité
function displayTotalPriceProduct(totalPriceProduct) {
    const totalProduct = document.querySelector("#totalQuantity");
    const totalPrice = document.querySelector("#totalPrice");

    const btnQuantity = document.querySelectorAll(".itemQuantity")
    
    btnQuantity.forEach(element => {
      element.addEventListener("change", ()=>{
        console.log(element);
        
        for (let i = 0; i < totalPriceProduct.length; i++) {
           

           
          console.log(parseInt(totalPriceProduct[i].quantity) );
          
         
          // console.log(totalPriceProduct[i]);
          totalPriceProduct[i].quantity = element.value ;
           totalPrice.innerHTML = totalPriceBasket(totalPriceProduct);
           totalProduct.innerHTML = totalItems(totalPriceProduct);
           
        }
        
      })
       totalPrice.innerHTML = totalPriceBasket(totalPriceProduct);
       totalProduct.innerHTML = totalItems(totalPriceProduct);
    });

    
}


//recuperer les données du formulaire
function getFormordered() {
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const address = document.querySelector("#address").value;
  const city = document.querySelector("#city").value;
  const email = document.querySelector("#email").value;
  
  const firstNameError = document.querySelector("#firstNameErrorMsg");
  const lastNameError = document.querySelector("#lastNameErrorMsg");
  const addressError = document.querySelector("#addressErrorMsg");
  const cityError = document.querySelector("#cityErrorMsg");
  const emailError = document.querySelector("#emailErrorMsg");

  if (!/^[A-Za-z]{3,20}$/.test(firstName)) {
    firstNameError.textContent = "Les chiffre et les caractères ne sont pas autorisé, il doit y avoir entre 3 et 20 caractères"
    return false
  }else if (!/^[A-Za-z]{3,20}$/.test(lastName)) {
    lastNameError.textContent = "Les chiffre et les caractères ne sont pas autorisé, il doit y avoir entre 3 et 20 caractères"
    return false
  }else if (/^[a-zA-Z0-9\s,'-]*$/.test(address)) {
    addressError.textContent = "Veuillez remplir ce champ"
    return false
  }else if (!/^[A-Za-z]{3,20}$/.test(city)) {
    cityError.textContent = "Les chiffre et les caractères ne sont pas autorisé, il doit y avoir entre 3 et 20 caractères"
    return false
  }else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    emailError.textContent = `L'email doit contenir au moins un "@" aisin q'un "."`
    return false
  }else{
    return true
  }
}

//création obj données formulaire
function objectFormAndProduct() {
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const address = document.querySelector("#address").value;
  const city = document.querySelector("#city").value;
  const email = document.querySelector("#email").value;
  const valueFormObject = {
    firstName : firstName,
    lastName : lastName,
    address : address,
    city : city,
    email : email
}

return valueFormObject
}

//recuperer uniquement id des produits
function getIdProductPost(prod) {
let arr =[];
  for (let i = 0; i < prod.length; i++) {
    let id = prod[i]._id
    arr.push(id)
    
  }
  return arr
}

//événement sur le btn commander
 function btnOrder(productOrder) {
  const order = document.querySelector("#order");
  order.addEventListener("click",(e)=>{
      
    e.preventDefault()

     if (getFormordered()) {
      const contact = {
        contact: objectFormAndProduct(),
        products: getIdProductPost(productOrder),
          
        }

          const sendForm = fetch("http://localhost:3000/api/products/order"  , {    
          method: "POST",
          body: JSON.stringify(contact),        
          headers: {            
              "content-type" : "application/json",        
          }        
      })      

          .then(res => {
            window.location.href ="confirmation.html"
              return res.json();
            
          }).then((data) => {
              console.log(data);
              localStorage.setItem("orderId", data.orderId);
          }).catch((error) =>{
              console.log(error);
          })
        saveOrder(contact);
        return sendForm
     }
  });
}

function saveOrder(order) {
  localStorage.setItem("order", JSON.stringify(order))
}

function cartorder() {
  return JSON.parse(localStorage.getItem("order"));
  
};