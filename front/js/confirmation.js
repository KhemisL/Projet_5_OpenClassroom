

//récupération et affichage orderId
function getOrderIdConfirm() {
    const orderId = document.querySelector("#orderId")
    orderId.innerHTML =  localStorage.getItem("orderId")
    
    localStorage.clear()
}
getOrderIdConfirm()


 



