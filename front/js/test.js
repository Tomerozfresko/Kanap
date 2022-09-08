
const apiURL = `http://localhost:3000/api/products/`;
const productURL = `http://localhost:3000/api/products/`;
const orderUrl = `http://localhost:3000/api/products/order`;

async function fetchData(url) {
    try {
        const data = await fetch(url);
        const res = await data.json()
        console.log(res);
        return res;
    } catch (err) {
        alert(err);
        return err;
    }
}





function ItemInCart (cart) {
    cart.forEach( (product) => {
        if (product.productId === productId && product.color === color.value) {
            return true;
    }})
    return false;
}



