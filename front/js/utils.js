export const productURL = `http://localhost:3000/api/products/`;
export const orderUrl = `http://localhost:3000/api/products/order`;

/**
 * Fetching the items from the project API
 * @param {string} productId - The unique item ID, when using to fetch specific item.
 * @returns {err||Array} Array holding the items objects || corresponding fetching err
 * @example fetchData() => [{product1},{product2},{product3}...]
 * @example fetchData(productId) => {product info}
 **/
export async function fetchData(productId = "") {
  const url = `http://localhost:3000/api/products/`;
  try {
    const data = await fetch(url + productId);
    const res = await data.json();
    return res;
  } catch (err) {
    alert(err);
    return err;
  }
}

/**
 * Receive the items stored in the Local Storage
 * @returns {Array} Array of the items objects || empty Array
 * @example getCart() => [{product1},{product2},{product3}...] * @example fetchData(productId) => {product info}
 **/
export function getCart() {
  let storedCart = [];
  if (localStorage.getItem("cart") != null) {
    storedCart = JSON.parse(localStorage.getItem("cart"));
  }
  return storedCart;
}

/**
 * Sending cart array to local srorage
 * @param {Array} cart - the array of items stored in Local storage
 * @returns {void}
 **/
export function sendCartToLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
