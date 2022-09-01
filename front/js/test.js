// export async function fetchData(url,productId = '') {
//     const data = await fetch(url + productId);
//     const res = await data.json()
//     return res;
// }

// import { getCart } from './utils.js';
// // let id = '123'

// // function printUrl(address, id ='') {
// //     console.log(address +id );
// // }

// // printUrl(apiURL);

// //get cart


// console.log(getCart());

// function ItemInCart() {
//     let cart = getCart();
//     for (let i = 0; i < cart.length; i++) {
//         if (cart[i][0] === productId && cart[i][2] === color.value) {
//             return true;
//         }
//         else return false;
//     }
// }

// console.log(ItemInCart());


// let {a,b,c} = {123}; 

// console.log(a,b,c);

// const [xMin, xMax, yMin, yMax] = [-2, 2, -1.5, 1.5];
// console.log(xMin)



// async function check() {
//     console.log(1);
//     await two();
//     console.log(3);
// }



// console.clear();
// check();

// // function two() {
// //     return new Promise(resolve => {
// //       setTimeout(() => {
// //         resolve(console.log('resolved'));
// //       }, 2000);
// //     });
// //   }

// // function two() { 
// //     return new Promise(resolve => {
// //         setTimeout( () => {
// //             resolve(console.log('2'));
// //         },2000)
// //     })
// // }

// function two() {
//     setTimeout(()=> {
//         (console.log('2'))
//     },2000)
// }




//tests 

const apiURL = `http://localhost:3000/api/products/`;


// function getCart() {
//     let storedCart = [];
//     if (localStorage.getItem('cart') != null) {
//         storedCart = JSON.parse(localStorage.getItem('cart'));
//       }
//       return storedCart;
// }

// async function fetchData(url,productId = '') {
//     const data = await fetch(url + productId);
//     const res = await data.json()
//     return res;
// }

// function calculateTotalPrice() {
//     let cart = getCart();
//     let sum = 0;
//     let quantity = 0; 
//     for (let i = 0; i < cart.length; i++) {
//         let id = cart[i][0];
//         quantity = parseInt(cart[i][1])
//         fetchData(apiURL,id)
//         .then((data) => {
//             sum += quantity * data.price;
//             // console.log(sum);
//         })
//     }
//     console.log(sum);
//     return sum;
// }

// let tomer = calculateTotalPrice();
// console.log(tomer);

// for (let i = 0; i < cart.length; i++) {
//     let id = cart[i][0];
//     quantity += parseInt(cart[i][1])
//     console.log(quantity)
//     fetchData(apiURL,id)
//     .then((data) => {
//         sum += quantity * data.price;console.log(sum);
//     })}


// async function fetchData(url) {
//     try {
//         let res = await fetch(url);
//         return await res.json();
//     } catch (error) {
//         console.log(error);
//     }
// }
// async function tomer(){
//     let users = await fetchData(apiURL);
//     users.forEach(element => {
//         console.log(element);
//     });
// }

// tomer();


// function sendData(contact) {
//     let jsonData = makeJsonData(contact);
//     fetch(orderUrl, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: jsonData,
//     })
//     .then((res) => res.json())
//     // to check res.ok status in the network
//     .then((data) => {
//         localStorage.clear();
//         let confirmationUrl = "./confirmation.html?id=" + data.orderId;
//         window.location.href = confirmationUrl;
//     })
//     .catch(() => {
//         console.log("Error.");
//     }); // catching errors
//     return contact; 
// }

// place holder 

// function check() {
//     if (document.readyState == 'complete') {
//         console.log(document.readyState);
//         console.log('dom completed fully loaded');
//         addEvents()
//     } else {
//         document.addEventListener('DOMContentLoaded', function () {
//         console.log(document.readyState);
//         console.log('document was not ready, place code here');
//         check();
//         });
//     }
// }

// check();





// place holder 



// window.addEventListener('DOMContentLoaded', (event) => {
//     console.log('dom fully loaded');
//     console.log(event);
//     addDeleteEventListeners();
//     addChangeQtyEventListeners();
// });


// //Add event listeners to change qty and delete items 
// window.addEventListener('DOMContentLoaded', (event) => {
//     setTimeout(() => {
//         console.log('dom fully loaded');
//         addDeleteEventListeners();
//         addChangeQtyEventListeners();
//     }, 1000);
// });


//=iife function 
//https://stackabuse.com/javascripts-immediately-invoked-function-expressions/

//TODO why i need to use set time out here ?? 


// fetchData(apiURL,productId)
// .then((data) => {
//     //IMG src
//     img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
//     // Data.name and title
//     name.innerHTML = data.name;
//     title.innerHTML = data.name;
//     // Price
//     price.innerHTML =`${data.price.toLocaleString()}`;
//     // Description
//     description.innerHTML = data.description;
//     // Colors
//     for (let i = 0; i < data.colors.length; i++) {
//         color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
//     }
// });
