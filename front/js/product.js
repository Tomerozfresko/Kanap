import {sendCartToLocalStorage ,updateQuantity,getCart,fetchData, apiURL } from './utils.js';



//Item ID from window.location.search)
const productId = getProductId('id');

/***********************************
*-------------Refrences---------- **
**********************************/


//DOM elements refrences
const title = document.querySelector("title");
const img = document.querySelector(".item__img");
const  name = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const color = document.getElementById("colors");
const qty = document.querySelector('input')
const addToCartButton = document.getElementById("addToCart");



/***********************************
*------Populate the DOM-------- **
**********************************/

async function loadProduct() {
    let data = await fetchData(apiURL,productId);
        //IMG src
        img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        // Data.name and title
        name.innerHTML = data.name;
        title.innerHTML = data.name;
        // Price
        price.innerHTML =`${data.price.toLocaleString()}`;
        // Description
        description.innerHTML = data.description;
        // Colors
        for (let i = 0; i < data.colors.length; i++) {
            color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
        }
}

loadProduct();





/***********************************
*Send selected item  to Cart page **
**********************************/



addToCartButton.addEventListener('click', addItemToCart);

function addItemToCart() {
    if (colorOrQuantityIsMissing()) {
        return alert('Please choose quantity and Color')
    }
    else {
        if (ItemInCart()) {
            updateQuantity(productId,color.value,parseInt(qty.value));
            console.log('Item Qty has been modified');
        }
        else {
            addNewItem();
            console.log('New Item has been added');
        }
    } 
};

/******************************
*------Functions-------------**
*******************************/

//Get product id number by using URLSearchParams  
function getProductId(id) {
    let productId = new URLSearchParams(window.location.search);
    return productId.get(id);
}

//Check if both color and qty are choosen by the user 
function colorOrQuantityIsMissing() {
    return (parseInt(qty.value) === 0 || color.value === '')
}

//Return TRUE if item already in cart

const ItemInCart = () => { 
    const cart = getCart();
    for (let i = 0; i < cart.length; i++) {
        if (cart[i][0] === productId && cart[i][2] === color.value) {
            return true;
        }
    }
    return false;
}

ItemInCart();


// Create product array with the selected item and color
function createProductArray() {
    const item = [productId, parseInt(qty.value), color.value];
    return item;
}


//to change the items to object(!) TODO
// function createProductArray() {
//     const item = {
//         productId: productId, 
//         qty: parseInt(qty.value),
//         color: color.value
//     };
//     return item;
// }

//Adding selected item to local storage
function addNewItem() {
    const cart = getCart();
    const item = createProductArray();
    cart.push(item);
    sendCartToLocalStorage(cart);
}





