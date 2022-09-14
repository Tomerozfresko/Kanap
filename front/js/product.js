import { sendCartToLocalStorage, getCart, fetchData } from "./utils.js";

/***********************************
 *-------Global variables---------- **
 **********************************/

/**
 * Get product ID from window.location.search)
 * @param {string} productId
 */
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
 * create the product DOM elemnt
 */
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

/***********************************
 *Send selected item  to Cart page **
 **********************************/

//event listener
addToCartButton.addEventListener("click", addItemToCart);

function addItemToCart() {
  if (colorOrQuantityIsMissing()) {
    return alert("Please choose quantity and Color");
  } else {
    if (ItemInCart(getCart())) {
      updateQuantity(productId, color.value, parseInt(qty.value), getCart());
      console.log("Item Qty has been modified");
    } else {
      addNewItem(getCart());
      console.log("New Item has been added");
    }
  }
}

/******************************
 *------Functions-------------**
 *******************************/

//Check if color or qty are missing
function colorOrQuantityIsMissing() {
  return parseInt(qty.value) === 0 || color.value === "";
}

//Return TRUE if item already in cart
const ItemInCart = (cart) => {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId && cart[i].color === color.value) {
      return true;
    }
  }
  return false;
};

/**
 * Create product array with the selected item and color
 * @returns {object} - the selected item object
 */
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
 * @param {array} cart
 */
function addNewItem(cart) {
  cart.push(createProductArray());
  sendCartToLocalStorage(cart);
}

/**
 *
 * @param {string} id - the product id
 * @param {string} color the selected color by the user
 * @param {number} qty the selected qty by the user
 * @param {array} cart - cart from local storage
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
