import { sendCartToLocalStorage, getCart, fetchData } from "./utils.js";

/***********************************
 *-------Global variables---------- **
 **********************************/

/**
 * Get product ID from window.location.search
 **/
const productId = new URLSearchParams(window.location.search).get("id");

/***********************************
 *-------------Refrences---------- **
 **********************************/

const title = document.querySelector("title");
const img = document.querySelector(".item__img");
const name = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const color = document.getElementById("colors");
const qty = document.querySelector("input");
const addToCartButton = document.getElementById("addToCart");

/***********************************
 *------Populate the DOM-------- **
 **********************************/

/**
 * Create the product DOM elemnt
 * @param {void}
 * @returns {void}
 **/
async function createProduct() {
  const data = await fetchData(productId);
  //IMG src
  img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
  // Data.name and title
  name.innerHTML = data.name;
  title.innerHTML = data.name;
  // Price
  price.innerHTML = `${data.price.toLocaleString()}`;
  // Description
  description.innerHTML = data.description;
  // Colors
  data.colors.forEach(
    (element) =>
      (color.innerHTML += `<option value="${element}">${element}</option>`)
  );
}

createProduct();

/******************************
 *------Functions-------------**
 *******************************/

//event listener
addToCartButton.addEventListener("click", addItemToCart);

/**
 * When user clicks the "Add to cart" button this function will handle the qty update || adding new item to the cart
 * @param {void}
 * @returns {void} Will return corresponding alert to the user
 **/
function addItemToCart() {
  if (colorOrQuantityIsMissing()) {
    return alert("Please choose quantity and Color");
  } else {
    if (ItemInCart(getCart())) {
      updateQuantity(productId, color.value, parseInt(qty.value), getCart());
      parseInt(qty.value) === 1
        ? alert(`Your item has been succesfuly added to the cart`)
        : alert("Your items has been succesfuly added to the cart");
    } else {
      addNewItem(getCart());
      parseInt(qty.value) === 1
        ? alert(`Your item has been succesfuly added to the cart`)
        : alert("Your items has been succesfuly added to the cart");
    }
  }
}

/**
 * Check if the user select color AND quantity befor sending to local storage
 * @param {void}
 * @returns {boolean} Will return corresponding alert to the user
 **/
function colorOrQuantityIsMissing() {
  return parseInt(qty.value) === 0 || color.value === "";
}

/**
 * Check if the selected item already exists in the cart
 * @param {array} cart The items objects array
 * @returns {boolean} Return TRUE if the selected item already in cart
 * @example ItemInCart = (cart) => false
 **/
const ItemInCart = (cart) => {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId && cart[i].color === color.value) {
      return true;
    }
  }
  return false;
};

/**
 * Create item object with the selected id,qty and color
 * @param {void}
 * @returns {object} the selected item object
 **/
function createProductArray() {
  const item = {
    productId: productId,
    qty: parseInt(qty.value),
    color: color.value,
  };
  return item;
}

/**
 * Adding selected item to local storage
 * @param {array} cart The exisiting items from the local storgae
 * @return {void}
 */
function addNewItem(cart) {
  cart.push(createProductArray());
  sendCartToLocalStorage(cart);
}

/**
 * Update the total qty in local storage
 * @param {string} id - Product id
 * @param {string} color The user selected color
 * @param {number} qty The user selected qty
 * @param {array} cart - cart from local storage
 * @return {void}
 */

function updateQuantity(id, color, qty, cart) {
  cart.forEach((product) => {
    if (product.productId === id && product.color === color) {
      product.qty += parseInt(qty);
      sendCartToLocalStorage(cart);
      console.log(localStorage);
    }
  });
}
