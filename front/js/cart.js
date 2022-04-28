

mainCart();

//fonction global panier
async function mainCart(){
    const productInCart = await basketProduct();
    console.log(productInCart);
    for (let i = 0; i < productInCart.length; i++) {
        displayProductBasket(productInCart[i]);
       
    }
    
    removeItem(productInCart)
}

//recuperer les éléments du localStorage
function basketProduct() {
    let basket =  localStorage.getItem("product");
    if (basket == null) {
        return [];
    }else{
        return JSON.parse(basket);
    }
};
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

function removeItem(productCart) {
        const deleteBtn = document.querySelectorAll(".productInCart")
        console.log(deleteBtn);
        console.log(productCart);

        for (let j = 0; j < deleteBtn.length; j++) {
            deleteBtn[j].addEventListener("click", ()=>{
                
                let idSelectDelete = productCart[j]._id;
                console.log(idSelectDelete);

                 productCart = productCart.filter(el => el._id !== idSelectDelete)
                 console.log(productCart);
                 saveProductCart(productCart)
                 
                 window.location.href = "cart.html"
            })
            
        }

           
        
        
 }

