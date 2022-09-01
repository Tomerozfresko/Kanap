import {fetchData,apiURL} from './utils.js';

const productsContainer = document.getElementById('items');

fetchData(apiURL)
    .then((data) => {
        createKanap(data);
    })
    .catch ((e) => {
        console.log(e);
    });

/**
 * Function iterates the products from the API
 * Create HTML element for each product
 * then pushes the element to the products continer.
 * @param {string} data 
 */
//
function createKanap(data) {
    for (let item of data) {
        let product = `
        <a href="./product.html?id=${item._id}">
        <article>
        <img
        src="${item.imageUrl}"
        alt="${item.altTxt}"
        />
        <h3 class="productName">${item.name}</h3>
        <p class="productDescription">
        ${item.description}
        </p>
        </article>
        </a>
        `;
        productsContainer.innerHTML += product;
    }
}

// TODO: 
//document the code using JSDOC
//make sure there is error handeling to any promise 

