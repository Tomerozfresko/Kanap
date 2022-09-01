import {orderUrl,sendCartToLocalStorage,getCart,fetchData,apiURL, updateQuantity} from './utils.js';


/******************************
*---------Refrences ---------**
*******************************/



//DOM elements
const  cartItems = document.getElementById('cart__items');
const  totalPrice = document.getElementById('totalPrice');
const  Quantity = document.getElementById('totalQuantity');
const  OrderBtn = document.querySelector('#order');
const deleteItemButtons = document.getElementsByClassName('deleteItem');
const changeQuantityButtons = document.getElementsByClassName('itemQuantity');



//DOM elements - Error Messages
const emailErrorMsg = document.getElementById("emailErrorMsg");
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");



//Create DOM elemnt for each item in cart
async function createDomElements(cart) {
    cart.forEach(async (element) => {
        const [id, qty, color] = [element[0], element[1],element[2]];
        let data = await fetchData(apiURL,id);
        const inner = createProductHtml(data,id,qty,color,data.price);
        cartItems.innerHTML += inner;
    });
    updateTotals();
}
createDomElements(getCart());

//Add 'change qty' and 'delete' events listeners 
window.addEventListener('load', () => {
    addDeleteEventListeners();
    addChangeQtyEventListeners();
});



/******************************
*---------Functions ---------**
*******************************/


//Creating the DOM element
function createProductHtml(data,id,qty,color) {
    const inner = `<article class="cart__item" data-id="${id}" data-color="${color}" data-quantity="${qty}" >
    <div class="cart__item__img">
    <img src="${data.imageUrl}" alt="${data.altTxt}">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
    <h2>${data.name}</h2>
    <p>${color}</p>
    <p>${data.price.toLocaleString()}€</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
    <p>Qté : </p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${qty}">
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem">Delete</p>
    </div>
    </div>
    </div>
    </article>`;
    return inner;
}



async function updateTotals() {
    totalPrice.innerHTML = (await calculateTotalPrice(getCart())).toLocaleString();
    Quantity.innerHTML = totalQuantity(getCart());
}



// 'Delete event' listener
function addDeleteEventListeners() {
    for (let i = 0; i < deleteItemButtons.length; i++) {
        deleteItemButtons[i].addEventListener ('click', (event) => {
            console.log('Item removed');
            let id = event.target.closest('article').dataset.id;
            let color = event.target.closest('article').dataset.color;
            removeItemFromLocalStorage(id,color,getCart())
            event.target.closest('article').remove();
            updateTotals();
            console.log(localStorage.cart);
        })
    }
};


// 'Change quantity' event listener
function addChangeQtyEventListeners() {
    for (let i = 0; i < changeQuantityButtons.length; i++) {
        changeQuantityButtons[i].addEventListener ('change', (event) => {
            console.log('Quantity has been changed');
            let id = event.target.closest('article').dataset.id;
            let color = event.target.closest('article').dataset.color;
            let newQty = event.target.value;
            changeItemQuantity(id,color,newQty,getCart())
            updateTotals();
        })
    }
};



//Delete the item from local storage
function removeItemFromLocalStorage(id,color,cart) {
    cart.forEach((element,index) => {
        if (element[0] === id && element[2] === color) {
            cart.splice(index,1);
            sendCartToLocalStorage(cart);
        }
    })
    return;
}



function changeItemQuantity(id,color,newQty,cart) {
    cart.forEach((elemnt) => {
        if (elemnt[0] === id && elemnt[2] === color) {
            elemnt[1] = newQty;
        }
        sendCartToLocalStorage(cart);
        console.log(localStorage.cart);
    });
    }



// Calculation of the total articles in cart
function totalQuantity(cart,quantity = 0) {
    cart.forEach((elemnt)=> {
        quantity += parseInt(elemnt[1]);
    })
    return quantity;
}



// Total price of items in cart
//Price is imported from server 
async function calculateTotalPrice(cart, sum = 0) {
    for await (const item of cart) {
        sum+= (await fetchData(apiURL,item[0])).price * parseInt(item[1])
    }
    return sum;
}



/******************************
*------Form validations --**
*******************************/


//'Click event' Listener for 'Add to cart' button 
OrderBtn.addEventListener('click', formValidation); 



// Verify form details provided by the user
function formValidation(event) {
    if (getCart().length === 0) {
        alert('Cart is empty');
    }
    event.preventDefault();
    //email
    let email= emailValidation(document.querySelector('#email').value);
    //Names 
    let firstName = firstNameValidation(document.querySelector('#firstName').value)
    let lastName = nameValidation(document.querySelector('#lastName').value)
    //location
    let address = addressValidation(document.querySelector('#address').value)
    let city = cityValidation(document.querySelector('#city').value)
    //Create contact object
    let contact = createContact(email, firstName, lastName, address, city);
    if (email && firstName && lastName && address && city && getCart().length != 0) {
        sendData(contact);
    }
    else {
        console.log('Please fill in your contact details');
        return null; 
    }
}



//create Contact 
function createContact() {
    let contact = {
        email : document.querySelector('#email').value,
        firstName :document.querySelector('#firstName').value,
        lastName :document.querySelector('#lastName').value,
        address :document.querySelector('#address').value,
        city :document.querySelector('#city').value
    }
    return contact; 
}



async function sendData(contact) {
    try {
        let jsonData = makeJsonData(contact,getCart());
        let res = await fetch(orderUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonData,
        });
        let data = await res.json()
        localStorage.clear();
        console.log(data);
        let confirmationUrl = "./confirmation.html?id=" + data.orderId;
        window.location.href = confirmationUrl;
    }
    catch (e) {
        console.log(e);
    }
    return contact;
}



//JSON DATA
function makeJsonData(contact) {
    let items = getCart()
    let products = [];
    for (let i = 0; i < items.length; i++) {
        products.push(items[i][0]);
    }
    let jsonData = JSON.stringify({contact, products });
    return jsonData;
}



/******************************
*------Values REGEX-------- --**
*******************************/



//First name Validation
function firstNameValidation(name){
    var regName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    //names like Mathias d'Arràs || Martin Luther King, Jr. are accepted
    if(!regName.test(name) || name === ""){
        firstNameErrorMsg.innerHTML = "Please enter valid first name.";
        return false;
    }else{
        
        return true;
    }
}



//Last name Validation
function nameValidation(name){
    var regName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    //names like Mathias d'Arràs || Martin Luther King, Jr. are accepted
    if(!regName.test(name) || name === ""){
        lastNameErrorMsg.innerHTML = "Please enter valid last name";
        return false;
    }else{
        
        return true;
    }
}




// Address validation
function addressValidation(city){
    var regName = /^[a-z0-9\s,'-]*$/i;
    //names like Mathias d'Arràs || Martin Luther King, Jr. are accepted
    if(!regName.test(city) || city === ""){
        addressErrorMsg.innerHTML = "Please enter valid address.";
        return false;
    }else{
        
        return true;
    }
}



// City validation
function cityValidation(city){
    var regName = /^[a-z0-9\s,'-]*$/i;
    //names like Mathias d'Arràs || Martin Luther King, Jr. are accepted
    if(!regName.test(city) || city === ""){
        cityErrorMsg.innerHTML = "Please enter valid city.";
        return false;
    }else{
        
        return true;
    }
}



// Email validation 
function emailValidation(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
        return true;
    }
    else {
        emailErrorMsg.innerHTML = "Please enter valid email address.";
        return false;
    }
}









