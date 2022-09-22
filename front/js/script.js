import { fetchData } from "./utils.js";

/**
 * Create DOM element for any product received from the API
 * @param {void}
 * @returns {void}
 **/
async function createKanap() {
  const products = await fetchData();
  products.forEach((product) => {
    document.getElementById("items").innerHTML += `
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
  });
}

createKanap();
