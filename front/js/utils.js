export const productURL = `http://localhost:3000/api/products/`;
export const orderUrl = `http://localhost:3000/api/products/order`;

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

//get cart
export function getCart() {
  let storedCart = [];
  if (localStorage.getItem("cart") != null) {
    storedCart = JSON.parse(localStorage.getItem("cart"));
  }
  return storedCart;
}

//Send cart to LocalStorage
export function sendCartToLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
