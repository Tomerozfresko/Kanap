import {orderUrl,sendCartToLocalStorage,getCart,fetchData} from './utils.js';


/******************************
*---------Refrences ---------**
*******************************/



//DOM elements
const totalPrice = document.getElementById('totalPrice');
const quantity = document.getElementById('totalQuantity');
const orderBtn = document.querySelector('#order');
const deleteItemButtons = document.getElementsByClassName('deleteItem');
const changeQuantityButtons = document.getElementsByClassName('itemQuantity');



//DOM elements - Error Messages
const emailErrorMsg = document.getElementById("emailErrorMsg");
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");



/******************************
*---------Functions ---------**
*******************************/


createDomElements(getCart());

/**
* Create DOM elemnt for each product in the cart
* @param {array} cart 
*/
async function createDomElements(cart) {
    cart.forEach(async (product) => {
        const data = await fetchData(product.productId);
        document.getElementById('cart__items').innerHTML += `<article class="cart__item" data-id="${data._id}" data-color="${product.color}" data-quantity="${product.qty}" >
        <div class="cart__item__img">
        <img src="${data.imageUrl}" alt="${data.altTxt}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
        <h2>${data.name}</h2>
        <p>${product.color}</p>
        <p>${data.price.toLocaleString()} €</p>
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.qty}">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Delete</p>
        </div>
        </div>
        </div>
        </article>`;
    });
    updateTotals();
}

/**
* adding event Listeners after document finishes loading
*/
window.addEventListener('load', () => {
    addDeleteEventListeners();
    addChangeQtyEventListeners();
});





/**
* adding event listener for any 'delete' button
*/
function addDeleteEventListeners() {
    for (let i = 0; i < deleteItemButtons.length; i++) {
        deleteItemButtons[i].addEventListener ('click', (event) => {
            console.log('Item removed');
            const id = event.target.closest('article').dataset.id;
            const color = event.target.closest('article').dataset.color;
            removeItemFromLocalStorage(id,color,getCart())
            event.target.closest('article').remove();
            updateTotals();
            console.log(localStorage.cart);
        })
    }
};



/**
* adding event listener for any qty change made by user
*/
function addChangeQtyEventListeners() {
    for (let i = 0; i < changeQuantityButtons.length; i++) {
        changeQuantityButtons[i].addEventListener ('change', (event) => {
            console.log('Quantity has been changed');
            const id = event.target.closest('article').dataset.id;
            const color = event.target.closest('article').dataset.color;
            const newQty = event.target.value;
            changeItemQuantity(id,color,newQty,getCart())
            updateTotals();
        })
    }
};



/**
* calculate the up-to-date totals and qty's and update the DOM
*/
async function updateTotals() {
    totalPrice.innerHTML = (await calculateTotalPrice(getCart())).toLocaleString();
    quantity.innerHTML = totalQuantity(getCart());
}



/**
* Removing the selected item from the cart
* @param {string} id - the selected product id
* @param {string} color the selected product color
* @param {array} cart - products in cart array
*/
function removeItemFromLocalStorage(id,color,cart) {
    cart.forEach((element,index) => {
        if (element.productId === id && element.color === color) {
            cart.splice(index,1);
            sendCartToLocalStorage(cart);
        }
    })
    return;
}

/**
 * Change the product qty in case if exists in cart
 * @param {string} id 
 * @param {string} color 
 * @param {number} newQty 
 * @param {array} cart 
 */
function changeItemQuantity(id,color,newQty,cart) {
    cart.forEach((element) => {
        if (element.productId === id && element.color === color) {
            element.qty = newQty;
        }
        sendCartToLocalStorage(cart);
    });
}


/**
 * calculating the total products in the cart
 * @param {array} cart 
 * @param {number} quantity 
 * @returns {number} - the total number of items in cart
 */
function totalQuantity(cart,quantity = 0) {
    cart.forEach((elemnt)=> {
        quantity += parseInt(elemnt.qty);
    })
    return quantity;
}



/**
 * calculating the total cost of products in the cart
 * @param {array} cart 
 * @param {number} sum 
 * @returns {number} the total cost of articles in the cart
 */
async function calculateTotalPrice(cart, sum = 0) {
    for await (const item of cart) {
        sum+= (await fetchData(item.productId)).price * parseInt(item.qty)
    }
    return sum;
}



/******************************
*------Form validations --**
*******************************/


/**
 * Click event' Listener to 'Add to cart' button 
 */
orderBtn.addEventListener('click', formValidation); 



/**
 * Will validate contact fields before sending to confirmation page
 * @param {event} event 
 * @returns {null} 
 */
function formValidation(event) {
    if (getCart().length === 0) {
        alert('Cart is empty');
    }
    event.preventDefault();
    //email
    const email= emailValidation(document.querySelector('#email').value);
    //Names 
    const firstName = firstNameValidation(document.querySelector('#firstName').value)
    const lastName = nameValidation(document.querySelector('#lastName').value)
    //location
    const address = addressValidation(document.querySelector('#address').value)
    const city = cityValidation(document.querySelector('#city').value)
    //Create contact object
    const contact = createContact(email, firstName, lastName, address, city);
    if (email && firstName && lastName && address && city && getCart().length != 0) {
        sendOrder(contact);
    }
    else {
        console.log('Please fill in your contact details');
        return null; 
    }
}



/**
 * return the contact object
 * @returns {object} 
 */
function createContact() {
    const contact = {
        email : document.querySelector('#email').value,
        firstName :document.querySelector('#firstName').value,
        lastName :document.querySelector('#lastName').value,
        address :document.querySelector('#address').value,
        city :document.querySelector('#city').value
    }
    return contact; 
}



async function sendOrder(contact) {
    try {
        const res = await fetch(orderUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: makeJsonData(contact),
        });
        const data = await res.json()
        // localStorage.clear();
        window.location.href = "./confirmation.html?id=" + data.orderId;
    }
    catch (e) {
        console.log(e);
    }
    return contact;
}


function makeJsonData(contact) {
    const products = getCart().map(product => product.productId )
    return JSON.stringify({contact, products });
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








