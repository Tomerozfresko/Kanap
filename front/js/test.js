// const apiURL = `http://localhost:3000/api/products/`;
// const productURL = `http://localhost:3000/api/products/`;
// const orderUrl = `http://localhost:3000/api/products/order`;

// async function fetchData(url) {
//     try {
//         const data = await fetch(url);
//         const res = await data.json()
//         console.log(res);
//         return res;
//     } catch (err) {
//         alert(err);
//         return err;
//     }
// }

// function ItemInCart (cart) {
//     cart.forEach( (product) => {
//         if (product.productId === productId && product.color === color.value) {
//             return true;
//     }})
//     return false;
// }

// const tags = ['a','article','img','h3','p'];
// console.log(tags);
// [a,article,img,h3,p] = tags.map(el => document.createElement(el));

// to check this options also
///// --------

// const tags = ["h1", "div", "p"];
// const [h1t, divt, pt] = tags.map((el) => {
//   return document.createElement(el);
// });
// console.dir(h1t, divt, pt);
// [h1t,divt,pt] = Array.from([...tags], x => {return document.createElement(x)});


//Consider using append/prepend

// async function createKanap() {
//     const products = await fetchData();
//     products.forEach(product => {
//         document.getElementById('items').innerHTML += `
//         <a href="./product.html?id=${product._id}">
//         <article>
//         <img
//         src="${product.imageUrl}"
//         alt="${product.altTxt}"
//         />
//         <h3 class="productName">${product.name}</h3>
//         <p class="productDescription">
//         ${product.description}
//         </p>
//         </article>
//         </a>
//         `;
//     });
// }

