import {fetchData} from './utils.js';

/**
 * Create DOM element for any product
 * 
 * @param {array} products - Array of product objects 
 */
async function createKanap() {
    const products = await fetchData();
    for (let product of products) {
        let elemnt = `
        <a href="./product.html?id=${product._id}">
        <article>
        <img
        src="${product.imageUrl}"
        alt="${product.altTxt}"
        />
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">
        ${product.description}
        </p>
        </article>
        </a>
        `;
        document.getElementById('items').innerHTML += elemnt;
    }
}

createKanap();

