export const apiURL = `http://localhost:3000/api/products/`;
export const productURL = `http://localhost:3000/api/products/`;
export const orderUrl = `http://localhost:3000/api/products/order`;



export async function fetchData(url,productId = '') {
    const data = await fetch(url + productId);
    const res = await data.json()
    return res;
}

export function updateQuantity(id,color,qty) {
    let cart = getCart();
    for (let i = 0; i < cart.length; i++) {
        if (cart[i][0] === id && color === cart[i][2]) {
            cart[i][1] += parseInt(qty);
            sendCartToLocalStorage(cart);
            console.log(localStorage);
        }
    }
}

//get cart
export function getCart() {
    let storedCart = [];
    if (localStorage.getItem('cart') != null) {
        storedCart = JSON.parse(localStorage.getItem('cart'));
      }
      return storedCart;
}

//Send cart to LocalStorage
export function sendCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}