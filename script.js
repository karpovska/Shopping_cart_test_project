import fetch from "node-fetch";

let users = {};
let products = {};
let carts = {};

async function getUsersData() {
  const response = await fetch("https://fakestoreapi.com/users");
  users = await response.json();
  return users;
}

async function getProductsData() {
  const response = await fetch("https://fakestoreapi.com/products");
  products = await response.json();
  return products;
}

async function getCartsData() {
  const response = await fetch(
    "https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07"
  );
  carts = await response.json();
  return carts;
}

//function that creates a data structure containing all available product categories and the total value of products of a given category
async function getCategoriesTotalValue() {
  await getProductsData();
  let categories = {};

  products.forEach((product) => {
    //if our product category already exists in categories object then increase total value
    if (categories[product.category]) {
      categories[product.category] += product.price;
    } else {
      categories[product.category] = product.price;
    }
  });
  console.log("Categories and its values: ", categories);
  console.log("----------------------------");
  return categories;
}

//function that finds a cart with the highest value, determines its value and full name of its owner
async function getCartWithHighestValue() {
  await getCartsData();
  await getProductsData();
  await getUsersData();
  let highestValue = 0;
  let highestValueId = 0;
  let userFullName = "";

  carts.forEach((cart) => {
    const cartProducts = cart.products;
    let cartValue = 0;
    cartProducts.forEach((cartProduct) => {
      const productWithPrice = products.find(
        (product) => product.id === cartProduct.productId
      );
      const productPrice = productWithPrice.price;
      cartValue += productPrice * cartProduct.quantity;
      if (cartValue > highestValue) {
        highestValue = cartValue;
        highestValueId = cart.userId;
      }
    });
  });
  userFullName =
    users.find((user) => user.id === highestValueId).name.firstname +
    " " +
    users.find((user) => user.id === highestValueId).name.lastname;
  console.log(`The largest cart value is: ${highestValue}`);
  console.log(`Owner of the largest cart is: ${userFullName}`);
  console.log("----------------------------");
}

getCategoriesTotalValue();
getCartWithHighestValue();
