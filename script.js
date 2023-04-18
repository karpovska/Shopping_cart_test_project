import fetch from "node-fetch";

let users = {};
let products = {};
let carts = {};

const productToPrice = new Map();

async function getUsersData() {
  const response = await fetch("https://fakestoreapi.com/users");
  users = await response.json();
  return users;
}

async function getProductsData() {
  const response = await fetch("https://fakestoreapi.com/products");
  products = await response.json();

  products.forEach((product) =>
    productToPrice.set(product?.id, product?.price)
  );

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
      const productPrice = productToPrice.get(cartProduct.productId);
      cartValue += productPrice * cartProduct.quantity;
    });

    if (cartValue > highestValue) {
      highestValue = cartValue;
      highestValueId = cart.userId;
    }
  });

  const userName = users.find((user) => user.id === highestValueId).name;
  userFullName = userName.firstname + " " + userName.lastname;
  console.log(`The largest cart value is: ${highestValue}`);
  console.log(`Owner of the largest cart is: ${userFullName}`);
  console.log("----------------------------");
}

//function that finds the two users living furthest away from each other
async function getFurthestUsers() {
  await getUsersData();
  let largestDistance = 0;
  let furthestUsers = [];
  for (let i = 0; i < users.length - 1; i++) {
    for (let j = i + 1; j < users.length; j++) {
      const distance = Math.sqrt(
        Math.pow(
          users[i].address.geolocation.lat - users[j].address.geolocation.lat,
          2
        ) +
          Math.pow(
            users[i].address.geolocation.long -
              users[j].address.geolocation.long,
            2
          )
      );
      if (distance > largestDistance) {
        largestDistance = distance;
        furthestUsers = [users[i].name, users[j].name];
      }
    }
  }
  console.log(`The furthest users are: ${JSON.stringify(furthestUsers)}`);
  console.log("----------------------------------");
}

getCategoriesTotalValue();
getCartWithHighestValue();
getFurthestUsers();
